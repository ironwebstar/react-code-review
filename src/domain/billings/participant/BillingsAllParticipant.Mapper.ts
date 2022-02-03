import {
  AllParticipantBillingDetailsAdminResponse,
  AllParticipantsBillingState,
  ZevAllParticipantsBillingAdminResponse,
} from "../../../data/generated-sources/openapi"
import { DomainDependencies } from "../../Domain.Dependencies"
import {
  apiFormattedDateToTimestamp,
  appFormattedDate,
  appFormattedMonthDate,
  formatMoneyLabel,
  formatNumberString,
} from "../../Domain.Formatters"
import { zevPricePackageMapper, getPricesUpsertMapper } from "../../prices/Prices.Mapper"
import { BillingsAllParticipantList } from "./BillingsAllParticipant.Model"
import { BillingsParticipantDetail, BillingsParticipantFinalise, BillingStatusType } from "./BillingsParticipant.Model"
import { billingConsumptionItemMapper, billingParticipantMapper } from "./BillingsParticipantPowerParamters.Mapper"
import { BillingsParticipantPowerMeterParameter } from "./BillingsParticipantPowerParamters.Model"

export const billingsAllParticipantListMapper = (
  response: ZevAllParticipantsBillingAdminResponse,
  deps: DomainDependencies,
): BillingsAllParticipantList => {
  return {
    billingsAll: response.elements.map((element) => ({
      id: element.id,
      period: `${appFormattedMonthDate(element.startDate, deps)} - ${appFormattedMonthDate(element.endDate, deps)}`,
      periodSortValue: apiFormattedDateToTimestamp(element.startDate),
      total:
        element.currentState === AllParticipantsBillingState.DONE ||
        element.currentState === AllParticipantsBillingState.PAID
          ? formatMoneyLabel(element.totalSum)
          : "",
      billingState: BillingStatusType[element.currentState],
      billingApprovalReady:
        element.currentState === AllParticipantsBillingState.IN_PROGRESS ||
        element.currentState === AllParticipantsBillingState.IN_PROGRESS_REOPENED,
    })),
  }
}

export const billingsAllParticipantDetailMapper = (
  billing: AllParticipantBillingDetailsAdminResponse,
  powerMeterParameters: BillingsParticipantPowerMeterParameter[],
  deps: DomainDependencies,
): BillingsParticipantDetail => {
  return {
    totalConsumption: formatNumberString(billing.totalConsumption),
    totalCosts: formatMoneyLabel(billing.totalCosts),
    billingStatusType: BillingStatusType[billing.billingStatus],
    billingDateRange:
      `${appFormattedMonthDate(billing.billingStartDate, deps)} - ` +
      appFormattedMonthDate(billing.billingEndDate, deps),
    prices: billing.pricePackages?.map((pricePackage) => zevPricePackageMapper(pricePackage)) ?? [],
    upsertPrices: getPricesUpsertMapper(billing.pricePackages),
    containsErrorMessages:
      powerMeterParameters.find((parameter) => parameter.parent.errorMessage !== undefined) !== undefined,
    billingFinalised: billing.billingStatus === AllParticipantsBillingState.DONE,
    consumptionOverview: {
      totalHighTariff: parseFloat(billing.totalEnergyHighTariff),
      totalLowTariff: parseFloat(billing.totalEnergyLowTariff),
      totalProduction: parseFloat(billing.totalEnergyProduction),
    },
    allParticipants: billingParticipantMapper(powerMeterParameters, deps),
    allConsumption: powerMeterParameters.map((powerMeterParameter) => {
      const bill = billing.bills.find((bill) => bill.consumptionPointId === powerMeterParameter.consumptionPoint.id)
      return billingConsumptionItemMapper(powerMeterParameter, bill, deps)
    }),
  }
}

export const billingsAllParticipantFinaliseMapper = (
  billing: AllParticipantBillingDetailsAdminResponse,
  powerMeterParameters: BillingsParticipantPowerMeterParameter[],
  deps: DomainDependencies,
): BillingsParticipantFinalise => {
  return {
    billingStatusType: BillingStatusType[billing.billingStatus],
    billingDateRange:
      `${appFormattedMonthDate(billing.billingStartDate, deps)} - ` +
      appFormattedMonthDate(billing.billingEndDate, deps),
    invoiceDate: appFormattedDate(billing.billingDate, deps),
    totalCosts: formatMoneyLabel(billing.totalCosts),
    totalConsumption: formatNumberString(billing.totalConsumption),
    allConsumption: powerMeterParameters.map((powerMeterParameter) => {
      const bill = billing.bills.find((bill) => bill.consumptionPointId === powerMeterParameter.consumptionPoint.id)
      return billingConsumptionItemMapper(powerMeterParameter, bill, deps)
    }),
  }
}
