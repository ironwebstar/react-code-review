import { Grid, Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import { ZevMeterReading, MeterReadingDateRange } from "../../../domain/meter-readings/MeterReadings.Model"
import { SmallPaddedHorizontalBox } from "../../../uikit/box/PaddedBox"
import { BAR_CHART_VIEW_HEIGHT, BarChartView } from "../../../uikit/chart/BarChartView"
import { EmptyChartDisplay } from "../../../uikit/chart/EmptyChartView"
import { PIE_CHART_VIEW_HEIGHT, PieChartView, makePieData } from "../../../uikit/chart/PieChartView"
import { FormSectionTitle } from "../../../uikit/form/FormView"
import { MiddleCircularProgress } from "../../../uikit/indicator/ProgressIndicator"
import { ViewState } from "../../Shared.Reducer"
import { MeterReadingSoldIcon } from "./MeterReadingSoldIcon"
import { MeterReadingUsedIcon } from "./MeterReadingUsedIcon"

interface ProductionChartViewProps {
  viewState: ViewState<ZevMeterReading>
  meterReadingDateRange: MeterReadingDateRange
}

export const ZevProductionChartView = (props: ProductionChartViewProps) => {
  const { t } = useTranslation("meter-readings")
  const { viewState, meterReadingDateRange } = props
  return (
    <>
      <SmallPaddedHorizontalBox>
        <FormSectionTitle label={t("produced.title")} />
      </SmallPaddedHorizontalBox>
      {viewState.isLoading && <MiddleCircularProgress height={BAR_CHART_VIEW_HEIGHT} />}
      {viewState.domainResult && viewState.domainResult?.productionData.length > 0 && (
        <Grid container sx={{ width: "100%", marginLeft: 2, height: BAR_CHART_VIEW_HEIGHT }}>
          <Box
            sx={{
              width: "30%",
              height: PIE_CHART_VIEW_HEIGHT,
            }}
          >
            <PieChartView
              data={makePieData(viewState.domainResult.totalProducedData)}
              chartConfig={{
                totalProduction: {
                  id: "totalProduction",
                  color: "#bccf02",
                  title: t("produced.used"),
                  unit: "kWh",
                  icon: MeterReadingUsedIcon,
                },
                totalSold: {
                  id: "totalSold",
                  color: "#ec6a0a",
                  title: t("produced.sold"),
                  unit: "kWh",
                  icon: MeterReadingSoldIcon,
                },
              }}
            />
          </Box>
          {viewState.domainResult.productionData.length > 0 && (
            <Box
              sx={{
                width: "68%",
                height: BAR_CHART_VIEW_HEIGHT,
              }}
            >
              <BarChartView
                dataKey="dateTime"
                data={viewState.domainResult.productionData}
                chartConfig={[
                  {
                    id: "used",
                    color: "#bccf02",
                    title: t("produced.used"),
                    unit: "kWh",
                  },
                  {
                    id: "sold",
                    color: "#ec6a0a",
                    title: t("produced.sold"),
                    unit: "kWh",
                  },
                ]}
                meterReadingDateRange={meterReadingDateRange}
              />
            </Box>
          )}
        </Grid>
      )}
      {viewState.domainResult?.productionData.length === 0 && (
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
