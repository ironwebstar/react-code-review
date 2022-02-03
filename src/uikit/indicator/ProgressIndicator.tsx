import { CircularProgress, Grid } from "@mui/material"

export const MiddleCircularProgress = (props: { height: number }) => {
  const { height } = props
  return (
    <Grid container justifyContent="center" alignContent="center" height={height}>
      <CircularProgress color="primary" size={48} />
    </Grid>
  )
}
