import Button, { ButtonTypeMap } from "@mui/material/Button"
import { DefaultComponentProps } from "@mui/material/OverridableComponent"

interface TextButtonProps {
  id?: string
  label: string
  noMarginLeft?: boolean
  color?: "primary" | "secondary" | "error"
}

export const TextButton = (props: TextButtonProps & DefaultComponentProps<ButtonTypeMap>) => {
  const { id, label, noMarginLeft, onClick, startIcon, disabled, color } = props
  return (
    <Button
      id={id}
      disabled={disabled}
      variant="text"
      color={color ? color : "secondary"}
      onClick={onClick}
      startIcon={startIcon}
      sx={{
        fontWeight: "bold",
        marginLeft: noMarginLeft ? -1 : 0,
      }}
    >
      {label}
    </Button>
  )
}
