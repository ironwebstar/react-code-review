import { TableContainer, TableCell, TableRow } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { BillingsParticipantsItem } from "../../../../domain/billings/participant/BillingsParticipant.Model"
import { SecondaryButton } from "../../../../uikit/button/SecondaryButton"
import { ORDERED_STRING_COMPARATOR, ORDERED_BOOLEAN_COMPARATOR } from "../../../../domain/Domain.Comparators"
import { TableFixed } from "../../../../uikit/table/Table.Fixed"
import { TableColumnSort, TableHeader, TableHeaderView } from "../../../../uikit/table/Table.HeaderView"
import { TableRowView } from "../../../../uikit/table/Table.RowView"
import { DataAvailableView } from "./DataAvailableView"

enum BillingsParticipantColumns {
  CONSUMPTION_POINT_NAME = "CONSUMPTION_POINT_NAME",
  PARTICIPANT_NAME = "PARTICIPANT_NAME",
  BUILDING_NAME = "BUILDING_NAME",
  STATUS = "STATUS",
  ERROR_MESSAGE = "ERROR_MESSAGE",
  EDIT_BUTTON = "EDIT_BUTTON",
}

interface BillingsParticipantTableProps {
  allParticipants: BillingsParticipantsItem[]
  navigateToConsumptionPoint: (buildingId: string, consumptionPointId: string) => void
}

export const BillingsParticipantTable = (props: BillingsParticipantTableProps) => {
  const { t } = useTranslation("billings-participant")
  const { allParticipants, navigateToConsumptionPoint } = props
  const [orderBy, setOrderBy] = useState<TableColumnSort<BillingsParticipantColumns>>({
    column: BillingsParticipantColumns.CONSUMPTION_POINT_NAME,
    direction: "asc",
  })

  const tableHeaders: TableHeader<BillingsParticipantColumns>[] = [
    {
      column: BillingsParticipantColumns.CONSUMPTION_POINT_NAME,
      label: t("detail.all.participants.list.label.consumptionPoint"),
      width: "15%",
    },
    {
      column: BillingsParticipantColumns.PARTICIPANT_NAME,
      label: t("detail.all.participants.list.label.participant"),
      width: "25%",
    },
    {
      column: BillingsParticipantColumns.BUILDING_NAME,
      label: t("detail.all.participants.list.label.buildingName"),
      width: "10%",
    },
    {
      column: BillingsParticipantColumns.STATUS,
      label: t("detail.all.participants.list.label.status"),
      width: "5%",
    },
    {
      column: BillingsParticipantColumns.ERROR_MESSAGE,
      label: t("detail.all.participants.list.label.errorMessage"),
      width: "30%",
    },
    {
      column: BillingsParticipantColumns.EDIT_BUTTON,
      label: "",
      width: "10%",
      align: "right",
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case BillingsParticipantColumns.CONSUMPTION_POINT_NAME:
        return (a: BillingsParticipantsItem, b: BillingsParticipantsItem) =>
          ORDERED_STRING_COMPARATOR(a.consumptionPointName, b.consumptionPointName, orderBy.direction)
      case BillingsParticipantColumns.PARTICIPANT_NAME:
        return (a: BillingsParticipantsItem, b: BillingsParticipantsItem) =>
          ORDERED_STRING_COMPARATOR(a.participantName, b.participantName, orderBy.direction)
      case BillingsParticipantColumns.BUILDING_NAME:
        return (a: BillingsParticipantsItem, b: BillingsParticipantsItem) =>
          ORDERED_STRING_COMPARATOR(a.buildingName, b.buildingName, orderBy.direction)
      case BillingsParticipantColumns.STATUS:
        return (a: BillingsParticipantsItem, b: BillingsParticipantsItem) =>
          ORDERED_BOOLEAN_COMPARATOR(a.isDataAvailable, b.isDataAvailable, orderBy.direction)
      case BillingsParticipantColumns.ERROR_MESSAGE:
        return (a: BillingsParticipantsItem, b: BillingsParticipantsItem) =>
          ORDERED_STRING_COMPARATOR(a.errorMessage, b.errorMessage, orderBy.direction)
      case BillingsParticipantColumns.EDIT_BUTTON:
        return (a: BillingsParticipantsItem, b: BillingsParticipantsItem) =>
          ORDERED_STRING_COMPARATOR(a.id, b.id, orderBy.direction)
    }
  }

  return (
    <TableContainer>
      <TableFixed>
        <TableHeaderView<BillingsParticipantColumns>
          isLoading={false}
          headers={tableHeaders}
          orderBy={orderBy}
          orderByChanged={(orderBy) => setOrderBy(orderBy)}
        />
        <TableRowView<BillingsParticipantsItem>
          rows={allParticipants}
          pageRowSlice={{
            start: 0,
            end: 100,
          }}
          comparator={columnComparator}
          render={(billingsParticipantsItem) => (
            <TableRow key={billingsParticipantsItem.id}>
              <TableCell align="left">{billingsParticipantsItem.consumptionPointName}</TableCell>
              <TableCell align="left">{billingsParticipantsItem.participantName}</TableCell>
              <TableCell align="left">{billingsParticipantsItem.buildingName}</TableCell>
              <TableCell align="left">
                <DataAvailableView isDataAvailable={billingsParticipantsItem.isDataAvailable} />
              </TableCell>
              <TableCell align="left">{billingsParticipantsItem.errorMessage}</TableCell>
              <TableCell align="right">
                <SecondaryButton
                  label={t("shared:form.action.edit")}
                  onClick={() =>
                    navigateToConsumptionPoint(
                      billingsParticipantsItem.buildingId,
                      billingsParticipantsItem.consumptionPointId,
                    )
                  }
                />
              </TableCell>
            </TableRow>
          )}
        />
      </TableFixed>
    </TableContainer>
  )
}
