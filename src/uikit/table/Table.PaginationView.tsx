import { TablePagination } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export interface PageRowSlice {
  start: number
  end: number
}

interface TablePaginationViewProps {
  rowCount: number
  onPageRowSliceChanged: (slice: PageRowSlice) => void
}

export const TablePaginationView = (props: TablePaginationViewProps) => {
  const { t } = useTranslation()
  const { rowCount, onPageRowSliceChanged } = props
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(25)
  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      labelDisplayedRows={(info) =>
        t("shared:table.labelDisplayedRows", {
          from: info.from,
          to: info.to,
          count: info.count,
        })
      }
      labelRowsPerPage={t("shared:table.labelRowsPerPage")}
      count={rowCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={(_, page) => {
        const nextPage = page
        setPage(nextPage)
        onPageRowSliceChanged(pageRowSlice(nextPage, rowsPerPage, rowCount))
      }}
      onRowsPerPageChange={(event) => {
        const nextRowsPerPage = +event.target.value
        setRowsPerPage(nextRowsPerPage)
        setPage(0)
        onPageRowSliceChanged(pageRowSlice(0, nextRowsPerPage, rowCount))
      }}
    />
  )
}

const pageRowSlice = (page: number, rowsPerPage: number, rowCount: number): PageRowSlice => {
  const start = page * rowsPerPage
  const end = Math.min(start + rowsPerPage, rowCount)
  return {
    start: start,
    end: end,
  }
}
