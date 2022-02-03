import { useMemo } from "react"
import { Grid } from "@mui/material"
import { SmallPrimaryMinusButton } from "../button/PrimaryMinusButton"
import { SmallPrimaryPlusButton } from "../button/PrimaryPlusButton"
import { InLineDatePicker } from "./InLineDatePicker"

interface DateMonthSelectorViewProps {
  selectedDateValue: number
  onDateChanged: (newDateTime: number) => void
  disabled?: boolean
}

export const DateMonthSelectorView = (props: DateMonthSelectorViewProps) => {
  const { selectedDateValue, onDateChanged, disabled } = props
  const selectedDate: Date = useMemo(() => new Date(selectedDateValue), [selectedDateValue])
  const disabledPlusButton = useMemo(() => {
    const currentDate = new Date()
    return selectedDate.getMonth() >= currentDate.getMonth() && selectedDate.getFullYear() === currentDate.getFullYear()
  }, [selectedDate])
  return (
    <>
      <Grid container>
        <SmallPrimaryMinusButton
          disabled={disabled}
          onClick={() => {
            onDateChanged(selectedDate.setMonth(selectedDate.getMonth() - 1))
          }}
        />
        <Grid
          container
          alignContent="center"
          justifyContent="center"
          direction="row"
          sx={{
            width: 180,
          }}
        >
          <InLineDatePicker
            pickerType="month"
            selectedDate={selectedDate}
            onChange={(date) => {
              if (date) onDateChanged(selectedDate.setMonth(date.getMonth()))
            }}
          />
        </Grid>
        <SmallPrimaryPlusButton
          disabled={disabledPlusButton || disabled}
          onClick={() => {
            onDateChanged(selectedDate.setMonth(selectedDate.getMonth() + 1))
          }}
        />
      </Grid>
    </>
  )
}
