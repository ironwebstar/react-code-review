import { Table } from "@mui/material"
import { HasChildren } from "../Shared.Prop"

export const TableFixed = (props: HasChildren) => {
  const { children } = props
  return <Table sx={{ tableLayout: "fixed" }}>{children}</Table>
}
