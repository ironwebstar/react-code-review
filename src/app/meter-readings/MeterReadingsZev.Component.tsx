import { useTranslation } from "react-i18next"
import { MeterReadingsZevState } from "./MeterReadingsZev.Reducer"
import { useEffect, useState } from "react"
import { firstViewState } from "../Shared.Reducer"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { FormSectionTitle } from "../../uikit/form/FormView"
import { Grid, Paper, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { TinyPaddedHorizontalBox, SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { SpaceBetweenBox } from "../../uikit/box/AlignmentBox"
import { DateMonthSelectorView } from "../../uikit/input/DateMonthSelectorView"
import { MeterReadingDateRange } from "../../domain/meter-readings/MeterReadings.Model"
import { DateYearSelectorView } from "../../uikit/input/DateYearSelectorView"
import { DateWeekSelectorView } from "../../uikit/input/DateWeekSelectorView"
import { DividerBox } from "../../uikit/box/DividerBox"
import { ConsumptionChartView } from "./views/ConsumptionChartView"
import { ZevProductionChartView } from "./views/ZevProductionChartView"
import { mapDispatchToProps } from "./MeterReadingsZev.Connect"

interface MeterReadingsZevProps extends MeterReadingsZevState, ReturnType<typeof mapDispatchToProps> {
  zevId: string
}

export const MeterReadingsZevComponent = (props: MeterReadingsZevProps) => {
  const { t } = useTranslation("meter-readings")
  const { zevId, viewState, getZevMeterReadings } = props
  const [selectedDateTime, setSelectedDateTime] = useState(new Date().setHours(0, 0, 0, 0))
  const [selectedMeterReadingDateRange, setSelectedMeterReadingDateRange] = useState(MeterReadingDateRange.MONTH)
  useEffect(() => {
    if (firstViewState(viewState)) {
      getZevMeterReadings(zevId, selectedDateTime, selectedMeterReadingDateRange)
    }
  }, [viewState, zevId, selectedDateTime])
  if (viewState.domainError) return <ErrorAlert message={viewState.domainError.message} />
  return (
    <Paper>
      <SpaceBetweenBox>
        <TinyPaddedHorizontalBox>
          <FormSectionTitle label={t("consumption.title")} />
        </TinyPaddedHorizontalBox>
        <Stack>
          <SmallPaddedBox>
            <Grid container justifyContent="end">
              <ToggleButtonGroup
                color="secondary"
                value={selectedMeterReadingDateRange}
                exclusive
                onChange={(_, value: MeterReadingDateRange | null) => {
                  if (value) {
                    setSelectedMeterReadingDateRange(value)
                    getZevMeterReadings(zevId, selectedDateTime, value)
                  }
                }}
              >
                <ToggleButton value={MeterReadingDateRange.YEAR}>{t("consumption.year")}</ToggleButton>
                <ToggleButton value={MeterReadingDateRange.MONTH}>{t("consumption.month")}</ToggleButton>
                <ToggleButton value={MeterReadingDateRange.WEEK}>{t("consumption.week")}</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </SmallPaddedBox>
          <SmallPaddedBox>
            {selectedMeterReadingDateRange === MeterReadingDateRange.YEAR && (
              <DateYearSelectorView
                selectedDateValue={selectedDateTime}
                onDateChanged={(newDateTime) => {
                  setSelectedDateTime(newDateTime)
                  getZevMeterReadings(zevId, newDateTime, selectedMeterReadingDateRange)
                }}
                disabled={viewState.isLoading}
              />
            )}
            {selectedMeterReadingDateRange === MeterReadingDateRange.MONTH && (
              <DateMonthSelectorView
                selectedDateValue={selectedDateTime}
                onDateChanged={(newDateTime) => {
                  setSelectedDateTime(newDateTime)
                  getZevMeterReadings(zevId, newDateTime, selectedMeterReadingDateRange)
                }}
                disabled={viewState.isLoading}
              />
            )}
            {selectedMeterReadingDateRange === MeterReadingDateRange.WEEK && (
              <DateWeekSelectorView
                selectedDateValue={selectedDateTime}
                onDateChanged={(newDateTime) => {
                  setSelectedDateTime(newDateTime)
                  getZevMeterReadings(zevId, newDateTime, selectedMeterReadingDateRange)
                }}
                disabled={viewState.isLoading}
              />
            )}
          </SmallPaddedBox>
        </Stack>
      </SpaceBetweenBox>
      <ConsumptionChartView viewState={viewState} meterReadingDateRange={selectedMeterReadingDateRange} />
      <DividerBox />
      <ZevProductionChartView viewState={viewState} meterReadingDateRange={selectedMeterReadingDateRange} />
    </Paper>
  )
}
