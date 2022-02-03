import { Grid, Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import {
  MeterReadingDateRange,
  ZevMeterReading,
  ConsumptionPointMeterReading,
} from "../../../domain/meter-readings/MeterReadings.Model"
import { SmallPaddedHorizontalBox } from "../../../uikit/box/PaddedBox"
import { BAR_CHART_VIEW_HEIGHT, BarChartView } from "../../../uikit/chart/BarChartView"
import { EmptyChartDisplay } from "../../../uikit/chart/EmptyChartView"
import { PIE_CHART_VIEW_HEIGHT, PieChartView, makePieData } from "../../../uikit/chart/PieChartView"
import { MiddleCircularProgress } from "../../../uikit/indicator/ProgressIndicator"
import { Subtitle1 } from "../../../uikit/typography/Typography"
import { ViewState } from "../../Shared.Reducer"
import { MeterReadingHighTarrifIcon } from "./MeterReadingHighTarrifIcon"
import { MeterReadingLowTarrifIcon } from "./MeterReadingLowTarrifIcon"
import { MeterReadingSolarPowerIcon } from "./MeterReadingSolarPowerIcon"

interface ConsumptionChartViewProps {
  viewState: ViewState<ZevMeterReading | ConsumptionPointMeterReading>
  meterReadingDateRange: MeterReadingDateRange
}

export const ConsumptionChartView = (props: ConsumptionChartViewProps) => {
  const { t } = useTranslation("meter-readings")
  const { viewState, meterReadingDateRange } = props

  return (
    <>
      {viewState.isLoading && <MiddleCircularProgress height={BAR_CHART_VIEW_HEIGHT} />}
      {viewState.domainResult && viewState.domainResult?.consumptionData.length > 0 && (
        <>
          <SmallPaddedHorizontalBox>
            <Subtitle1>{t("shared:chart.legend.subtitle")}</Subtitle1>
          </SmallPaddedHorizontalBox>
          <Grid container sx={{ width: "100%", marginLeft: 2, height: BAR_CHART_VIEW_HEIGHT }}>
            <Box
              sx={{
                width: "30%",
                height: PIE_CHART_VIEW_HEIGHT,
              }}
            >
              <PieChartView
                data={makePieData(viewState.domainResult.totalConsumedData)}
                chartConfig={{
                  totalProduction: {
                    id: "totalProduction",
                    color: "#c9d935",
                    title: t("shared:consumption.solar"),
                    unit: "kWh",
                    icon: MeterReadingSolarPowerIcon,
                  },
                  totalHighTariff: {
                    id: "totalHighTariff",
                    color: "#0099db",
                    title: t("shared:consumption.boughtHigh"),
                    unit: "kWh",
                    icon: MeterReadingHighTarrifIcon,
                  },
                  totalLowTariff: {
                    id: "totalLowTariff",
                    color: "#83d0f5",
                    title: t("shared:consumption.boughtLow"),
                    unit: "kWh",
                    icon: MeterReadingLowTarrifIcon,
                  },
                }}
              />
            </Box>
            {viewState.domainResult.consumptionData.length > 0 && (
              <Box
                sx={{
                  width: "68%",
                  height: BAR_CHART_VIEW_HEIGHT,
                }}
              >
                <BarChartView
                  dataKey="dateTime"
                  data={viewState.domainResult.consumptionData}
                  chartConfig={[
                    {
                      id: "produced",
                      color: "#c9d935",
                      title: t("shared:consumption.solar"),
                      unit: "kWh",
                    },
                    {
                      id: "energyHighTariff",
                      color: "#00acf5",
                      title: t("shared:consumption.boughtHigh"),
                      unit: "kWh",
                    },
                    {
                      id: "energyLowTariff",
                      color: "#83d0f5",
                      title: t("shared:consumption.boughtLow"),
                      unit: "kWh",
                    },
                  ]}
                  meterReadingDateRange={meterReadingDateRange}
                />
              </Box>
            )}
          </Grid>
        </>
      )}
      {viewState.domainResult?.consumptionData.length === 0 && (
        <Box
          sx={{
            width: "100%",
            height: PIE_CHART_VIEW_HEIGHT,
          }}
        >
          <EmptyChartDisplay />
        </Box>
      )}
    </>
  )
}
