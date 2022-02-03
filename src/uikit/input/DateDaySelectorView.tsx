import { Grid } from "@mui/material"
import { useMemo } from "react"

import { SmallPrimaryMinusButton } from "../button/PrimaryMinusButton"
import { SmallPrimaryPlusButton } from "../button/PrimaryPlusButton"
import { InLineDatePicker } from "./InLineDatePicker"

interface DateDaySelectorViewProps {
  selectedDateValue: number
  onDateChanged: (newDateTime: number) => void
  disabled?: boolean
}

export const DateDaySelectorView = (props: DateDaySelectorViewProps) => {
  const { selectedDateValue, onDateChanged, disabled } = props
  const selectedDate: Date = useMemo(() => new Date(selectedDateValue), [selectedDateValue])
  const disabledPlusButton = useMemo(
    () => new Date(selectedDateValue).getDate() >= new Date().getDate() - 1,
    [selectedDateValue],
  )
  return (
    <>
      <Grid container>
        <SmallPrimaryMinusButton
          disabled={disabled}
          onClick={() => {
            onDateChanged(selectedDate.setDate(selectedDate.getDate() - 1))
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
            pickerType="day"
            selectedDate={selectedDate}
            onChange={(date) => {
              if (date) onDateChanged(selectedDate.setDate(date.getDate()))
            }}
          />
        </Grid>
        <SmallPrimaryPlusButton
          disabled={disabledPlusButton || disabled}
          onClick={() => {
            onDateChanged(selectedDate.setDate(selectedDate.getDate() + 1))
          }}
        />
      </Grid>
    </>
  )
}
