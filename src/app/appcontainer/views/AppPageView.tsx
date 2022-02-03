import { SmallPaddedBox } from "../../../uikit/box/PaddedBox"
import { HasChildren } from "../../../uikit/Shared.Prop"

export const AppPageView = (props: HasChildren) => {
  const { children } = props
  return (
    <SmallPaddedBox
      sx={{
        flex: 1,
      }}
    >
      {children}
    </SmallPaddedBox>
  )
}
