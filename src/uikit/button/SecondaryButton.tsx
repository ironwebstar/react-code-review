import Button, { ButtonTypeMap } from "@mui/material/Button"
import { DefaultComponentProps } from "@mui/material/OverridableComponent"
import { appThemeSecondaryColor } from "../../app/Shared.Theme"

interface SecondaryButtonProps {
  label: string
}

export const SecondaryButton = (props: SecondaryButtonProps & DefaultComponentProps<ButtonTypeMap>) => {
  const { label, onClick, type, disabled } = props
  return (
    <Button
      variant="outlined"
      color="secondary"
      type={type}
      onClick={onClick}
      disabled={disabled}
      sx={{
        fontWeight: "bold",
        borderRadius: "7.144em",
        border: "3px solid",
        "&:hover": {
          color: "#FFFFFF",
          border: "3px solid",
          backgroundColor: appThemeSecondaryColor,
        },
      }}
    >
      {label}
    </Button>
  )
}
