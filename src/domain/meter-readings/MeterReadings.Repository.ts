import { Observable, from, map } from "rxjs"
import { MeterReadingsCalcResolution } from "../../data/generated-sources/openapi"
import { apiCall, apiHeaders } from "../Domain.Calls"
import { DomainDependencies } from "../Domain.Dependencies"
import { timestampToApiFormattedDate } from "../Domain.Formatters"
import { DomainResponse } from "../Domain.Response"
import {
  intraDayMeterReadingMapper,
  zevConsumptionMeterReadingMapper,
  consumptionMeterReadingMapper,
} from "./MeterReadings.Mapper"
import {
  ConsumptionPointMeterReading,
  IntraDayMeterReading,
  MeterReadingDateRange,
  ZevMeterReading,
} from "./MeterReadings.Model"
import { startOfWeek, endOfWeek } from "date-fns"

export const getIntraDayMeterReadings = (
  zevId: string,
  startDate: number,
  endDate: number,
  deps: DomainDependencies,
): Observable<DomainResponse<IntraDayMeterReading>> =>
  apiCall(
    from(
      deps.adminMeterReadingsApi.adminGetMeterReadingsZevById(
        zevId,
        timestampToApiFormattedDate(startDate, deps),
        timestampToApiFormattedDate(endDate, deps),
        MeterReadingsCalcResolution.MINUTE,
        apiHeaders(deps),
      ),
    ).pipe(map((meterReadings) => intraDayMeterReadingMapper(meterReadings.data))),
  )

export const getZevMeterReadings = (
  zevId: string,
  selectedDate: number,
  meterReadingDateRange: MeterReadingDateRange,
  deps: DomainDependencies,
): Observable<DomainResponse<ZevMeterReading>> => {
  const startDate = firstDayDate(selectedDate, meterReadingDateRange, deps)
  const endDate = lastDayDate(selectedDate, meterReadingDateRange, deps)
  return apiCall(
    from(
      deps.adminMeterReadingsApi.adminGetMeterReadingsZevById(
        zevId,
        timestampToApiFormattedDate(startDate.getTime(), deps),
        timestampToApiFormattedDate(endDate.getTime(), deps),
        meterReadingResolution(meterReadingDateRange),
        apiHeaders(deps),
      ),
    ).pipe(map((meterReadings) => zevConsumptionMeterReadingMapper(meterReadings.data, meterReadingDateRange))),
  )
}

export const getConsumptionPointMeterReadings = (
  consumptionId: string,
  selectedDate: number,
  meterReadingDateRange: MeterReadingDateRange,
  deps: DomainDependencies,
): Observable<DomainResponse<ConsumptionPointMeterReading>> => {
  const startDate = firstDayDate(selectedDate, meterReadingDateRange, deps)
  const endDate = lastDayDate(selectedDate, meterReadingDateRange, deps)
  return apiCall(
    from(
      deps.adminMeterReadingsApi.adminGetMeterReadingsConsumptionPointById(
        consumptionId,
        timestampToApiFormattedDate(startDate.getTime(), deps),
        timestampToApiFormattedDate(endDate.getTime(), deps),
        meterReadingResolution(meterReadingDateRange),
        apiHeaders(deps),
      ),
    ).pipe(map((meterReadings) => consumptionMeterReadingMapper(meterReadings.data, meterReadingDateRange))),
  )
}

const firstDayDate = (dateTime: number, meterReadingDateRange: MeterReadingDateRange, deps: DomainDependencies) => {
  const date = new Date(dateTime)
  switch (meterReadingDateRange) {
    case MeterReadingDateRange.WEEK:
      return startOfWeek(date, { locale: deps.config.locale })
    case MeterReadingDateRange.MONTH:
      return new Date(date.getFullYear(), date.getMonth(), 1)
    case MeterReadingDateRange.YEAR:
      return new Date(date.getFullYear(), 0, 1)
  }
}

const lastDayDate = (dateTime: number, meterReadingDateRange: MeterReadingDateRange, deps: DomainDependencies) => {
  const date = new Date(dateTime)
  switch (meterReadingDateRange) {
    case MeterReadingDateRange.WEEK:
      return endOfWeek(date, { locale: deps.config.locale })
    case MeterReadingDateRange.MONTH:
      return new Date(date.getFullYear(), date.getMonth() + 1, 0)
    case MeterReadingDateRange.YEAR:
      return new Date(date.getFullYear(), 11, 31)
  }
}

const meterReadingResolution = (meterReadingDateRange: MeterReadingDateRange) => {
  switch (meterReadingDateRange) {
    case MeterReadingDateRange.WEEK:
      return MeterReadingsCalcResolution.DAY
    case MeterReadingDateRange.MONTH:
      return MeterReadingsCalcResolution.DAY
    case MeterReadingDateRange.YEAR:
      return MeterReadingsCalcResolution.MONTH
  }
}
