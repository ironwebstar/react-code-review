import Box, { BoxTypeMap } from "@mui/material/Box"
import { DefaultComponentProps } from "@mui/material/OverridableComponent"

export const TinyPaddedBox = (props: DefaultComponentProps<BoxTypeMap>) => {
  const { children } = props
  return (
    <Box p={1} {...props}>
      {children}
    </Box>
  )
}

export const TinyPaddedHorizontalBox = (props: DefaultComponentProps<BoxTypeMap>) => {
  const { children } = props
  return (
    <Box pl={1} pr={1} {...props}>
      {children}
    </Box>
  )
}

export const SmallPaddedBox = (props: DefaultComponentProps<BoxTypeMap>) => {
  const { children } = props
  return (
    <Box p={2} {...props}>
      {children}
    </Box>
  )
}

export const SmallPaddedHorizontalBox = (props: DefaultComponentProps<BoxTypeMap>) => {
  const { children } = props
  return (
    <Box pl={2} pr={2} {...props}>
      {children}
    </Box>
  )
}

export const SmallPaddedBottomBox = (props: DefaultComponentProps<BoxTypeMap>) => {
  const { children } = props
  return (
    <Box pb={2} {...props}>
      {children}
    </Box>
  )
}

export const MediumPaddedBox = (props: DefaultComponentProps<BoxTypeMap>) => {
  const { children } = props
  return (
    <Box p={4} {...props}>
      {children}
    </Box>
  )
}

export const MediumPaddedHorizontalBox = (props: DefaultComponentProps<BoxTypeMap>) => {
  const { children } = props
  return (
    <Box pl={4} pr={4} {...props}>
      {children}
    </Box>
  )
}

export const LargePaddedBox = (props: DefaultComponentProps<BoxTypeMap>) => {
  const { children } = props
  return (
    <Box p={8} {...props}>
      {children}
    </Box>
  )
}
