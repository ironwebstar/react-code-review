import { DatePickerView } from "@mui/lab/DatePicker/shared"
import DesktopDatePicker from "@mui/lab/DesktopDatePicker"
import { TextField } from "@mui/material"
import { useState } from "react"
import { getDateLocale } from "../../app/App.i18n"
import { appFormattedDateValue, YEAR_DATE_FORMAT } from "../../domain/Domain.Formatters"

export enum DatePickerMonthDay {
  CURRENT = "CURRENT",
  BEGIN = "BEGIN",
  END = "END",
}

interface SingleLineDatePickerProps {
  id?: string
  name: string
  label: string
  value: number
  required?: boolean
  disabled?: boolean
  helperText?: string
  onChange: (date: number) => void
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  minDate?: Date
  maxDate?: Date
  views?: DatePickerView[]
  range?: DatePickerMonthDay
}

export const SingleLineDatePicker = (props: SingleLineDatePickerProps) => {
  const {
    name,
    label,
    value,
    required,
    disabled,
    helperText,
    onChange,
    onBlur,
    minDate,
    maxDate,
    views = ["year", "month", "day"],
    range = DatePickerMonthDay.CURRENT,
  } = props

  const [open, setOpen] = useState(false)

  return (
    <DesktopDatePicker<Date>
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      label={label}
      disabled={disabled}
      value={value !== -1 ? new Date(value) : null}
      onChange={(date) => {
        if (date === null) {
          onChange(-1)
        } else if (views.includes("month")) {
          switch (range) {
            case DatePickerMonthDay.CURRENT:
              onChange(date.getTime())
              break
            case DatePickerMonthDay.BEGIN:
              onChange(new Date(date.getFullYear(), date.getMonth(), 1).getTime())
              break
            case DatePickerMonthDay.END:
              onChange(new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime())
              break
          }
        } else {
          onChange(date.getTime())
        }
      }}
      minDate={minDate}
      maxDate={maxDate}
      defaultCalendarMonth={minDate}
      views={views}
      renderInput={(props) => (
        <TextField
          {...props}
          sx={{
            width: "100%",
          }}
          inputProps={{ value: formattedDateValue(value, views) }}
          name={name}
          helperText={helperText}
          error={helperText !== undefined}
          label={label}
          required={required}
          variant="standard"
          onBlur={onBlur}
          onClick={() => setOpen(true)}
          onKeyDown={(event) => {
            event.preventDefault()
            if (event.key === "Backspace") {
              onChange(-1)
            }
          }}
          autoComplete="off"
        />
      )}
    />
  )
}

const formattedDateValue = (value: number, views: DatePickerView[]) => {
  if (value === -1) return ""
  if (views.length === 1 && views.includes("year")) {
    return appFormattedDateValue(new Date(value), getDateLocale(), YEAR_DATE_FORMAT)
  }
  return appFormattedDateValue(new Date(value), getDateLocale())
}
