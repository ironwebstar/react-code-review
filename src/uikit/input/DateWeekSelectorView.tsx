import { useMemo } from "react"
import { Grid } from "@mui/material"

import { SmallPrimaryMinusButton } from "../button/PrimaryMinusButton"
import { SmallPrimaryPlusButton } from "../button/PrimaryPlusButton"
import { InLineDatePicker } from "./InLineDatePicker"

interface DateWeekSelectorViewProps {
  selectedDateValue: number
  onDateChanged: (newDateTime: number) => void
  disabled?: boolean
}

export const DateWeekSelectorView = (props: DateWeekSelectorViewProps) => {
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
          onClick={() => onDateChanged(selectedDate.setDate(selectedDate.getDate() - 7))}
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
            pickerType="week"
            selectedDate={selectedDate}
            onChange={(date) => {
              if (date) onDateChanged(selectedDate.setDate(date.getDate()))
            }}
          />
        </Grid>
        <SmallPrimaryPlusButton
          disabled={disabledPlusButton || disabled}
          onClick={() => onDateChanged(selectedDate.setDate(selectedDate.getDate() + 7))}
        />
      </Grid>
    </>
  )
}
