import { ButtonTypeMap } from "@mui/material/Button"
import { DefaultComponentProps } from "@mui/material/OverridableComponent"
import { appThemeErrorColor, appThemeErrorDarkColor } from "../../app/Shared.Theme"
import { GradientButton } from "./GradientButton"

interface ErrorButtonProps {
  id?: string
  label: string
}

export const ErrorButton = (props: ErrorButtonProps & DefaultComponentProps<ButtonTypeMap>) => {
  const { id, label, disabled, startIcon, endIcon, onClick, type } = props
  return (
    <GradientButton
      id={id}
      startColor={appThemeErrorColor}
      endColor={appThemeErrorDarkColor}
      type={type}
      label={label}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
    />
  )
}
