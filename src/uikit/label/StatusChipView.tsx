import { Chip, colors } from "@mui/material"

export enum ChipColor {
  GREEN,
  GREY,
  ORANGE,
  TEAL,
  YELLOW,
  RED,
}

interface StatusChipViewProps {
  id?: string
  label: string
  chipColor: ChipColor
}

export const StatusChipView = (props: StatusChipViewProps) => {
  const { id, label, chipColor } = props
  const color = coerceColor(chipColor)
  return (
    <Chip
      id={id}
      label={label}
      size="small"
      sx={{
        fontWeight: "normal",
        color: color,
        border: `1px solid ${color}`,
        backgroundColor: "#FFFFFF",
      }}
    />
  )
}

const coerceColor = (chipColor: ChipColor) => {
  switch (chipColor) {
    case ChipColor.GREEN:
      return colors.green[500]
    case ChipColor.GREY:
      return colors.grey[500]
    case ChipColor.ORANGE:
      return colors.orange[500]
    case ChipColor.TEAL:
      return colors.teal[500]
    case ChipColor.YELLOW:
      return colors.yellow[600]
    case ChipColor.RED:
      return colors.red[500]
  }
}
