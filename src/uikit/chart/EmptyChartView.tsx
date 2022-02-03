import { Grid, Box } from "@mui/material"

export const EmptyChartDisplay = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
      <Box sx={{ height: 2, backgroundColor: "#EEEEEE", width: "100%" }} />
    </Grid>
  )
}
