import TableContainer from "@mui/material/TableContainer"
import TableCell from "@mui/material/TableCell"
import { useEffect, useMemo, useState } from "react"
import { firstViewState } from "../Shared.Reducer"
import { TableHeaderView } from "../../uikit/table/Table.HeaderView"
import { PaperBox } from "../../uikit/page/PaperBox"
import { TableRowClickable, TableRowView } from "../../uikit/table/Table.RowView"
import { useTranslation } from "react-i18next"
import { TableColumnSort } from "../../uikit/table/Table.HeaderView"
import { ORDERED_BOOLEAN_COMPARATOR, ORDERED_STRING_COMPARATOR } from "../../domain/Domain.Comparators"
import { TableRowErrorAlert } from "../../uikit/Shared.Alert"
import { TableFixed } from "../../uikit/table/Table.Fixed"
import { DEFAULT_ROWS_PER_PAGE } from "../../uikit/Shared.Consts"
import { ParticipantZevListState } from "./ParticipantZevList.Reducer"
import { FormSectionTitle } from "../../uikit/form/FormView"
import { ParticipantZevListItem } from "../../domain/participant/Participant.Model"
import { SynchronisedIndicator } from "./views/SynchronisedIndicator"
import { SpaceBetweenMiddleBox, AlignMiddleBox } from "../../uikit/box/AlignmentBox"
import { PrimaryPlusButton } from "../../uikit/button/PrimaryPlusButton"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { Box } from "@mui/material"
import { mapDispatchToProps } from "./ParticipantZevList.Connect"
import { DownloadIcon } from "../../uikit/Shared.Icon"
import { ErrorAlert } from "../../uikit/Shared.Alert"

enum ParticipantZevColumns {
  SYNCHRONISED = "SYNCHRONISED",
  FIRST_NAME = "FIRST_NAME",
  LAST_NAME = "LAST_NAME",
  GP_NUMBER = "GP_NUMBER",
  EMAIL = "EMAIL",
}

interface ParticipantZevListComponentProps extends ParticipantZevListState, ReturnType<typeof mapDispatchToProps> {
  zevId: string
}

export const ParticipantZevListComponent = (props: ParticipantZevListComponentProps) => {
  const { t } = useTranslation("participant")

  const {
    viewState,
    csvViewState,
    getAllParticipantZevCsv,
    getZevParticipants,
    navigateToParticipant,
    navigateToCreateParticipant,
    zevId,
  } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getZevParticipants(zevId)
    }
  }, [viewState])

  const participantList = useMemo(() => viewState.domainResult?.participants ?? [], [viewState])

  const [orderBy, setOrderBy] = useState<TableColumnSort<ParticipantZevColumns>>({
    column: ParticipantZevColumns.FIRST_NAME,
    direction: "asc",
  })

  const tableHeaders = [
    {
      column: ParticipantZevColumns.SYNCHRONISED,
      label: t("list.label.synchronised"),
      width: "15%",
    },
    {
      column: ParticipantZevColumns.FIRST_NAME,
      label: t("list.label.firstName"),
      width: "30%",
    },
    {
      column: ParticipantZevColumns.LAST_NAME,
      label: t("list.label.lastName"),
      width: "30%",
    },
    {
      column: ParticipantZevColumns.GP_NUMBER,
      label: t("list.label.gpNumber"),
      width: "25%",
    },
    {
      column: ParticipantZevColumns.EMAIL,
      label: t("list.label.email"),
      width: "30%",
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case ParticipantZevColumns.SYNCHRONISED:
        return (a: ParticipantZevListItem, b: ParticipantZevListItem) =>
          ORDERED_BOOLEAN_COMPARATOR(a.synchronised, b.synchronised, orderBy.direction)
      case ParticipantZevColumns.FIRST_NAME:
        return (a: ParticipantZevListItem, b: ParticipantZevListItem) =>
          ORDERED_STRING_COMPARATOR(a.firstName, b.firstName, orderBy.direction)
      case ParticipantZevColumns.LAST_NAME:
        return (a: ParticipantZevListItem, b: ParticipantZevListItem) =>
          ORDERED_STRING_COMPARATOR(a.lastName, b.lastName, orderBy.direction)
      case ParticipantZevColumns.GP_NUMBER:
        return (a: ParticipantZevListItem, b: ParticipantZevListItem) =>
          ORDERED_STRING_COMPARATOR(a.gpNumber, b.gpNumber, orderBy.direction)
      case ParticipantZevColumns.EMAIL:
        return (a: ParticipantZevListItem, b: ParticipantZevListItem) =>
          ORDERED_STRING_COMPARATOR(a.email, b.email, orderBy.direction)
    }
  }

  return (
    <PaperBox>
      <SpaceBetweenMiddleBox>
        <Box>
          <FormSectionTitle label={t("list.title")} />
        </Box>
        <SmallPaddedBox>
          <PrimaryButtonLoading
            startIcon={<DownloadIcon fontSize="large" />}
            label={t("detail.action.download")}
            isLoading={csvViewState.isLoading}
            onClick={() => getAllParticipantZevCsv(zevId)}
          />
        </SmallPaddedBox>
        <SmallPaddedBox>
          <PrimaryPlusButton onClick={() => navigateToCreateParticipant(zevId)} />
        </SmallPaddedBox>
      </SpaceBetweenMiddleBox>
      {csvViewState.domainError && <ErrorAlert message={csvViewState.domainError.message} />}
      <TableContainer>
        <TableFixed>
          <TableHeaderView<ParticipantZevColumns>
            isLoading={viewState.isLoading}
            headers={tableHeaders}
            orderBy={orderBy}
            orderByChanged={(orderBy) => setOrderBy(orderBy)}
          />
          {viewState.domainError && (
            <TableRowErrorAlert
              colSpan={5}
              retry={() => getZevParticipants(zevId)}
              message={viewState.domainError.message}
            />
          )}
          <TableRowView<ParticipantZevListItem>
            colSpan={5}
            rows={participantList}
            pageRowSlice={{
              start: 0,
              end: DEFAULT_ROWS_PER_PAGE,
            }}
            comparator={columnComparator}
            render={(participantItem) => (
              <TableRowClickable<ParticipantZevListItem>
                key={participantItem.id}
                rowData={participantItem}
                rowClick={(participantItem) => navigateToParticipant(zevId, participantItem.id)}
              >
                <TableCell>
                  <AlignMiddleBox>
                    <SynchronisedIndicator synchronised={participantItem.synchronised} />
                  </AlignMiddleBox>
                </TableCell>
                <TableCell align="left">{participantItem.firstName}</TableCell>
                <TableCell align="left">{participantItem.lastName}</TableCell>
                <TableCell align="left">{participantItem.gpNumber}</TableCell>
                <TableCell align="left">{participantItem.email}</TableCell>
              </TableRowClickable>
            )}
          />
        </TableFixed>
      </TableContainer>
    </PaperBox>
  )
}
