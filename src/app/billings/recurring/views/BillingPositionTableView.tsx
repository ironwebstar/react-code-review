import { TableContainer, TableRow, TableCell } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { BillingPosition } from "../../../../domain/billings/recurring/BillingsRecurring.Model"
import { DEFAULT_ROWS_PER_PAGE } from "../../../../uikit/Shared.Consts"
import { ORDERED_NUMBER_COMPARATOR, ORDERED_STRING_COMPARATOR } from "../../../../domain/Domain.Comparators"
import { TableFixed } from "../../../../uikit/table/Table.Fixed"
import { TableColumnSort, TableHeader, TableHeaderView } from "../../../../uikit/table/Table.HeaderView"
import { TableRowView } from "../../../../uikit/table/Table.RowView"

enum BillingServicePositionsColumns {
  BILLING_SERVICE = "BILLING_SERVICE",
  QUANTITY = "QUANTITY",
  PRICE = "PRICE",
  TOTAL = "TOTAL",
}

interface BillingPositionsTableViewProps {
  billingPositions: BillingPosition[]
}

export const BillingPositionsTableView = (props: BillingPositionsTableViewProps) => {
  const { t } = useTranslation("billings-recurring")
  const { billingPositions } = props

  const tableHeaders: TableHeader<BillingServicePositionsColumns>[] = [
    {
      column: BillingServicePositionsColumns.BILLING_SERVICE,
      label: t("field.label.position.name"),
      width: "70%",
    },
    {
      column: BillingServicePositionsColumns.QUANTITY,
      label: t("field.label.position.quantity"),
      width: "10%",
      align: "right",
    },
    {
      column: BillingServicePositionsColumns.PRICE,
      label: t("field.label.position.price"),
      width: "10%",
      align: "right",
    },
    {
      column: BillingServicePositionsColumns.TOTAL,
      label: t("field.label.position.total"),
      width: "10%",
      align: "right",
    },
  ]

  const [orderByPositionTable, setOrderByPositionTable] = useState<TableColumnSort<BillingServicePositionsColumns>>({
    column: BillingServicePositionsColumns.BILLING_SERVICE,
    direction: "asc",
  })

  const columnComparator = () => {
    switch (orderByPositionTable.column) {
      case BillingServicePositionsColumns.BILLING_SERVICE:
        return (a: BillingPosition, b: BillingPosition) =>
          ORDERED_STRING_COMPARATOR(a.name, b.name, orderByPositionTable.direction)
      case BillingServicePositionsColumns.QUANTITY:
        return (a: BillingPosition, b: BillingPosition) =>
          ORDERED_NUMBER_COMPARATOR(a.sortableQuantity, b.sortableQuantity, orderByPositionTable.direction)
      case BillingServicePositionsColumns.PRICE:
        return (a: BillingPosition, b: BillingPosition) =>
          ORDERED_NUMBER_COMPARATOR(a.sortablePrice, b.sortablePrice, orderByPositionTable.direction)
      case BillingServicePositionsColumns.TOTAL:
        return (a: BillingPosition, b: BillingPosition) =>
          ORDERED_NUMBER_COMPARATOR(a.sortableFinalAmountDue, b.sortableFinalAmountDue, orderByPositionTable.direction)
    }
  }

  return (
    <TableContainer>
      <TableFixed>
        <TableHeaderView<BillingServicePositionsColumns>
          headers={tableHeaders}
          orderBy={orderByPositionTable}
          orderByChanged={(orderBy) => setOrderByPositionTable(orderBy)}
        />
        <TableRowView<BillingPosition>
          colSpan={4}
          rows={billingPositions}
          pageRowSlice={{
            start: 0,
            end: DEFAULT_ROWS_PER_PAGE,
          }}
          comparator={columnComparator}
          render={(billingPosition) => (
            <TableRow key={billingPosition.id}>
              <TableCell align="left">{billingPosition.name}</TableCell>
              <TableCell align="right">{billingPosition.quantity}</TableCell>
              <TableCell align="right">{billingPosition.price}</TableCell>
              <TableCell align="right">{billingPosition.finalAmountDue}</TableCell>
            </TableRow>
          )}
        />
      </TableFixed>
    </TableContainer>
  )
}
