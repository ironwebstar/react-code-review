import Grid from "@mui/material/Grid"
import { HasChildren } from "../../../uikit/Shared.Prop"

export const AppContainerView = (props: HasChildren) => {
  const { children } = props
  return <Grid container>{children}</Grid>
}
