import { IconButton } from "@mui/material"
import { AlignItemsCenterBox } from "../box/AlignmentBox"
import { OpenIcon } from "../Shared.Icon"
import { Body1 } from "../typography/Typography"

interface OpenButtonProps {
  label: string
  open: () => void
}

export const OpenButton = (props: OpenButtonProps) => {
  const { label, open } = props
  return (
    <AlignItemsCenterBox>
      <Body1>{label}</Body1>
      <IconButton
        onClick={(event) => {
          event.stopPropagation()
          open()
        }}
      >
        <OpenIcon color="primary" fontSize="small" />
      </IconButton>
    </AlignItemsCenterBox>
  )
}
