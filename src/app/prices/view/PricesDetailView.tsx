import { Box, Grid } from "@mui/material"
import { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { PriceMeasurementType, PricePackageItem } from "../../../domain/prices/Prices.Model"
import { DataItemBox } from "../../../uikit/box/DataItemBox"
import { TinyPaddedBox } from "../../../uikit/box/PaddedBox"

interface PricesDetailViewProps {
  pricePackages: PricePackageItem[]
}

export const PricesDetailView = (props: PricesDetailViewProps) => {
  const { pricePackages: pricePackages } = props
  return (
    <Grid container>
      {pricePackages.map((zevPrices) => (
        <ZevPriceItemView key={zevPrices.id} zevPrices={zevPrices} />
      ))}
    </Grid>
  )
}

const ZevPriceItemView = (props: { zevPrices: PricePackageItem }) => {
  const { t } = useTranslation("prices")
  const { zevPrices } = props
  return (
    <TinyPaddedBox>
      <Box
        sx={{
          width: 320,
        }}
      >
        <DataItemBox title={t("form.field.title")} value={zevPrices.priceTitle} />
        <DataItemBox title={t("form.field.solarPower")} value={zevPrices.priceSolarPower} />
        <DataItemBox title={t("form.field.highTariff")} value={zevPrices.priceHighTariff} />
        <DataItemBox title={t("form.field.lowTariff")} value={zevPrices.priceLowTariff} />
        <DataItemBox
          title={additionalServicePricesLabel(zevPrices.measurementType, t)}
          value={zevPrices.additionalServicesPrice}
        />
        {zevPrices.containsSpikePrice && (
          <DataItemBox title={t("form.field.spikePrice")} value={zevPrices.spikePrice} />
        )}
      </Box>
    </TinyPaddedBox>
  )
}

const additionalServicePricesLabel = (measurementType: PriceMeasurementType, t: TFunction) => {
  switch (measurementType) {
    case PriceMeasurementType.CONSUMPTION_DEPENDANT:
      return t("form.field.measurementServicePerHour")
    case PriceMeasurementType.FLAT_RATE:
      return t("form.field.measurementServiceMonth")
  }
}
