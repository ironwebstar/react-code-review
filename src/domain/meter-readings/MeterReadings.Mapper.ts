import { isValid, differenceInCalendarDays, startOfMonth, endOfMonth } from "date-fns"
import {
  MeterReadingsZevCalcResponse,
  MeterReadingsConsumptionPointCalcResponse,
} from "../../data/generated-sources/openapi"
import {
  IntraDayMeterReading,
  MeterReadingsFirstDayOfWeek,
  MeterReadingsLastDayFillCheck,
  MeterReadingDateRange,
  MeterReadingsTotalDaysToFill,
  ZevMeterReading,
  ZevConsumedMeterReadingItem,
  ZevProducedMeterReadingItem,
  ConsumptionPointMeterReading,
  ConsumptionPointConsumedMeterReadingItem,
  ConsumptionPointProducedMeterReadingItem,
  TotalConsumedData,
  TotalProducedData,
} from "./MeterReadings.Model"

export const intraDayMeterReadingMapper = (meterReadings: MeterReadingsZevCalcResponse): IntraDayMeterReading => {
  return {
    data: meterReadings.data.map((item) => {
      const itemUsage = parseFloat(item.cpSum)
      const itemProd = parseFloat(item.production)
      const meterReadingItem = {
        production: item.production,
        cpSum: item.cpSum,
        dateTime: item.dateTime,
        areaUsage: [0, Math.min(itemProd, itemUsage)] as [number, number],
      }

      if (itemUsage < itemProd) {
        return {
          ...meterReadingItem,
          areaSold: [itemUsage, itemProd],
          areaBought: [itemProd, itemProd],
        }
      } else if (itemUsage > itemProd) {
        return {
          ...meterReadingItem,
          areaSold: [itemUsage, itemUsage],
          areaBought: [itemProd, itemUsage],
        }
      } else {
        return {
          ...meterReadingItem,
          areaSold: [0, 0],
          areaBought: [0, 0],
        }
      }
    }),
  }
}

export const zevConsumptionMeterReadingMapper = (
  meterReadings: MeterReadingsZevCalcResponse,
  resolution: MeterReadingDateRange,
): ZevMeterReading => {
  if (meterReadings.data.length === 0) return emptyZevMeterReading
  const [firstData, ...remainingDates] = meterReadings.data as Array<Partial<{ dateTime: string }>>
  const firstDate = firstData.dateTime
  const { dateTime } = remainingDates.length > 0 ? meterReadings.data.slice(-1)[0] : firstData
  switch (resolution) {
    case MeterReadingDateRange.WEEK:
      return {
        consumptionData: [
          ...createEmptyZevConsumedDataArray(getMissingWeekDays(firstDate)),
          ...meterReadings.data.map((meterReading) => ({
            produced: meterReading.sumProduction,
            energyHighTariff: meterReading.sumEnergyHighTariff,
            energyLowTariff: meterReading.sumEnergyLowTariff,
            dateTime: meterReading.dateTime,
          })),
          ...createEmptyZevConsumedDataArray(getRemainingWeekDays(dateTime, firstDate)),
        ],
        productionData: [
          ...createEmptyZevProducedDataArray(getMissingWeekDays(firstDate)),
          ...meterReadings.data.map((meterReading) => ({
            used: meterReading.sumProduction,
            sold: meterReading.sold,
            dateTime: meterReading.dateTime,
          })),
          ...createEmptyZevProducedDataArray(getRemainingWeekDays(dateTime, firstDate)),
        ],
        totalConsumedData: totalConsumedZev(meterReadings),
        totalProducedData: totalProducedZev(meterReadings),
      }
    case MeterReadingDateRange.MONTH:
      return {
        consumptionData: [
          ...createEmptyZevConsumedDataArray(getMissingMonthDays(firstDate)),
          ...meterReadings.data.map((meterReading) => ({
            produced: meterReading.sumProduction,
            energyHighTariff: meterReading.sumEnergyHighTariff,
            energyLowTariff: meterReading.sumEnergyLowTariff,
            dateTime: meterReading.dateTime,
          })),
          ...createEmptyZevConsumedDataArray(getRemainingMonthDays(dateTime)),
        ],
        productionData: [
          ...createEmptyZevProducedDataArray(getMissingMonthDays(firstDate)),
          ...meterReadings.data.map((meterReading) => ({
            used: meterReading.sumProduction,
            sold: meterReading.sold,
            dateTime: meterReading.dateTime,
          })),
          ...createEmptyZevProducedDataArray(getRemainingMonthDays(dateTime)),
        ],
        totalConsumedData: totalConsumedZev(meterReadings),
        totalProducedData: totalProducedZev(meterReadings),
      }
    case MeterReadingDateRange.YEAR:
      return {
        consumptionData: [
          ...createEmptyZevConsumedDataArray(getMissingMonths(firstDate)),
          ...meterReadings.data.map((meterReading) => ({
            produced: meterReading.sumProduction,
            energyHighTariff: meterReading.sumEnergyHighTariff,
            energyLowTariff: meterReading.sumEnergyLowTariff,
            dateTime: meterReading.dateTime,
          })),
          ...createEmptyZevConsumedDataArray(getRemainingMonths(dateTime)),
        ],
        productionData: [
          ...createEmptyZevProducedDataArray(getMissingMonths(firstDate)),
          ...meterReadings.data.map((meterReading) => ({
            used: meterReading.sumProduction,
            sold: meterReading.sold,
            dateTime: meterReading.dateTime,
          })),
          ...createEmptyZevProducedDataArray(getRemainingMonths(dateTime)),
        ],
        totalConsumedData: totalConsumedZev(meterReadings),
        totalProducedData: totalProducedZev(meterReadings),
      }
  }
}

export const consumptionMeterReadingMapper = (
  meterReadings: MeterReadingsConsumptionPointCalcResponse,
  resolution: MeterReadingDateRange,
): ConsumptionPointMeterReading => {
  if (meterReadings.data.length === 0) return emptyConsumptionPointMeterReading
  const [firstData, ...remainingDates] = meterReadings.data as Array<Partial<{ dateTime: string }>>
  const firstDate = firstData.dateTime
  const { dateTime } = remainingDates.length > 0 ? meterReadings.data.slice(-1)[0] : firstData
  switch (resolution) {
    case MeterReadingDateRange.WEEK:
      return {
        consumptionData: [
          ...createEmptyConsumptionPointConsumedDataArray(getMissingWeekDays(firstDate)),
          ...meterReadings.data.map((meterReading) => ({
            produced: meterReading.produced,
            energyHighTariff: meterReading.energyHighTariff,
            energyLowTariff: meterReading.energyLowTariff,
            dateTime: meterReading.dateTime,
          })),
          ...createEmptyConsumptionPointConsumedDataArray(getRemainingWeekDays(dateTime, firstDate)),
        ],
        productionData: [
          ...createEmptyConsumptionPointProducedDataArray(getMissingWeekDays(firstDate)),
          ...meterReadings.data.map((meterReading) => ({
            consumption: meterReading.consumption,
            produced: meterReading.produced,
            dateTime: meterReading.dateTime,
          })),
          ...createEmptyConsumptionPointProducedDataArray(getRemainingWeekDays(dateTime, firstDate)),
        ],
        totalConsumedData: totalConsumedConsumptionPoint(meterReadings),
        totalProducedData: totalProducedConsumptionPoint(meterReadings),
      }
    case MeterReadingDateRange.MONTH:
      return {
        consumptionData: [
          ...createEmptyConsumptionPointConsumedDataArray(getMissingMonthDays(firstDate)),
          ...meterReadings.data.map((meterReading) => ({
            produced: meterReading.produced,
            energyHighTariff: meterReading.energyHighTariff,
            energyLowTariff: meterReading.energyLowTariff,
            dateTime: meterReading.dateTime,
          })),
          ...createEmptyConsumptionPointConsumedDataArray(getRemainingMonthDays(dateTime)),
        ],
        productionData: [
          ...createEmptyConsumptionPointProducedDataArray(getMissingMonthDays(firstDate)),
          ...meterReadings.data.map((meterReading) => ({
            consumption: meterReading.consumption,
            produced: meterReading.produced,
            dateTime: meterReading.dateTime,
          })),
          ...createEmptyConsumptionPointProducedDataArray(getRemainingMonthDays(dateTime)),
        ],
        totalConsumedData: totalConsumedConsumptionPoint(meterReadings),
        totalProducedData: totalProducedConsumptionPoint(meterReadings),
      }
    case MeterReadingDateRange.YEAR:
      return {
        consumptionData: [
          ...createEmptyConsumptionPointConsumedDataArray(getMissingMonths(firstDate)),
          ...meterReadings.data.map((meterReading) => ({
            produced: meterReading.produced,
            energyHighTariff: meterReading.energyHighTariff,
            energyLowTariff: meterReading.energyLowTariff,
            dateTime: meterReading.dateTime,
          })),
          ...createEmptyConsumptionPointConsumedDataArray(getRemainingMonths(dateTime)),
        ],
        productionData: [
          ...createEmptyConsumptionPointProducedDataArray(getMissingMonths(firstDate)),
          ...meterReadings.data.map((meterReading) => ({
            consumption: meterReading.consumption,
            produced: meterReading.produced,
            dateTime: meterReading.dateTime,
          })),
          ...createEmptyConsumptionPointProducedDataArray(getRemainingMonths(dateTime)),
        ],
        totalConsumedData: totalConsumedConsumptionPoint(meterReadings),
        totalProducedData: totalProducedConsumptionPoint(meterReadings),
      }
  }
}

const totalConsumedZev = (meterReadings: MeterReadingsZevCalcResponse): TotalConsumedData => {
  return {
    totalProduction: parseFloat(meterReadings.totalSumProduction),
    totalHighTariff: parseFloat(meterReadings.totalSumEnergyHighTariff),
    totalLowTariff: parseFloat(meterReadings.totalSumEnergyLowTariff),
  }
}

const totalProducedZev = (meterReadings: MeterReadingsZevCalcResponse): TotalProducedData => {
  return {
    totalProduction: parseFloat(meterReadings.totalSumProduction),
    totalSold: parseFloat(meterReadings.totalSold),
  }
}

const totalConsumedConsumptionPoint = (meterReadings: MeterReadingsConsumptionPointCalcResponse): TotalConsumedData => {
  return {
    totalProduction: parseFloat(meterReadings.totalProduced),
    totalHighTariff: parseFloat(meterReadings.totalEnergyHighTariff),
    totalLowTariff: parseFloat(meterReadings.totalEnergyLowTariff),
  }
}

const totalProducedConsumptionPoint = (meterReadings: MeterReadingsConsumptionPointCalcResponse): TotalProducedData => {
  return {
    totalProduction: parseFloat(meterReadings.totalProduced),
    totalConsumption: parseFloat(meterReadings.totalConsumption),
  }
}

const emptyZevMeterReading: ZevMeterReading = {
  consumptionData: [],
  productionData: [],
  totalProducedData: {
    totalProduction: 0,
    totalSold: 0,
  },
  totalConsumedData: {
    totalProduction: 0,
    totalLowTariff: 0,
    totalHighTariff: 0,
  },
}

const emptyConsumptionPointMeterReading: ConsumptionPointMeterReading = {
  consumptionData: [],
  productionData: [],
  totalProducedData: {
    totalProduction: 0,
  },
  totalConsumedData: {
    totalProduction: 0,
    totalLowTariff: 0,
    totalHighTariff: 0,
  },
}

const getMissingWeekDays = (dateString?: string, firstDate?: string) => {
  const firstDay = stripDate(firstDate)
  const date = stripDate(dateString)
  if (!firstDay || !date) return []
  const dateDiff: number = firstDay.getDay() - (firstDay.getDay() === MeterReadingsFirstDayOfWeek.Sunday ? 0 : 1)
  const weekstart = firstDay.getDate() - dateDiff
  return Array(dateDiff)
    .fill(null)
    .map((_, indx) => new Date(firstDay.setDate(weekstart + indx)).toISOString().split("T")[0])
}

const getRemainingWeekDays = (dateString?: string, firstDate?: string) => {
  const firstDay = stripDate(firstDate)
  const date = stripDate(dateString)
  if (!firstDay) return []
  const lastDayFillCheck: number =
    firstDay.getDay() === MeterReadingsFirstDayOfWeek.Sunday
      ? MeterReadingsLastDayFillCheck.Saturday
      : MeterReadingsLastDayFillCheck.Sunday
  const daysToFill: number =
    firstDay.getDay() === MeterReadingsFirstDayOfWeek.Sunday
      ? MeterReadingsTotalDaysToFill.Sunday
      : MeterReadingsTotalDaysToFill.Monday

  if (!date || date.getDay() === lastDayFillCheck) return []

  const lastDay: number = date.getDate()
  const dateDiff: number = daysToFill - date.getDay()

  return Array(dateDiff)
    .fill(null)
    .map((_, index) => new Date(date.setDate(lastDay + index)).toISOString().split("T")[0])
}

const getMissingMonthDays = (dateString?: string) => {
  const date = stripDate(dateString)
  if (!date) return []
  return Array(differenceInCalendarDays(date, startOfMonth(date)))
    .fill(undefined)
    .map((_, index) => new Date(date.setDate(index + 1)).toISOString().split("T")[0])
}

const getRemainingMonthDays = (dateString?: string) => {
  const date = stripDate(dateString)
  if (!date) return []
  const dateDiff: number = differenceInCalendarDays(endOfMonth(date), date)
  const lastDay: number = date.getDate()
  return Array(dateDiff)
    .fill(null)
    .map((_, index) => new Date(date.setDate(lastDay + index + 1)).toISOString().split("T")[0])
}

const getMissingMonths = (dateString?: string) => {
  const date = stripDate(dateString)
  if (!date) return []
  return Array(date.getMonth())
    .fill(undefined)
    .map((_, index) => new Date(date.setMonth(index)).toISOString().split("T")[0])
}

const getRemainingMonths = (dateString?: string) => {
  const date = stripDate(dateString)
  if (!date) return []
  const lastMonth = date.getMonth()
  const dateDiff = 11 - date.getMonth()
  return Array(dateDiff)
    .fill(null)
    .map((_, indx) => new Date(date.setMonth(lastMonth + indx + 1)).toISOString().split("T")[0])
}

const stripDate = (dateString?: string) => {
  if (!dateString) return undefined
  const date = new Date(dateString.split("T")[0])
  return isValid(date) ? date : undefined
}

const createEmptyZevConsumedDataArray = (emptyDateArray: Array<string>): ZevConsumedMeterReadingItem[] => {
  return emptyDateArray.map((elem: string) => ({
    produced: "",
    energyHighTariff: "",
    energyLowTariff: "",
    dateTime: elem,
  }))
}

const createEmptyZevProducedDataArray = (emptyDateArray: Array<string>): ZevProducedMeterReadingItem[] => {
  return emptyDateArray.map((elem: string) => ({
    used: "",
    sold: "",
    dateTime: elem,
  }))
}

const createEmptyConsumptionPointConsumedDataArray = (
  emptyDateArray: Array<string>,
): ConsumptionPointConsumedMeterReadingItem[] => {
  return emptyDateArray.map((elem: string) => ({
    produced: "",
    energyHighTariff: "",
    energyLowTariff: "",
    dateTime: elem,
  }))
}

const createEmptyConsumptionPointProducedDataArray = (
  emptyDateArray: Array<string>,
): ConsumptionPointProducedMeterReadingItem[] => {
  return emptyDateArray.map((elem: string) => ({
    consumption: "",
    produced: "",
    dateTime: elem,
  }))
}
