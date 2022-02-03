import { formatMoneyDecimalFromLabel } from "../Domain.Formatters"
import { PricePackageItem } from "./Prices.Model"

export const formatPricePackages = (prices: PricePackageItem[]): PricePackageItem[] => {
  return prices.map((price) => ({
    ...price,
    priceHighTariff: formatMoneyDecimalFromLabel(price.priceHighTariff),
    priceLowTariff: formatMoneyDecimalFromLabel(price.priceLowTariff),
    priceSolarPower: formatMoneyDecimalFromLabel(price.priceSolarPower),
    spikePrice: formatMoneyDecimalFromLabel(price.spikePrice),
    additionalServicesPrice: formatMoneyDecimalFromLabel(price.additionalServicesPrice),
  }))
}
