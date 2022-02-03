import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import { BillingsConsumptionItem } from "../../../../domain/billings/participant/BillingsParticipant.Model"
import { PIE_CHART_VIEW_HEIGHT, PieChartView, makePieData } from "../../../../uikit/chart/PieChartView"
import { Subtitle1 } from "../../../../uikit/typography/Typography"
import { MeterReadingHighTarrifIcon } from "../../../meter-readings/views/MeterReadingHighTarrifIcon"
import { MeterReadingLowTarrifIcon } from "../../../meter-readings/views/MeterReadingLowTarrifIcon"
import { MeterReadingSolarPowerIcon } from "../../../meter-readings/views/MeterReadingSolarPowerIcon"

interface ConsumptionOverviewChartViewProps {
  billingsConsumptionItem: BillingsConsumptionItem
}

export const ConsumptionOverviewChartView = (props: ConsumptionOverviewChartViewProps) => {
  const { t } = useTranslation("billings-participant")
  const { billingsConsumptionItem: billingsAllConsumptionItem } = props
  return (
    <>
      <Subtitle1>{t("shared:chart.legend.subtitle")}</Subtitle1>
      <Box
        sx={{
          flex: 1,
          height: PIE_CHART_VIEW_HEIGHT,
        }}
      >
        <PieChartView
          data={makePieData(billingsAllConsumptionItem.consumptionOverview)}
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
    </>
  )
}
