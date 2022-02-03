import TableContainer from "@mui/material/TableContainer"
import TableCell from "@mui/material/TableCell"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { ErrorAlert } from "../../../uikit/Shared.Alert"
import { TableFixed } from "../../../uikit/table/Table.Fixed"
import { TableColumnSort, TableHeader, TableHeaderView } from "../../../uikit/table/Table.HeaderView"
import { TableRowView, TableRowClickable } from "../../../uikit/table/Table.RowView"
import { firstViewState } from "../../Shared.Reducer"
import { mapDispatchToProps } from "./BillingsAllParticipantZevList.Connect"
import { BillingsAllParticipantZevListState } from "./BillingsAllParticipantZevList.Reducer"
import { ORDERED_NUMBER_COMPARATOR, ORDERED_STRING_COMPARATOR } from "../../../domain/Domain.Comparators"
import { SecondaryButton } from "../../../uikit/button/SecondaryButton"
import { BillingsAllParticipantListItem } from "../../../domain/billings/participant/BillingsAllParticipant.Model"

enum BillingsAllParticipantZevListColumns {
  PERIOD = "PERIOD",
  TOTAL = "TOTAL",
  BILLING_STATE = "BILLING_STATE",
  BILL_BUTTON = "BILL_BUTTON",
}

interface BillingsAllParticipantZevListComponentProps
  extends BillingsAllParticipantZevListState,
    ReturnType<typeof mapDispatchToProps> {
  zevId: string
}

export const BillingsAllParticipantZevListComponent = (props: BillingsAllParticipantZevListComponentProps) => {
  const { t } = useTranslation("billings-participant")

  const { zevId, viewState, getAllParticipantBillings, navigateToAllParticipantBilling } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getAllParticipantBillings(zevId)
    }
  }, [viewState])

  const billingsAllParticipantList = useMemo(() => viewState.domainResult?.billingsAll ?? [], [viewState])

  const [orderBy, setOrderBy] = useState<TableColumnSort<BillingsAllParticipantZevListColumns>>({
    column: BillingsAllParticipantZevListColumns.PERIOD,
    direction: "desc",
  })

  const tableHeaders: TableHeader<BillingsAllParticipantZevListColumns>[] = [
    {
      column: BillingsAllParticipantZevListColumns.PERIOD,
      label: t("list.all.label.period"),
      width: "35%",
    },
    {
      column: BillingsAllParticipantZevListColumns.TOTAL,
      label: t("list.all.label.total"),
      width: "15%",
    },
    {
      column: BillingsAllParticipantZevListColumns.BILLING_STATE,
      label: t("list.all.label.status"),
      width: "15%",
    },
    {
      column: BillingsAllParticipantZevListColumns.BILL_BUTTON,
      label: "",
      width: "35%",
      align: "right",
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case BillingsAllParticipantZevListColumns.PERIOD:
        return (a: BillingsAllParticipantListItem, b: BillingsAllParticipantListItem) =>
          ORDERED_NUMBER_COMPARATOR(a.periodSortValue, b.periodSortValue, orderBy.direction)
      case BillingsAllParticipantZevListColumns.TOTAL:
        return (a: BillingsAllParticipantListItem, b: BillingsAllParticipantListItem) =>
          ORDERED_STRING_COMPARATOR(a.total, b.total, orderBy.direction)
      case BillingsAllParticipantZevListColumns.BILLING_STATE:
        return (a: BillingsAllParticipantListItem, b: BillingsAllParticipantListItem) =>
          ORDERED_STRING_COMPARATOR(a.billingState, b.billingState, orderBy.direction)
      default:
        return (a: BillingsAllParticipantListItem, b: BillingsAllParticipantListItem) =>
          ORDERED_STRING_COMPARATOR(a.id, b.id, orderBy.direction)
    }
  }

  return (
    <>
      {viewState.domainError && <ErrorAlert message={viewState.domainError.message} />}
      <TableContainer>
        <TableFixed>
          <TableHeaderView<BillingsAllParticipantZevListColumns>
            isLoading={viewState.isLoading}
            headers={tableHeaders}
            orderBy={orderBy}
            orderByChanged={(orderBy) => setOrderBy(orderBy)}
          />
          <TableRowView<BillingsAllParticipantListItem>
            colSpan={4}
            rows={billingsAllParticipantList}
            pageRowSlice={{
              start: 0,
              end: 100,
            }}
            comparator={columnComparator}
            render={(billingsAllParticipantItem) => (
              <TableRowClickable<BillingsAllParticipantListItem>
                key={billingsAllParticipantItem.id}
                rowData={billingsAllParticipantItem}
                rowClick={(billingsAllParticipantItem) =>
                  navigateToAllParticipantBilling(zevId, billingsAllParticipantItem.id)
                }
              >
                <TableCell align="left">{billingsAllParticipantItem.period}</TableCell>
                <TableCell align="left">{billingsAllParticipantItem.total}</TableCell>
                <TableCell align="left">{t(`state.${billingsAllParticipantItem.billingState}`)}</TableCell>
                <TableCell align="right">
                  {billingsAllParticipantItem.billingApprovalReady && <SecondaryButton label={t("list.all.button")} />}
                </TableCell>
              </TableRowClickable>
            )}
          />
        </TableFixed>
      </TableContainer>
    </>
  )
}
