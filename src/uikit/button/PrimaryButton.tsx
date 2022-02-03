import { ButtonTypeMap } from "@mui/material/Button"
import { DefaultComponentProps } from "@mui/material/OverridableComponent"
import { appThemePrimaryColor, appThemeSecondaryColor } from "../../app/Shared.Theme"
import { GradientButton } from "./GradientButton"

interface PrimaryButtonProps {
  id?: string
  label: string
}

export const PrimaryButton = (props: PrimaryButtonProps & DefaultComponentProps<ButtonTypeMap>) => {
  const { id, label, disabled, startIcon, endIcon, onClick, type } = props
  return (
    <GradientButton
      id={id}
      startColor={appThemePrimaryColor}
      endColor={appThemeSecondaryColor}
      type={type}
      label={label}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
    />
  )
}
