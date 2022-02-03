import { DomainDependencies } from "./Domain.Dependencies"
import { format, parseISO } from "date-fns"

export const DEFAULT_DATE_FORMAT = "dd. MMM yyyy"
export const DAY_DATE_FORMAT = "d MMM yy"
export const API_DATE_FORMAT = "yyyy-MM-dd"
export const API_DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'.000Z'"
export const MONTH_DATE_FORMAT = "MMM yy"
export const YEAR_DATE_FORMAT = "yyyy"
export const WEEK_DATE_FORMAT = "Do MMM"

export const appFormattedDate = (date: string | undefined, deps: DomainDependencies) => {
  if (!date) return "-"
  return appFormattedDateValue(parseISO(date), deps.config.locale)
}

export const appFormattedMonthDate = (date: string | undefined, deps: DomainDependencies) => {
  if (!date) return "-"
  return appFormattedDateValue(parseISO(date), deps.config.locale, MONTH_DATE_FORMAT)
}

export const appFormattedYearDate = (date: string | undefined, deps: DomainDependencies) => {
  if (!date) return "-"
  return appFormattedDateValue(parseISO(date), deps.config.locale, YEAR_DATE_FORMAT)
}

export const appFormattedDateValue = (date: Date, locale: Locale, defaultFormat: string = DEFAULT_DATE_FORMAT) => {
  if (!date) return "-"
  return format(date, defaultFormat, {
    locale: locale,
  })
}

export const timestampToApiFormattedDate = (timestamp: number | undefined, deps: DomainDependencies) => {
  if (timestamp === undefined || timestamp === -1) return ""
  return format(timestamp, API_DATE_FORMAT, {
    locale: deps.config.locale,
  })
}

export const apiFormattedDateToTimestamp = (date?: string): number => {
  if (!date) return -1
  return parseISO(date).getTime()
}

export const MONEY_FORMATTER = new Intl.NumberFormat("de-CH", {
  style: "currency",
  currency: "CHF",
  minimumFractionDigits: 2,
})

export const MONEY_DECIMAL_FORMATTER = new Intl.NumberFormat("de-CH", {
  currency: "CHF",
  minimumFractionDigits: 4,
})

export function formatMoneyLabel(value?: string): string {
  return MONEY_FORMATTER.format(value ? parseFloat(value) : 0)
}

export function formatMoneyDecimal(value?: string): string {
  return MONEY_DECIMAL_FORMATTER.format(value ? parseFloat(value) : 0)
}

export function formatMoneyDecimalFromLabel(value: string): string {
  return formatMoneyDecimal(value.replace(/CHF /g, ""))
}

export function formatMoneyDecimalLabel(value?: string): string {
  return `CHF ${formatMoneyDecimal(value)}`
}

export const CHFNumberFormat = new Intl.NumberFormat("de-CH", { minimumFractionDigits: 2 })

export function formatNumberString(value?: string): string {
  return formatNumber(parseFloat(value ?? "0"))
}

export function formatNumber(value: number): string {
  return CHFNumberFormat.format(value)
}
