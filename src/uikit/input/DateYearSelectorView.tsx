import { Grid } from "@mui/material"
import { useMemo } from "react"

import { SmallPrimaryMinusButton } from "../button/PrimaryMinusButton"
import { SmallPrimaryPlusButton } from "../button/PrimaryPlusButton"
import { InLineDatePicker } from "./InLineDatePicker"

interface DateYearSelectorViewProps {
  selectedDateValue: number
  onDateChanged: (newDateTime: number) => void
  disabled?: boolean
}

export const DateYearSelectorView = (props: DateYearSelectorViewProps) => {
  const { selectedDateValue, onDateChanged, disabled } = props
  const selectedDate: Date = useMemo(() => new Date(selectedDateValue), [selectedDateValue])
  const disabledPlusButton = useMemo(
    () => new Date(selectedDateValue).getFullYear() >= new Date().getFullYear(),
    [selectedDateValue],
  )
  return (
    <>
      <Grid container>
        <SmallPrimaryMinusButton
          disabled={disabled}
          onClick={() => {
            onDateChanged(selectedDate.setFullYear(selectedDate.getFullYear() - 1))
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
            pickerType="year"
            selectedDate={selectedDate}
            onChange={(date) => {
              if (date) onDateChanged(selectedDate.setFullYear(date.getFullYear()))
            }}
          />
        </Grid>
        <SmallPrimaryPlusButton
          disabled={disabledPlusButton || disabled}
          onClick={() => {
            onDateChanged(selectedDate.setFullYear(selectedDate.getFullYear() + 1))
          }}
        />
      </Grid>
    </>
  )
}
