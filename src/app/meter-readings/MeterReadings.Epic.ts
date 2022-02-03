import { createEpic } from "../Shared.Epic"
import { DOMAIN_DEPENDENCIES } from "../App.Config"
import {
  getZevMeterReadings,
  getIntraDayMeterReadings,
  getConsumptionPointMeterReadings,
} from "../../domain/meter-readings/MeterReadings.Repository"
import {
  ZevMeterReading,
  IntraDayMeterReading,
  ConsumptionPointMeterReading,
} from "../../domain/meter-readings/MeterReadings.Model"

export enum MeterReadingsActionType {
  METER_READINGS_INTRA_DAY_GET = "METER_READINGS_INTRA_DAY_GET",
  METER_READINGS_ZEV_GET = "METER_READINGS_ZEV_GET",
  METER_READINGS_CONSUMPTION_POINT_GET = "METER_READINGS_CONSUMPTION_POINT_GET",
}

export const meterReadingsEpic = [
  createEpic<IntraDayMeterReading>(MeterReadingsActionType.METER_READINGS_INTRA_DAY_GET, (action) =>
    getIntraDayMeterReadings(action.zevId, action.startDate, action.endDate, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ZevMeterReading>(MeterReadingsActionType.METER_READINGS_ZEV_GET, (action) =>
    getZevMeterReadings(action.zevId, action.selectedDate, action.meterReadingDateRange, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ConsumptionPointMeterReading>(MeterReadingsActionType.METER_READINGS_CONSUMPTION_POINT_GET, (action) =>
    getConsumptionPointMeterReadings(
      action.consumptionPointId,
      action.selectedDate,
      action.meterReadingDateRange,
      DOMAIN_DEPENDENCIES,
    ),
  ),
]
