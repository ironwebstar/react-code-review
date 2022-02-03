import { AlignCenterMiddleBox } from "../box/AlignmentBox"
import { SmallProgressIndicator } from "../progress/ProgressIndicator"
import { HasChildren } from "../Shared.Prop"

interface TableActionViewProps {
  isLoading: boolean
}

export const TableActionView = (props: TableActionViewProps & HasChildren) => {
  const { isLoading, children } = props
  return (
    <AlignCenterMiddleBox
      sx={{
        width: 48,
        height: 48,
      }}
    >
      {isLoading ? <SmallProgressIndicator /> : children}
    </AlignCenterMiddleBox>
  )
}
