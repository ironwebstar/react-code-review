import { Link } from "@mui/material"
import { format } from "date-fns"
import { Body1 } from "./typography/Typography"

export const formatLocale = (date: Date, formatStr: string, local: Locale) => {
  return format(date, formatStr, {
    locale: local,
  })
}

export const formatEmail = (value?: string) => {
  if (!value) return value
  return (
    <Link color="textPrimary" href={`mailto:${value}`}>
      <Body1>{value}</Body1>
    </Link>
  )
}

export const formatPhoneWithSpaces = (value?: string) => {
  if (!value) return value
  return value.replace(/^((?:\+41)|(?:0041)|(?:41))?(0?\d\d)(\d\d\d)(\d\d)(\d\d)$/, "$1 $2 $3 $4 $5").trimStart() ?? ""
}

export const formatPhone = (value?: string) => {
  if (!value) return value
  return (
    <Link color="textPrimary" href={`tel:${value}`}>
      <Body1>{formatPhoneWithSpaces(value)}</Body1>
    </Link>
  )
}
