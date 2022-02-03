import { ButtonTypeMap } from "@mui/material/Button"
import { DefaultComponentProps } from "@mui/material/OverridableComponent"
import { appThemeWarningColor, appThemeWarningDarkColor } from "../../app/Shared.Theme"
import { GradientButton } from "./GradientButton"

interface CancelButtonProps {
  id?: string
  label: string
}

export const CancelButton = (props: CancelButtonProps & DefaultComponentProps<ButtonTypeMap>) => {
  const { id, label, disabled, startIcon, endIcon, onClick, type } = props
  return (
    <GradientButton
      id={id}
      startColor={appThemeWarningColor}
      endColor={appThemeWarningDarkColor}
      type={type}
      label={label}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
    />
  )
}
