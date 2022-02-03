import TableRow from "@mui/material/TableRow"
import TableBody from "@mui/material/TableBody"
import { PageRowSlice } from "./Table.PaginationView"
import { HasChildren } from "../Shared.Prop"
import { useTranslation } from "react-i18next"
import { TableCell } from "@mui/material"

export interface TableData {
  id: string | number
}

export type TableComparator<T extends TableData> = (a: T, b: T) => number

interface TableRowViewProps<T extends TableData> {
  id?: string
  rows: T[]
  pageRowSlice: PageRowSlice
  render: (data: T) => React.ReactNode
  comparator?: () => TableComparator<T>
  filterQuery?: string
  colSpan?: number
}

export function TableRowView<T extends TableData>(props: TableRowViewProps<T>) {
  const { t } = useTranslation()
  const { id, rows, render, comparator, pageRowSlice, filterQuery, colSpan } = props
  const items = rows
    .filter((row) => rowsFilter<T>(row, filterQuery?.trim()))
    .sort(comparator && comparator())
    .slice(pageRowSlice.start, pageRowSlice.end)
  return (
    <>
      {items.length === 0 && (
        <TableBody>
          <TableRow>
            <TableCell colSpan={colSpan} align="center">
              <em>{t("shared:label.empty.list")}</em>
            </TableCell>
          </TableRow>
        </TableBody>
      )}
      {items.length > 0 && <TableBody id={id}>{items.map((row) => render(row))}</TableBody>}
    </>
  )
}

interface TableRowClickableProps<T extends TableData> {
  rowData: T
  rowClick: (item: T) => void
}

export function TableRowClickable<T extends TableData>(props: TableRowClickableProps<T> & HasChildren) {
  const { rowData, rowClick, children } = props
  return (
    <TableRow
      hover
      sx={{
        cursor: "pointer",
      }}
      onClick={() => rowClick(rowData)}
    >
      {children}
    </TableRow>
  )
}

function rowsFilter<T extends TableData>(row: T, query?: string) {
  if (!query) return true
  return Object.values(row).some((entry) => {
    if (typeof entry === "string") return entry.toLowerCase().includes(query.toLowerCase())
    return false
  })
}
