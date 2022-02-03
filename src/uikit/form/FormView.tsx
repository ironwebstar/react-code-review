import { Grid, Typography, Box } from "@mui/material"
import { DataItemBox } from "../box/DataItemBox"
import { TinyPaddedBox } from "../box/PaddedBox"
import { HasChildren } from "../Shared.Prop"

export enum FormMode {
  CREATE,
  UPDATE,
}

export const FormView = (props: HasChildren) => {
  const { children } = props
  return (
    <Grid container direction="column">
      {children}
    </Grid>
  )
}

export const FormSectionTitle = (props: { label: React.ReactNode; icon?: React.ReactNode }) => {
  const { label, icon } = props
  return (
    <Grid container alignItems="center">
      {icon && <TinyPaddedBox mt={2}>{icon}</TinyPaddedBox>}
      <TinyPaddedBox mt={2}>
        <Typography
          variant="h5"
          sx={{
            textTransform: "uppercase",
          }}
        >
          {label}
        </Typography>
      </TinyPaddedBox>
    </Grid>
  )
}

export const FormSubtitle = (props: { label: React.ReactNode; icon?: React.ReactNode }) => {
  const { label, icon } = props
  return (
    <Grid container alignItems="center">
      {icon && (
        <Box pl={1} mt={2}>
          {icon}
        </Box>
      )}
      <Box pl={1} mt={2}>
        <Typography
          variant="h6"
          sx={{
            textTransform: "uppercase",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Grid>
  )
}

export const FormRowCell = (props: HasChildren) => {
  const { children } = props
  return (
    <TinyPaddedBox
      sx={{
        flex: 1,
      }}
    >
      {children}
    </TinyPaddedBox>
  )
}

export const FormReadOnlyCell = (props: { title: string; value: string }) => {
  const { title, value } = props
  return (
    <Box
      sx={{
        flex: 1,
      }}
    >
      <DataItemBox title={title} value={value} />
    </Box>
  )
}

export const FormRowColumn = (props: HasChildren) => {
  const { children } = props
  return <Grid container>{children}</Grid>
}

export const FormActions = (props: HasChildren) => {
  const { children } = props
  return (
    <Grid container justifyContent="end">
      <TinyPaddedBox>{children}</TinyPaddedBox>
    </Grid>
  )
}
