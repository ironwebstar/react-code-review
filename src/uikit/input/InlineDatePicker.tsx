import { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { startOfWeek } from "date-fns"
import endOfWeek from "date-fns/endOfWeek"
import isSameDay from "date-fns/isSameDay"
import isWithinInterval from "date-fns/isWithinInterval"
import PickersDay, { PickersDayProps } from "@mui/lab/PickersDay"
import { DatePickerView } from "@mui/lab/DatePicker/shared"
import MobileDatePicker from "@mui/lab/MobileDatePicker"
import { TextField } from "@mui/material"
import { styled } from "@mui/material/styles"

import { getDateLocale } from "../../app/App.i18n"
import {
  appFormattedDateValue,
  MONTH_DATE_FORMAT,
  YEAR_DATE_FORMAT,
  WEEK_DATE_FORMAT,
  DAY_DATE_FORMAT,
} from "../../domain/Domain.Formatters"

export enum DatePickerMonthDay {
  CURRENT = "CURRENT",
  BEGIN = "BEGIN",
  END = "END",
}

type DatePickerType = "year" | "month" | "week" | "day" | undefined

interface InLineDatePickerProps {
  pickerType: DatePickerType
  selectedDate: Date
  onChange: (date: Date | null) => void
}

type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean
  isFirstDay: boolean
  isLastDay: boolean
}

const CenteredTextField = styled(TextField)({
  "& .MuiInput-root input": {
    textAlign: "center",
  },
})

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
})) as React.ComponentType<CustomPickerDayProps>

export const InLineDatePicker = (props: InLineDatePickerProps) => {
  const { pickerType, selectedDate, onChange } = props
  const { t } = useTranslation()

  const [date, setDate] = useState<Date | null>(selectedDate)
  const [openView, setOpenView] = useState(false)
  const [views, setViews] = useState<DatePickerView[]>(["day", "month", "year"])
  const [openTo, setOpenTo] = useState<DatePickerView>("day")

  useEffect(() => {
    switch (pickerType) {
      case "year":
        setViews(["year"])
        setOpenTo("year")
        break
      case "month":
        setViews(["year", "month"])
        setOpenTo("month")
        break
      case "week":
        setViews(["year", "month", "day"])
        setOpenTo("day")
        break
      case "day":
        setViews(["year", "month", "day"])
        setOpenTo("day")
    }
  }, [pickerType])

  const formattedDateValue = useCallback(
    (date: Date | null) => {
      const dateClone = date ?? new Date()
      let label
      switch (pickerType) {
        case "year":
          label = appFormattedDateValue(dateClone, getDateLocale(), YEAR_DATE_FORMAT)
          break
        case "month":
          label = appFormattedDateValue(dateClone, getDateLocale(), MONTH_DATE_FORMAT)
          break
        case "week":
          label = `${t("shared:form.select.week")} ${appFormattedDateValue(
            startOfWeek(dateClone, {
              weekStartsOn: 1,
            }),
            getDateLocale(),
            WEEK_DATE_FORMAT,
          )}`
          break
        default:
          label = appFormattedDateValue(dateClone, getDateLocale(), DAY_DATE_FORMAT)
          break
      }
      return label
    },
    [pickerType],
  )

  const renderWeekPickerDay = (
    weekDay: Date,
    selectedDates: (Date | null)[],
    pickersDayProps: PickersDayProps<Date>,
  ) => {
    if (!date) {
      return <PickersDay {...pickersDayProps} />
    }

    const start = startOfWeek(date)
    const end = endOfWeek(date)

    const dayIsBetween = isWithinInterval(weekDay, { start, end })
    const isFirstDay = isSameDay(weekDay, start)
    const isLastDay = isSameDay(weekDay, end)

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    )
  }

  return (
    <MobileDatePicker<Date>
      openTo={openTo}
      open={openView}
      onAccept={() => {
        onChange(date)
        setOpenView(false)
      }}
      onClose={() => setOpenView(false)}
      value={date ?? null}
      onChange={(date) => setDate(date)}
      maxDate={new Date()}
      views={views}
      renderDay={renderWeekPickerDay}
      renderInput={(props) => (
        <CenteredTextField
          {...props}
          inputProps={{ value: formattedDateValue(date) }}
          variant="standard"
          onClick={() => setOpenView(true)}
          autoComplete="off"
          InputProps={{ disableUnderline: true }}
        />
      )}
    />
  )
}
