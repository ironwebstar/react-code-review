import TableContainer from "@mui/material/TableContainer"
import TableCell from "@mui/material/TableCell"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { TableRowErrorAlert } from "../../../uikit/Shared.Alert"
import { TableFixed } from "../../../uikit/table/Table.Fixed"
import { TableColumnSort, TableHeader, TableHeaderView } from "../../../uikit/table/Table.HeaderView"
import { TableRowView, TableRowClickable } from "../../../uikit/table/Table.RowView"
import { firstViewState } from "../../Shared.Reducer"
import { ORDERED_NUMBER_COMPARATOR, ORDERED_STRING_COMPARATOR } from "../../../domain/Domain.Comparators"
import { BillingsIndividualParticipantListItem } from "../../../domain/billings/participant/BillingsIndividualParticipant.Model"
import { mapDispatchToProps } from "./BillingsIndividualParticipantZevList.Connect"
import { BillingsIndividualParticipantZevListState } from "./BillingsIndividualParticipantZevList.Reducer"
import { SecondaryButton } from "../../../uikit/button/SecondaryButton"

enum BillingsIndividualParticipantZevListColumns {
  PERIOD = "PERIOD",
  CONSUMPTION_POINT = "CONSUMPTION_POINT",
  PARTICIPANT = "PARTICIPANT",
  BILLING_STATE = "BILLING_STATE",
  BILL_BUTTON = "BILL_BUTTON",
}

interface BillingsIndividualParticipantZevListComponentProps
  extends BillingsIndividualParticipantZevListState,
    ReturnType<typeof mapDispatchToProps> {
  zevId: string
}

export const BillingsIndividualParticipantZevListComponent = (
  props: BillingsIndividualParticipantZevListComponentProps,
) => {
  const { t } = useTranslation("billings-participant")

  const { zevId, viewState, getIndividualParticipantBillings, navigateToIndividualParticipantBilling } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getIndividualParticipantBillings(zevId)
    }
  }, [viewState])

  const billingsIndividualParticipantList = useMemo(() => viewState.domainResult?.billingsIndividual ?? [], [viewState])

  const [orderBy, setOrderBy] = useState<TableColumnSort<BillingsIndividualParticipantZevListColumns>>({
    column: BillingsIndividualParticipantZevListColumns.PERIOD,
    direction: "desc",
  })

  const tableHeaders: TableHeader<BillingsIndividualParticipantZevListColumns>[] = [
    {
      column: BillingsIndividualParticipantZevListColumns.PERIOD,
      label: t("list.individual.label.period"),
      width: "20%",
    },
    {
      column: BillingsIndividualParticipantZevListColumns.CONSUMPTION_POINT,
      label: t("list.individual.label.consumptionPoint"),
      width: "20%",
    },
    {
      column: BillingsIndividualParticipantZevListColumns.PARTICIPANT,
      label: t("list.individual.label.participant"),
      width: "25%",
    },
    {
      column: BillingsIndividualParticipantZevListColumns.BILLING_STATE,
      label: t("list.individual.label.status"),
      width: "15%",
    },
    {
      column: BillingsIndividualParticipantZevListColumns.BILL_BUTTON,
      label: "",
      width: "20%",
      align: "right",
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case BillingsIndividualParticipantZevListColumns.PERIOD:
        return (a: BillingsIndividualParticipantListItem, b: BillingsIndividualParticipantListItem) =>
          ORDERED_NUMBER_COMPARATOR(a.periodSortValue, b.periodSortValue, orderBy.direction)
      case BillingsIndividualParticipantZevListColumns.CONSUMPTION_POINT:
        return (a: BillingsIndividualParticipantListItem, b: BillingsIndividualParticipantListItem) =>
          ORDERED_STRING_COMPARATOR(a.consumptionPoint, b.consumptionPoint, orderBy.direction)
      case BillingsIndividualParticipantZevListColumns.PARTICIPANT:
        return (a: BillingsIndividualParticipantListItem, b: BillingsIndividualParticipantListItem) =>
          ORDERED_STRING_COMPARATOR(a.participant, b.participant, orderBy.direction)
      case BillingsIndividualParticipantZevListColumns.BILLING_STATE:
        return (a: BillingsIndividualParticipantListItem, b: BillingsIndividualParticipantListItem) =>
          ORDERED_STRING_COMPARATOR(a.billingState, b.billingState, orderBy.direction)
      default:
        return (a: BillingsIndividualParticipantListItem, b: BillingsIndividualParticipantListItem) =>
          ORDERED_STRING_COMPARATOR(a.id, b.id, orderBy.direction)
    }
  }

  return (
    <>
      <TableContainer>
        <TableFixed>
          <TableHeaderView<BillingsIndividualParticipantZevListColumns>
            isLoading={viewState.isLoading}
            headers={tableHeaders}
            orderBy={orderBy}
            orderByChanged={(orderBy) => setOrderBy(orderBy)}
          />
          {viewState.domainError && <TableRowErrorAlert colSpan={5} message={viewState.domainError.message} />}
          <TableRowView<BillingsIndividualParticipantListItem>
            colSpan={5}
            rows={billingsIndividualParticipantList}
            pageRowSlice={{
              start: 0,
              end: 100,
            }}
            comparator={columnComparator}
            render={(billingsIndividualParticipantItem) => (
              <TableRowClickable<BillingsIndividualParticipantListItem>
                key={billingsIndividualParticipantItem.id}
                rowData={billingsIndividualParticipantItem}
                rowClick={(billingsIndividualParticipantItem) =>
                  navigateToIndividualParticipantBilling(zevId, billingsIndividualParticipantItem.id)
                }
              >
                <TableCell align="left">{billingsIndividualParticipantItem.period}</TableCell>
                <TableCell align="left">{billingsIndividualParticipantItem.consumptionPoint}</TableCell>
                <TableCell align="left">{billingsIndividualParticipantItem.participant}</TableCell>
                <TableCell align="left">{t(`state.${billingsIndividualParticipantItem.billingState}`)}</TableCell>
                <TableCell align="right">
                  {billingsIndividualParticipantItem.billingApprovalReady && (
                    <SecondaryButton label={t("list.individual.button")} />
                  )}
                </TableCell>
              </TableRowClickable>
            )}
          />
        </TableFixed>
      </TableContainer>
    </>
  )
}
