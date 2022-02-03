export enum MeterReadingDateRange {
  WEEK = "WEEK",
  MONTH = "MONTH",
  YEAR = "YEAR",
}

export enum MeterReadingsFirstDayOfWeek {
  Sunday = 0,
  Monday = 1,
}

export enum MeterReadingsLastDayFillCheck {
  Saturday = 6,
  Sunday = 0,
}

export enum MeterReadingsTotalDaysToFill {
  Sunday = 6,
  Monday = 7,
}

export interface IntraDayMeterReading {
  data: IntraDayMeterReadingItem[]
}

export interface IntraDayMeterReadingItem {
  production: string
  cpSum: string
  dateTime: string
  areaUsage: [number, number]
  areaBought: [number, number]
  areaSold: [number, number]
}

export interface ZevMeterReading {
  consumptionData: ZevConsumedMeterReadingItem[]
  productionData: ZevProducedMeterReadingItem[]
  totalConsumedData: TotalConsumedData
  totalProducedData: TotalProducedData
}

export interface ConsumptionPointMeterReading {
  consumptionData: ConsumptionPointConsumedMeterReadingItem[]
  productionData: ConsumptionPointProducedMeterReadingItem[]
  totalConsumedData: TotalConsumedData
  totalProducedData: TotalProducedData
}

export interface ZevConsumedMeterReadingItem {
  produced: string
  energyHighTariff: string
  energyLowTariff: string
  dateTime: string
}

export interface ZevProducedMeterReadingItem {
  used: string
  sold: string
  dateTime: string
}
export interface ConsumptionPointConsumedMeterReadingItem {
  produced: string
  energyHighTariff: string
  energyLowTariff: string
  dateTime: string
}

export interface ConsumptionPointProducedMeterReadingItem {
  consumption: string
  produced: string
  dateTime: string
}

export interface TotalConsumedData {
  totalProduction: number
  totalLowTariff: number
  totalHighTariff: number
}

export interface TotalProducedData {
  totalProduction: number
  totalConsumption?: number
  totalSold?: number
}
