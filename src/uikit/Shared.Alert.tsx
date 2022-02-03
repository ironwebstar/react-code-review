import { Alert, AlertTitle, Box, Link, TableCell, TableRow } from "@mui/material"
import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { TextButton } from "./button/TextButton"
import { RetryIcon } from "./Shared.Icon"

interface AlertProps {
  title?: string
  icon?: React.ReactNode
  message?: string | React.ReactNode
  retry?: () => void
  scrollOnDisplay?: boolean
}

export const OptionalErrorAlert = (props: AlertProps) => {
  const { message } = props
  if (!message) return <></>
  return <ErrorAlert {...props} />
}

export const TableRowErrorAlert = (props: AlertProps & { colSpan: number }) => {
  const { colSpan } = props
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <ErrorAlert {...props} />
      </TableCell>
    </TableRow>
  )
}

export const ErrorAlert = (props: AlertProps) => {
  const { title, message, icon, retry, scrollOnDisplay } = props
  const { t } = useTranslation("shared")
  return (
    <AlertContainer
      id="app-alert-error"
      title={title ? title : t("alert.error")}
      message={message}
      severity="error"
      icon={icon}
      retry={retry}
      scrollOnDisplay={scrollOnDisplay}
    />
  )
}

export const OptionalSuccessAlert = (props: AlertProps & { show: unknown | undefined }) => {
  const { show } = props
  if (!show) return <></>
  return <SuccessAlert {...props} />
}

export const SuccessAlert = (props: AlertProps) => {
  const { title, message, icon, scrollOnDisplay } = props
  const { t } = useTranslation("shared")
  return (
    <AlertContainer
      id="app-alert-success"
      title={title ? title : t("alert.successful")}
      message={message}
      severity="success"
      icon={icon}
      scrollOnDisplay={scrollOnDisplay}
    />
  )
}

export const SuccessAlertLink = (props: AlertProps & { onClick: () => void }) => {
  const { message, onClick } = props
  return <SuccessAlert scrollOnDisplay message={<AlertLink label={message} onClick={onClick} />} />
}

export const InfoAlert = (props: AlertProps) => {
  const { title, message, icon, scrollOnDisplay } = props
  return (
    <AlertContainer
      id="app-alert-info"
      title={title}
      message={message}
      severity="info"
      icon={icon}
      scrollOnDisplay={scrollOnDisplay}
    />
  )
}

const AlertContainer = (
  props: AlertProps & {
    id: string
    severity: "success" | "error" | "info"
    retry?: () => void
  },
) => {
  const { id, title, message, icon, severity, retry, scrollOnDisplay } = props
  const { t } = useTranslation("shared")
  const alertRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (alertRef !== null && scrollOnDisplay) {
      alertRef.current?.scrollIntoView()
    }
  }, [alertRef])
  return (
    <Alert id={id} ref={alertRef} severity={severity} icon={icon}>
      {title && <AlertTitle>{title}</AlertTitle>}
      <Box>{message}</Box>
      {retry && (
        <Box>
          <TextButton
            noMarginLeft
            id="app-alert-retry"
            color="error"
            startIcon={<RetryIcon />}
            label={t("shared:button.retry")}
            onClick={retry}
          />
        </Box>
      )}
    </Alert>
  )
}

export const AlertLink = (props: { label: string | React.ReactNode; onClick: () => void }) => {
  const { label, onClick } = props
  return (
    <Link color="textPrimary" onClick={onClick} sx={{ cursor: "pointer" }}>
      {label}
    </Link>
  )
}
