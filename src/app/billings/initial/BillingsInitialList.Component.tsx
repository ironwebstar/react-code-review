import TableContainer from "@mui/material/TableContainer"
import TableCell from "@mui/material/TableCell"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { StatusView } from "../../../uikit/label/StatusView"
import { PageHeaderFilterBox } from "../../../uikit/page/PageHeaderFilterBox"
import { PaperBox } from "../../../uikit/page/PaperBox"
import { TableRowErrorAlert } from "../../../uikit/Shared.Alert"
import { DEFAULT_ROWS_PER_PAGE } from "../../../uikit/Shared.Consts"
import { ORDERED_STRING_COMPARATOR } from "../../../domain/Domain.Comparators"
import { TableFixed } from "../../../uikit/table/Table.Fixed"
import { TableColumnSort, TableHeaderView } from "../../../uikit/table/Table.HeaderView"
import { PageRowSlice, TablePaginationView } from "../../../uikit/table/Table.PaginationView"
import { TableRowView, TableRowClickable } from "../../../uikit/table/Table.RowView"
import { firstViewState } from "../../Shared.Reducer"
import { BillingsInitialListState } from "./BillingsInitialList.Reducer"
import { BillingsInitialListItem } from "../../../domain/billings/initial/BillingsInitial.Model"
import { OpenButton } from "../../../uikit/button/OpenButton"
import { mapDispatchToProps } from "./BillingsInitialList.Connect"

enum BillingsInitialColumns {
  STATUS_TYPE = "STATUS_TYPE",
  BILL_NUMNER = "BILL_NUMNER",
  DATE = "DATE",
  ZEV = "ZEV",
}

interface BillingsInitialListComponentProps extends BillingsInitialListState, ReturnType<typeof mapDispatchToProps> {}

export const BillingsInitialListComponent = (props: BillingsInitialListComponentProps) => {
  const { t } = useTranslation("billings-initial")

  const { viewState, getInitialBillings, navigateToInitialBilling, navigateToZev } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getInitialBillings()
    }
  }, [viewState])

  const billingInitialList = useMemo(
    () =>
      viewState.domainResult?.billingsInitial?.map((billing) => ({
        ...billing,
        sortableStatusType: t(`shared:status.${billing.statusType}`),
      })) ?? [],
    [viewState],
  )

  const [orderBy, setOrderBy] = useState<TableColumnSort<BillingsInitialColumns>>({
    column: BillingsInitialColumns.STATUS_TYPE,
    direction: "asc",
  })

  const [pageRowSlice, setPageRowSlice] = useState<PageRowSlice>({
    start: 0,
    end: DEFAULT_ROWS_PER_PAGE,
  })

  const [filterQuery, setFilterQuery] = useState<string>("")

  const tableHeaders = [
    {
      column: BillingsInitialColumns.STATUS_TYPE,
      label: t("list.label.status"),
      width: "10%",
    },
    {
      column: BillingsInitialColumns.BILL_NUMNER,
      label: t("list.label.bill-number"),
      width: "35%",
    },
    {
      column: BillingsInitialColumns.DATE,
      label: t("list.label.date"),
      width: "15%",
    },
    {
      column: BillingsInitialColumns.ZEV,
      label: t("field.label.zev"),
      width: "40%",
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case BillingsInitialColumns.STATUS_TYPE:
        return (a: BillingsInitialListItem, b: BillingsInitialListItem) =>
          ORDERED_STRING_COMPARATOR(a.sortableStatusType, b.sortableStatusType, orderBy.direction)
      case BillingsInitialColumns.BILL_NUMNER:
        return (a: BillingsInitialListItem, b: BillingsInitialListItem) =>
          ORDERED_STRING_COMPARATOR(a.billNumber, b.billNumber, orderBy.direction)
      case BillingsInitialColumns.DATE:
        return (a: BillingsInitialListItem, b: BillingsInitialListItem) =>
          ORDERED_STRING_COMPARATOR(a.date, b.date, orderBy.direction)
      case BillingsInitialColumns.ZEV:
        return (a: BillingsInitialListItem, b: BillingsInitialListItem) =>
          ORDERED_STRING_COMPARATOR(a.zevName, b.zevName, orderBy.direction)
    }
  }

  return (
    <>
      <PaperBox>
        <PageHeaderFilterBox
          id="list-title"
          headerTitle={t("list.title")}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        />
        <TableContainer>
          <TableFixed>
            <TableHeaderView<BillingsInitialColumns>
              isLoading={viewState.isLoading}
              headers={tableHeaders}
              orderBy={orderBy}
              orderByChanged={(orderBy) => setOrderBy(orderBy)}
            />
            {viewState.domainError && (
              <TableRowErrorAlert
                colSpan={4}
                retry={() => getInitialBillings()}
                message={viewState.domainError.message}
              />
            )}
            <TableRowView<BillingsInitialListItem>
              colSpan={4}
              rows={billingInitialList}
              pageRowSlice={pageRowSlice}
              comparator={columnComparator}
              filterQuery={filterQuery}
              render={(billingInitialItem) => (
                <TableRowClickable<BillingsInitialListItem>
                  key={billingInitialItem.id}
                  rowData={billingInitialItem}
                  rowClick={(billingInitialItem) => navigateToInitialBilling(billingInitialItem.id)}
                >
                  <TableCell align="left">
                    <StatusView statusType={billingInitialItem.statusType} />
                  </TableCell>
                  <TableCell align="left">{billingInitialItem.billNumber}</TableCell>
                  <TableCell align="left">{billingInitialItem.date}</TableCell>
                  <TableCell align="left">
                    <OpenButton
                      label={billingInitialItem.zevName}
                      open={() => navigateToZev(billingInitialItem.zevId)}
                    />
                  </TableCell>
                </TableRowClickable>
              )}
            />
          </TableFixed>
          <TablePaginationView rowCount={billingInitialList.length} onPageRowSliceChanged={setPageRowSlice} />
        </TableContainer>
      </PaperBox>
    </>
  )
}
