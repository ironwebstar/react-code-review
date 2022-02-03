import { TableContainer, TableRow, TableCell, IconButton, Tooltip } from "@mui/material"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { Redirect } from "react-router-dom"
import { ConsumptionPointParticipationItem } from "../../../domain/participant/Participant.Model"
import { SecondaryButtonLoading } from "../../../uikit/button/SecondaryButtonLoading"
import { ErrorAlert } from "../../../uikit/Shared.Alert"
import { DEFAULT_ROWS_PER_PAGE } from "../../../uikit/Shared.Consts"
import { RemoveIcon } from "../../../uikit/Shared.Icon"
import { ORDERED_STRING_COMPARATOR, ORDERED_NUMBER_COMPARATOR } from "../../../domain/Domain.Comparators"
import { TableFixed } from "../../../uikit/table/Table.Fixed"
import { TableColumnSort, TableHeader, TableHeaderView } from "../../../uikit/table/Table.HeaderView"
import { PageRowSlice, TablePaginationView } from "../../../uikit/table/Table.PaginationView"
import { TableRowView } from "../../../uikit/table/Table.RowView"
import { TableActionView } from "../../../uikit/table/TableActionView"
import { Body1 } from "../../../uikit/typography/Typography"
import { ViewStateMap } from "../../Shared.Reducer"
import { ParticipantLinkView } from "./ParticipantLinkView"

enum ParticipationsColumns {
  PARTICIPANT_FULL_NAME = "PARTICIPANT_FULL_NAME",
  MOVE_IN_DATE = "MOVE_IN_DATE",
  MOVE_OUT_DATE = "MOVE_OUT_DATE",
  DELETE_PARTICIPANT = "DELETE_PARTICIPANT",
}

interface ConsumptionPointParticipationsTableProps {
  participations: ConsumptionPointParticipationItem[]
  isLoading: boolean
  zevId: string
  buildingId: string
  consumptionPointId: string
  navigateToParticipant: (zevId: string, participantId: string) => void
  deleteParticipation: (participationId: string) => void
  deleteViewState: ViewStateMap<string, boolean>
  moveOutParticipation: (participationId: string, nextMoveOutDate: number) => void
  moveInParticipation: (participationId: string, moveInDate: number) => void
  moveOutViewState: ViewStateMap<string, string>
  moveInViewState: ViewStateMap<string, string>
}

export const ConsumptionPointParticipationsTable = (props: ConsumptionPointParticipationsTableProps) => {
  const { t } = useTranslation("consumptionPointsParticipations")

  const {
    participations,
    isLoading,
    zevId,
    buildingId,
    consumptionPointId,
    navigateToParticipant,
    deleteViewState,
    deleteParticipation,
    moveOutParticipation,
    moveInParticipation,
    moveOutViewState,
    moveInViewState,
  } = props
  const [pageRowSlice, setPageRowSlice] = useState<PageRowSlice>({
    start: 0,
    end: DEFAULT_ROWS_PER_PAGE,
  })

  const [orderBy, setOrderBy] = useState<TableColumnSort<ParticipationsColumns>>({
    column: ParticipationsColumns.MOVE_IN_DATE,
    direction: "desc",
  })

  const tableHeaders: TableHeader<ParticipationsColumns>[] = [
    {
      column: ParticipationsColumns.PARTICIPANT_FULL_NAME,
      label: t("list.label.participant.fullName"),
      width: "50%",
      orderable: false,
    },
    {
      column: ParticipationsColumns.MOVE_IN_DATE,
      label: t("list.label.moveInDate"),
      width: "20%",
      orderable: true,
    },
    {
      column: ParticipationsColumns.MOVE_OUT_DATE,
      label: t("list.label.moveOutDate"),
      width: "20%",
      orderable: true,
    },
    {
      column: ParticipationsColumns.DELETE_PARTICIPANT,
      label: "",
      width: "10%",
      orderable: false,
      align: "right",
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case ParticipationsColumns.PARTICIPANT_FULL_NAME:
        return (a: ConsumptionPointParticipationItem, b: ConsumptionPointParticipationItem) =>
          ORDERED_STRING_COMPARATOR(a.participant?.fullName ?? "", b.participant?.fullName ?? "", orderBy.direction)
      case ParticipationsColumns.MOVE_IN_DATE:
        return (a: ConsumptionPointParticipationItem, b: ConsumptionPointParticipationItem) =>
          ORDERED_NUMBER_COMPARATOR(a.sortableMoveInDate, b.sortableMoveInDate, orderBy.direction)
      case ParticipationsColumns.MOVE_OUT_DATE:
        return (a: ConsumptionPointParticipationItem, b: ConsumptionPointParticipationItem) =>
          ORDERED_NUMBER_COMPARATOR(a.sortableMoveOutDate, b.sortableMoveOutDate, orderBy.direction)
      default:
        return (a: ConsumptionPointParticipationItem, b: ConsumptionPointParticipationItem) =>
          ORDERED_STRING_COMPARATOR(a.participant?.fullName ?? "", b.participant?.fullName ?? "", orderBy.direction)
    }
  }

  const participantsLength = participations.length
  const penultimateIndex = participantsLength - 2
  const lastParticipant = participations[participantsLength - 1].participant

  return (
    <TableContainer>
      <TableFixed>
        <TableHeaderView<ParticipationsColumns>
          isLoading={isLoading}
          headers={tableHeaders}
          orderBy={orderBy}
          orderByChanged={(orderBy) => setOrderBy(orderBy)}
        />
        <TableRowView<ConsumptionPointParticipationItem>
          colSpan={9}
          rows={participations}
          pageRowSlice={pageRowSlice}
          comparator={columnComparator}
          render={(participationItem) => {
            const index = participations.findIndex((item) => item.id === participationItem.id)
            const canCancelMoveOutDate =
              (penultimateIndex === index && !lastParticipant) || (participantsLength - 1 === index && lastParticipant)

            return (
              <Fragment key={participationItem.id}>
                {deleteViewState.domainError.get(participationItem.id) && (
                  <TableRow>
                    <TableCell colSpan={9}>
                      <ErrorAlert message={deleteViewState.domainError.get(participationItem.id)?.message ?? ""} />
                    </TableCell>
                  </TableRow>
                )}
                {moveOutViewState.domainError.get(participationItem.id) && (
                  <TableRow>
                    <TableCell colSpan={9}>
                      <ErrorAlert message={moveOutViewState.domainError.get(participationItem.id)?.message ?? ""} />
                    </TableCell>
                  </TableRow>
                )}
                {moveOutViewState.domainResult.get(participationItem.id) && (
                  <Redirect to={`/buildings/${buildingId}/consumptionpoints/${consumptionPointId}`} />
                )}
                {moveInViewState.domainError.get(participationItem.id) && (
                  <TableRow>
                    <TableCell colSpan={9}>
                      <ErrorAlert message={moveInViewState.domainError.get(participationItem.id)?.message ?? ""} />
                    </TableCell>
                  </TableRow>
                )}
                {moveInViewState.domainResult.get(participationItem.id) && (
                  <Redirect to={`/buildings/${buildingId}/consumptionpoints/${consumptionPointId}`} />
                )}
                <TableRow>
                  <TableCell align="left">
                    {participationItem.participant ? (
                      <ParticipantLinkView
                        zevId={zevId}
                        currentParticipant={participationItem.participant}
                        navigateToParticipant={navigateToParticipant}
                      />
                    ) : (
                      <Body1>{t("list.noParticipation.name")}</Body1>
                    )}
                  </TableCell>
                  <TableCell align="left">{participationItem.moveInDate}</TableCell>
                  <TableCell align="left">
                    {participationItem.moveOutDate ? (
                      participationItem.moveOutDate
                    ) : participationItem.participant ? (
                      <SecondaryButtonLoading
                        isLoading={moveOutViewState.isLoading.get(participationItem.id) ?? false}
                        label={t("list.button.reportMoveOut")}
                        onClick={() => moveOutParticipation(participationItem.id, participationItem.nextMoveOutDate)}
                      />
                    ) : (
                      <SecondaryButtonLoading
                        isLoading={moveInViewState.isLoading.get(participationItem.id) ?? false}
                        label={t("list.button.reportMoveIn")}
                        onClick={() => moveInParticipation(participationItem.id, participationItem.nextMoveInDate)}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {canCancelMoveOutDate && (
                      <TableActionView isLoading={deleteViewState.isLoading.get(participationItem.id) ?? false}>
                        <Tooltip title={<>{t("list.tooltip.delete")}</>}>
                          <IconButton color="secondary" onClick={() => deleteParticipation(participationItem.id)}>
                            <RemoveIcon />
                          </IconButton>
                        </Tooltip>
                      </TableActionView>
                    )}
                  </TableCell>
                </TableRow>
              </Fragment>
            )
          }}
        />
      </TableFixed>
      <TablePaginationView rowCount={participations.length} onPageRowSliceChanged={setPageRowSlice} />
    </TableContainer>
  )
}
