import { useTranslation } from "react-i18next"
import { MeterReadingsIntraDayState } from "./MeterReadingsIntraDay.Reducer"
import { useEffect, useState } from "react"
import { firstViewState } from "../Shared.Reducer"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { FormSectionTitle } from "../../uikit/form/FormView"
import { LineChartView, INTRA_DAY_METER_CHART_HEIGHT } from "../../uikit/chart/LineChartView"
import { Box, Paper } from "@mui/material"
import { Subtitle1 } from "../../uikit/typography/Typography"
import { TinyPaddedHorizontalBox, SmallPaddedBox, SmallPaddedHorizontalBox } from "../../uikit/box/PaddedBox"
import { SpaceBetweenMiddleBox } from "../../uikit/box/AlignmentBox"
import { DateDaySelectorView } from "../../uikit/input/DateDaySelectorView"
import { MiddleCircularProgress } from "../../uikit/indicator/ProgressIndicator"
import { EmptyChartDisplay } from "../../uikit/chart/EmptyChartView"
import { mapDispatchToProps } from "./MeterReadingsIntraDay.Connect"

interface MeterReadingsIntraDayProps extends MeterReadingsIntraDayState, ReturnType<typeof mapDispatchToProps> {
  zevId: string
}

export const MeterReadingsIntraDayComponent = (props: MeterReadingsIntraDayProps) => {
  const { t } = useTranslation("meter-readings")
  const { zevId, viewState, getIntraDayMeterReadings } = props
  const [selectedDateTime, setSelectedDateTime] = useState(
    new Date(new Date().setHours(0, 0, 0, 0)).setDate(new Date().getDate() - 1),
  )
  useEffect(() => {
    if (firstViewState(viewState)) {
      getIntraDayMeterReadings(zevId, selectedDateTime, selectedDateTime)
    }
  }, [viewState, zevId, selectedDateTime])
  if (viewState.domainError) return <ErrorAlert message={viewState.domainError.message} />
  return (
    <Paper>
      <SpaceBetweenMiddleBox>
        <TinyPaddedHorizontalBox>
          <FormSectionTitle label={t("intraday.title")} />
        </TinyPaddedHorizontalBox>
        <SmallPaddedBox>
          <DateDaySelectorView
            selectedDateValue={selectedDateTime}
            onDateChanged={(newDateTime) => {
              setSelectedDateTime(newDateTime)
              getIntraDayMeterReadings(zevId, newDateTime, newDateTime)
            }}
            disabled={viewState.isLoading}
          />
        </SmallPaddedBox>
      </SpaceBetweenMiddleBox>
      <>
        <SmallPaddedHorizontalBox>
          <Subtitle1>{t("shared:chart.legend.subtitle")}</Subtitle1>
        </SmallPaddedHorizontalBox>
        <SmallPaddedBox>
          <Box
            sx={{
              width: "100%",
              height: INTRA_DAY_METER_CHART_HEIGHT,
            }}
          >
            {viewState.isLoading && <MiddleCircularProgress height={INTRA_DAY_METER_CHART_HEIGHT} />}
            {viewState.domainResult && viewState.domainResult.data.length > 0 && (
              <LineChartView
                dataKey="dateTime"
                data={viewState.domainResult.data}
                chartConfig={[
                  {
                    id: "production",
                    color: "#bccf02",
                    title: t("intraday.production"),
                    unit: "kWh",
                    type: "line",
                  },
                  {
                    id: "cpSum",
                    color: "#c692bc",
                    title: t("intraday.cpSum"),
                    unit: "kWh",
                    type: "line",
                  },
                  {
                    id: "areaUsage",
                    color: "#ecf59e",
                    title: t("intraday.areaUsage"),
                    unit: "kWh",
                    type: "area",
                  },
                  {
                    id: "areaSold",
                    color: "#ffe6d2",
                    title: t("intraday.areaSold"),
                    unit: "kWh",
                    type: "area",
                  },
                  {
                    id: "areaBought",
                    color: "#d3f0ff",
                    title: t("intraday.areaBought"),
                    unit: "kWh",
                    type: "area",
                  },
                ]}
              />
            )}
            {viewState.domainResult?.data.length === 0 && <EmptyChartDisplay />}
          </Box>
        </SmallPaddedBox>
      </>
    </Paper>
  )
}
