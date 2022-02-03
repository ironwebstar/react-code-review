import { Map } from "immutable"

export enum PriceMeasurementType {
  CONSUMPTION_DEPENDANT = "CONSUMPTION_DEPENDANT",
  FLAT_RATE = "FLAT_RATE",
}

export type PricePackageUpsert = Map<number, PricePackageItem>

export interface PricePackageItem {
  id: number
  order: number
  priceTitle: string
  priceSolarPower: string
  priceHighTariff: string
  priceLowTariff: string
  additionalServicesPrice: string
  measurementType: PriceMeasurementType
  spikePrice: string
  containsSpikePrice: boolean
}

export const initialPricePackageItem: PricePackageItem = {
  id: 0,
  order: 0,
  priceTitle: "",
  priceSolarPower: "",
  priceHighTariff: "",
  priceLowTariff: "",
  additionalServicesPrice: "",
  measurementType: PriceMeasurementType.CONSUMPTION_DEPENDANT,
  spikePrice: "",
  containsSpikePrice: false,
}
