import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableSortLabel from "@mui/material/TableSortLabel"
import Box from "@mui/material/Box"
import { visuallyHidden } from "@mui/utils"
import { SortDirection } from "../../domain/Domain.Comparators"
import { TableLoadingSkeleton } from "./Table.Loading"
import { DEFAULT_ROWS_PER_PAGE } from "../Shared.Consts"
import { Typography } from "@mui/material"

export interface TableHeader<T> {
  column: T
  label: string
  width: number | string
  orderable?: boolean
  align?: "left" | "right"
}

export interface TableColumnSort<T> {
  column: T
  direction: SortDirection
}

interface TableHeaderViewProps<T extends string> {
  headers: TableHeader<T>[]
  orderBy: TableColumnSort<T>
  orderByChanged: (sort: TableColumnSort<T>) => void
  isLoading?: boolean
}

export function TableHeaderView<T extends string>(props: TableHeaderViewProps<T>) {
  const { headers, orderBy, isLoading, orderByChanged } = props
  return (
    <>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell
              key={header.column}
              align={header.align ? header.align : "left"}
              padding="normal"
              sortDirection={orderBy.direction}
              sx={{
                width: header.width,
              }}
            >
              {header.orderable === false ? (
                <Typography
                  id={`table-header-${header.column}`}
                  variant="subtitle2"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  {header.label}
                </Typography>
              ) : (
                <TableSortLabel
                  id={`table-header-${header.column}`}
                  active={orderBy.column === header.column}
                  direction={orderBy.direction}
                  onClick={() => {
                    if (orderBy.column === header.column) {
                      orderByChanged({
                        ...orderBy,
                        direction: orderBy.direction === "asc" ? "desc" : "asc",
                      })
                    } else {
                      orderByChanged({
                        column: header.column,
                        direction: "asc",
                      })
                    }
                  }}
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  {header.label}
                  {orderBy.column === header.column ? (
                    <Box component="span" sx={visuallyHidden}>
                      {orderBy.direction === "desc" ? "sorted descending" : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      {isLoading && <TableLoadingSkeleton colSpan={headers.length} rowsPerPage={DEFAULT_ROWS_PER_PAGE} />}
    </>
  )
}
