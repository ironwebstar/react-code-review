import { Paper } from "@mui/material"
import Grid from "@mui/material/Grid"
import { HasChildren } from "../../../uikit/Shared.Prop"
import loginHeader from "url:../../../../res/auth.png"

export const AuthContainerView = (props: HasChildren) => {
  const { children } = props
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100%",
      }}
    >
      <Paper
        sx={{
          width: 480,
        }}
      >
        <Grid container justifyContent="center">
          <img src={loginHeader} width={340} height={340} />
        </Grid>
        {children}
      </Paper>
    </Grid>
  )
}
