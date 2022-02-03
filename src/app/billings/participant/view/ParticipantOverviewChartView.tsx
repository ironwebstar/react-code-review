import { Box, Grid } from "@mui/material"
import { useTranslation } from "react-i18next"
import { BillingsParticipantDetail } from "../../../../domain/billings/participant/BillingsParticipant.Model"
import { DataItemBox } from "../../../../uikit/box/DataItemBox"
import { SmallPaddedBox } from "../../../../uikit/box/PaddedBox"
import { PIE_CHART_VIEW_HEIGHT, PieChartView, makePieData } from "../../../../uikit/chart/PieChartView"
import { Subtitle1 } from "../../../../uikit/typography/Typography"
import { MeterReadingHighTarrifIcon } from "../../../meter-readings/views/MeterReadingHighTarrifIcon"
import { MeterReadingLowTarrifIcon } from "../../../meter-readings/views/MeterReadingLowTarrifIcon"
import { MeterReadingSolarPowerIcon } from "../../../meter-readings/views/MeterReadingSolarPowerIcon"

interface ParticipantOverviewChartViewProps {
  billingParticipantDetail: BillingsParticipantDetail
}

export const ParticipantOverviewChartView = (props: ParticipantOverviewChartViewProps) => {
  const { t } = useTranslation("billings-participant")
  const { billingParticipantDetail: billingAllParticipantDetail } = props
  return (
    <>
      <Subtitle1>{t("shared:chart.legend.subtitle")}</Subtitle1>
      <Grid container justifyContent="space-between">
        <Box
          sx={{
            width: 500,
            height: PIE_CHART_VIEW_HEIGHT,
          }}
        >
          <PieChartView
            data={makePieData(billingAllParticipantDetail.consumptionOverview)}
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
        <SmallPaddedBox>
          <DataItemBox title={t("list.all.label.period")} value={billingAllParticipantDetail.billingDateRange} />
        </SmallPaddedBox>
      </Grid>
    </>
  )
}
