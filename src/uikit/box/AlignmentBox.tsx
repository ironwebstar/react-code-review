import { BoxTypeMap, Grid } from "@mui/material"
import { DefaultComponentProps } from "@mui/material/OverridableComponent"

export const AlignBetweenBox = (props: Partial<DefaultComponentProps<BoxTypeMap>>) => {
  const { children, sx } = props
  return (
    <Grid container justifyContent="space-between" sx={sx}>
      {children}
    </Grid>
  )
}

export const AlignCenterMiddleBox = (props: Partial<DefaultComponentProps<BoxTypeMap>>) => {
  const { children, sx } = props
  return (
    <Grid container justifyContent="center" alignItems="center" sx={sx}>
      {children}
    </Grid>
  )
}

export const AlignEndBox = (props: Partial<DefaultComponentProps<BoxTypeMap>>) => {
  const { children, sx } = props
  return (
    <Grid container justifyContent="end" sx={sx}>
      {children}
    </Grid>
  )
}

export const AlignItemsCenterBox = (props: Partial<DefaultComponentProps<BoxTypeMap>>) => {
  const { children, sx } = props
  return (
    <Grid container alignItems="center" sx={sx}>
      {children}
    </Grid>
  )
}

export const AlignMiddleBox = (props: Partial<DefaultComponentProps<BoxTypeMap>>) => {
  const { children, sx } = props
  return (
    <Grid container justifyContent="center" sx={sx}>
      {children}
    </Grid>
  )
}

export const AlignBottomBox = (props: Partial<DefaultComponentProps<BoxTypeMap>>) => {
  const { children } = props
  return (
    <Grid container justifyContent="start" alignItems="flex-end">
      {children}
    </Grid>
  )
}

export const SpaceBetweenBox = (props: Partial<DefaultComponentProps<BoxTypeMap>>) => {
  const { children } = props
  return (
    <Grid container justifyContent="space-between">
      {children}
    </Grid>
  )
}

export const SpaceBetweenMiddleBox = (props: Partial<DefaultComponentProps<BoxTypeMap>>) => {
  const { children } = props
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      {children}
    </Grid>
  )
}

export const SpaceBetweenWrapBox = (props: Partial<DefaultComponentProps<BoxTypeMap>>) => {
  const { children } = props
  return (
    <Grid container justifyContent="space-between" alignItems="center" wrap="wrap">
      {children}
    </Grid>
  )
}

export const SpaceBetweenAlignBottomBox = (props: Partial<DefaultComponentProps<BoxTypeMap>>) => {
  const { children } = props
  return (
    <Grid container justifyContent="space-between" alignItems="flex-end">
      {children}
    </Grid>
  )
}
