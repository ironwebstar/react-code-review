import { BoxTypeMap, Paper } from "@mui/material"
import Grid from "@mui/material/Grid"
import { DefaultComponentProps } from "@mui/material/OverridableComponent"
import { TinyPaddedBox } from "../box/PaddedBox"

export const PaperBox = (props: Partial<DefaultComponentProps<BoxTypeMap>>) => {
  const { id, children, sx } = props
  return (
    <Paper id={id} sx={sx}>
      <TinyPaddedBox>
        <Grid container direction="column">
          {children}
        </Grid>
      </TinyPaddedBox>
    </Paper>
  )
}
