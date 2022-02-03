import { Box } from "@mui/material"
import { HasChildren } from "../Shared.Prop"

export const PageHeaderBox = (props: HasChildren) => {
  const { children } = props
  return (
    <Box
      sx={{
        minWidth: 480,
      }}
    >
      {children}
    </Box>
  )
}
