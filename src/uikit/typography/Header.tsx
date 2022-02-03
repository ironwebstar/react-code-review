import { TypographyTypeMap } from "@mui/material/Typography"
import { DefaultComponentProps } from "@mui/material/OverridableComponent"
import { SmallPaddedBox } from "../box/PaddedBox"
import { Heading2, Heading4, Subtitle1 } from "./Typography"

export const ImpressionHeader = (props: DefaultComponentProps<TypographyTypeMap>) => {
  const { id, children } = props
  return (
    <SmallPaddedBox my={1}>
      <Heading2 id={id}>{children}</Heading2>
    </SmallPaddedBox>
  )
}

export const PageHeader = (props: DefaultComponentProps<TypographyTypeMap>) => {
  const { children, id } = props
  return (
    <SmallPaddedBox my={1}>
      <Heading4 id={id}>{children}</Heading4>
    </SmallPaddedBox>
  )
}

export const Subtitle1Header = (props: DefaultComponentProps<TypographyTypeMap>) => {
  const { children } = props
  return (
    <SmallPaddedBox>
      <Subtitle1
        sx={{
          fontWeight: "bold",
        }}
      >
        {children}
      </Subtitle1>
    </SmallPaddedBox>
  )
}
