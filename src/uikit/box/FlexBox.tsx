import { Box, BoxTypeMap } from "@mui/material"
import { DefaultComponentProps } from "@mui/material/OverridableComponent"

export const FlexOneBox = (props: Partial<DefaultComponentProps<BoxTypeMap>>) => {
  const { sx, children } = props
  return (
    <Box
      sx={{
        ...sx,
        flex: 1,
      }}
    >
      {children}
    </Box>
  )
}
