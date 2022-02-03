import { Skeleton, TableCell, TableBody, TableRow } from "@mui/material"

interface TableLoadingSkeletonProps {
  colSpan: number
  rowsPerPage: number
}

export const TableLoadingSkeleton = (props: TableLoadingSkeletonProps) => {
  const { colSpan, rowsPerPage } = props
  const rows = [...Array(rowsPerPage)].map((_, i) => (
    <TableRow
      key={i}
      sx={{
        padding: 0,
      }}
    >
      {[...Array(colSpan)].map((_, i) => (
        <TableCell
          key={i}
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
            height: 56,
          }}
        >
          <Skeleton
            animation="wave"
            sx={{
              backgroundColor: "#eeeeee",
              height: 42,
            }}
          />
        </TableCell>
      ))}
    </TableRow>
  ))
  return <TableBody>{rows}</TableBody>
}
