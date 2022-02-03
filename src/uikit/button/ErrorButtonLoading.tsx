import { CircularProgress } from "@mui/material"
import { ButtonTypeMap } from "@mui/material/Button"
import { DefaultComponentProps } from "@mui/material/OverridableComponent"
import { ButtonCtaIcon } from "../Shared.Icon"
import { ErrorButton } from "./ErrorButton"

interface ErrorButtonLoadingProps {
  id?: string
  isLoading: boolean
  label: string
}

export const ErrorButtonLoading = (props: ErrorButtonLoadingProps & DefaultComponentProps<ButtonTypeMap>) => {
  const { id, isLoading, label, disabled, onClick, type, startIcon } = props
  return (
    <ErrorButton
      id={id}
      type={type}
      label={label}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={
        isLoading ? <CircularProgress style={{ color: "white" }} size={20} /> : <ButtonCtaIcon fontSize="large" />
      }
      onClick={onClick}
    />
  )
}
