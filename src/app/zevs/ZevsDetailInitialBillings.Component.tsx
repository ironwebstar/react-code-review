import TableContainer from "@mui/material/TableContainer"
import TableCell from "@mui/material/TableCell"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { ZevsDetailInitialBillingsState } from "./ZevsDetailInitialBillings.Reducer"
import { firstViewState } from "../Shared.Reducer"
import { TableColumnSort, TableHeaderView } from "../../uikit/table/Table.HeaderView"
import { PageRowSlice, TablePaginationView } from "../../uikit/table/Table.PaginationView"
import { DEFAULT_ROWS_PER_PAGE } from "../../uikit/Shared.Consts"
import { ORDERED_STRING_COMPARATOR } from "../../domain/Domain.Comparators"
import { PaperBox } from "../../uikit/page/PaperBox"
import { TableFixed } from "../../uikit/table/Table.Fixed"
import { TableRowErrorAlert } from "../../uikit/Shared.Alert"
import { TableRowClickable, TableRowView } from "../../uikit/table/Table.RowView"
import { StatusView } from "../../uikit/label/StatusView"
import { ZevDetailBillingsListItem } from "../../domain/zevs/ZevsDetail.Model"
import { mapDispatchToProps } from "./ZevsDetailInitialBillings.Connect"

enum ZevsDetailBillingsColumns {
  STATUS_TYPE = "STATUS_TYPE",
  BILL_NUMBER = "BILL_NUMBER",
  DATE = "DATE",
  TOTAL = "TOTAL",
}

interface ZevsDetailBillingsComponentProps
  extends ZevsDetailInitialBillingsState,
    ReturnType<typeof mapDispatchToProps> {
  zevId: string
}

export const ZevsDetailInitialBillingsComponent = (props: ZevsDetailBillingsComponentProps) => {
  const { t } = useTranslation("zevs")

  const { viewState, zevId, getInitialBillings, navigateToInitialBilling } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getInitialBillings(zevId)
    }
  }, [viewState])

  const initialBillingList = useMemo(
    () =>
      viewState.domainResult?.zevDetailBillings?.map((billing) => ({
        ...billing,
        sortableStatusType: t(`shared:status.${billing.status}`),
      })) ?? [],
    [viewState],
  )

  const [orderBy, setOrderBy] = useState<TableColumnSort<ZevsDetailBillingsColumns>>({
    column: ZevsDetailBillingsColumns.DATE,
    direction: "asc",
  })

  const [pageRowSlice, setPageRowSlice] = useState<PageRowSlice>({
    start: 0,
    end: DEFAULT_ROWS_PER_PAGE,
  })

  const [filterQuery] = useState<string>("")

  const tableHeaders = [
    {
      column: ZevsDetailBillingsColumns.STATUS_TYPE,
      label: t("list.label.billing.status"),
      width: "25%",
      orderable: true,
    },
    {
      column: ZevsDetailBillingsColumns.BILL_NUMBER,
      label: t("list.label.billing.bill-number"),
      width: "25%",
      orderable: true,
    },
    {
      column: ZevsDetailBillingsColumns.DATE,
      label: t("list.label.billing.date"),
      width: "25%",
      orderable: true,
    },
    {
      column: ZevsDetailBillingsColumns.TOTAL,
      label: t("list.label.billing.totalAmount"),
      width: "25%",
      orderable: true,
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case ZevsDetailBillingsColumns.STATUS_TYPE:
        return (a: ZevDetailBillingsListItem, b: ZevDetailBillingsListItem) =>
          ORDERED_STRING_COMPARATOR(a.sortableStatus, b.sortableStatus, orderBy.direction)
      case ZevsDetailBillingsColumns.BILL_NUMBER:
        return (a: ZevDetailBillingsListItem, b: ZevDetailBillingsListItem) =>
          ORDERED_STRING_COMPARATOR(a.billNumber, b.billNumber, orderBy.direction)
      case ZevsDetailBillingsColumns.DATE:
        return (a: ZevDetailBillingsListItem, b: ZevDetailBillingsListItem) =>
          ORDERED_STRING_COMPARATOR(a.date, b.date, orderBy.direction)
      case ZevsDetailBillingsColumns.TOTAL:
        return (a: ZevDetailBillingsListItem, b: ZevDetailBillingsListItem) =>
          ORDERED_STRING_COMPARATOR(a.totalAmountDue, b.totalAmountDue, orderBy.direction)
    }
  }

  return (
    <>
      <PaperBox>
        <TableContainer>
          <TableFixed>
            <TableHeaderView<ZevsDetailBillingsColumns>
              isLoading={viewState.isLoading}
              headers={tableHeaders}
              orderBy={orderBy}
              orderByChanged={(orderBy) => setOrderBy(orderBy)}
            />
            {viewState.domainError && (
              <TableRowErrorAlert
                colSpan={4}
                retry={() => getInitialBillings(zevId)}
                message={viewState.domainError.message}
              />
            )}
            <TableRowView<ZevDetailBillingsListItem>
              colSpan={4}
              rows={initialBillingList}
              pageRowSlice={pageRowSlice}
              comparator={columnComparator}
              filterQuery={filterQuery}
              render={(initialBillingItem) => (
                <TableRowClickable<ZevDetailBillingsListItem>
                  key={initialBillingItem.id}
                  rowData={initialBillingItem}
                  rowClick={(initialBillingItem) => navigateToInitialBilling(initialBillingItem.id)}
                >
                  <TableCell align="left">
                    <StatusView statusType={initialBillingItem.status} />
                  </TableCell>
                  <TableCell align="left">{initialBillingItem.billNumber}</TableCell>
                  <TableCell align="left">{initialBillingItem.date}</TableCell>
                  <TableCell align="left">{initialBillingItem.totalAmountDue}</TableCell>
                </TableRowClickable>
              )}
            />
          </TableFixed>
          <TablePaginationView rowCount={initialBillingList.length} onPageRowSliceChanged={setPageRowSlice} />
        </TableContainer>
      </PaperBox>
    </>
  )
}
