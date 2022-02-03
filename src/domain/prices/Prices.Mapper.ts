import { Map } from "immutable"
import { ZevPricePackage, ZevPrices } from "../../data/generated-sources/openapi"
import { formatMoneyDecimal, formatMoneyDecimalLabel } from "../Domain.Formatters"
import { initialPricePackageItem, PriceMeasurementType, PricePackageItem, PricePackageUpsert } from "./Prices.Model"

export const zevPricePackageMapper = (pricePackage: ZevPricePackage): PricePackageItem => {
  return zevPricesMapper(pricePackage.id, pricePackage.order, pricePackage.name, pricePackage.prices)
}

export const zevPricesMapper = (id: number, order: number, name: string, prices?: ZevPrices): PricePackageItem => {
  return {
    id: id,
    order: order,
    priceTitle: name,
    priceSolarPower: prices?.solarPrice ? formatMoneyDecimalLabel(prices.solarPrice) : "?",
    priceHighTariff: prices?.highTariffPrice ? formatMoneyDecimalLabel(prices.highTariffPrice) : "?",
    priceLowTariff: prices?.lowTariffPrice ? formatMoneyDecimalLabel(prices.lowTariffPrice) : "?",
    additionalServicesPrice: prices?.additionalServicesPrice
      ? formatMoneyDecimalLabel(prices?.additionalServicesPrice)
      : "?",
    measurementType: prices?.isFixedRate ? PriceMeasurementType.FLAT_RATE : PriceMeasurementType.CONSUMPTION_DEPENDANT,
    spikePrice: prices?.spikePrice ? formatMoneyDecimalLabel(prices?.spikePrice) : "",
    containsSpikePrice: prices?.spikePrice !== undefined,
  }
}

export const getPricesUpsertMapper = (pricePackages?: ZevPricePackage[]): PricePackageUpsert => {
  if (!pricePackages || pricePackages.length === 0) return Map([[0, initialPricePackageItem]])
  return Map(pricePackages.map((pricePackage) => [pricePackage.id, zevPricesUpsertMapper(pricePackage)]))
}

export const zevPricesUpsertMapper = (pricePackage: ZevPricePackage): PricePackageItem => {
  return {
    id: pricePackage.id,
    order: pricePackage.order,
    priceTitle: pricePackage.name,
    priceSolarPower: formatMoneyDecimal(pricePackage.prices?.solarPrice),
    priceHighTariff: formatMoneyDecimal(pricePackage.prices?.highTariffPrice),
    priceLowTariff: formatMoneyDecimal(pricePackage.prices?.lowTariffPrice),
    additionalServicesPrice: formatMoneyDecimal(pricePackage.prices?.additionalServicesPrice),
    measurementType: pricePackage.prices?.isFixedRate
      ? PriceMeasurementType.FLAT_RATE
      : PriceMeasurementType.CONSUMPTION_DEPENDANT,
    spikePrice: pricePackage.prices?.spikePrice ? formatMoneyDecimal(pricePackage.prices?.spikePrice) : "",
    containsSpikePrice: pricePackage.prices?.spikePrice !== undefined,
  }
}

export const setPricesUpsertMapper = (pricePackages: PricePackageUpsert): ZevPricePackage[] => {
  return Array.from(pricePackages.values()).map((pricePackage) => ({
    id: pricePackage.id,
    name: pricePackage.priceTitle,
    order: pricePackage.id,
    prices: {
      solarPrice: pricePackage.priceSolarPower,
      highTariffPrice: pricePackage.priceHighTariff,
      lowTariffPrice: pricePackage.priceLowTariff,
      additionalServicesPrice: pricePackage.additionalServicesPrice,
      isFixedRate: pricePackage.measurementType === PriceMeasurementType.FLAT_RATE,
      spikePrice: pricePackage.containsSpikePrice ? pricePackage.spikePrice : undefined,
    },
  }))
}
