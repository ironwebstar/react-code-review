import { TypographyTypeMap, Typography } from "@mui/material"
import { DefaultComponentProps } from "@mui/material/OverridableComponent"

export const Body1 = (props: DefaultComponentProps<TypographyTypeMap>) => {
  const { children } = props
  return (
    <Typography {...props} variant="body1">
      {children}
    </Typography>
  )
}

export const Subtitle1 = (props: DefaultComponentProps<TypographyTypeMap>) => {
  const { children } = props
  return (
    <Typography {...props} variant="subtitle1">
      {children}
    </Typography>
  )
}

export const Caption = (props: DefaultComponentProps<TypographyTypeMap>) => {
  const { children } = props
  return (
    <Typography {...props} variant="caption">
      {children}
    </Typography>
  )
}

export const Heading2 = (props: DefaultComponentProps<TypographyTypeMap>) => {
  const { children } = props
  return (
    <Typography {...props} variant="h2">
      {children}
    </Typography>
  )
}

export const Heading4 = (props: DefaultComponentProps<TypographyTypeMap>) => {
  const { children, id } = props
  return (
    <Typography id={id} {...props} variant="h4">
      {children}
    </Typography>
  )
}

export const Heading5 = (props: DefaultComponentProps<TypographyTypeMap>) => {
  const { children } = props
  return (
    <Typography {...props} variant="h5">
      {children}
    </Typography>
  )
}
export const Heading6 = (props: DefaultComponentProps<TypographyTypeMap>) => {
  const { children } = props
  return (
    <Typography {...props} variant="h6">
      {children}
    </Typography>
  )
}
