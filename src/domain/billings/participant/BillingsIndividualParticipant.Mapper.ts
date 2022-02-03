import { Map } from "immutable"
import {
  ConsumptionPointAdminResponse,
  IndividualParticipantBillingDetailsAdminResponse,
  IndividualParticipantBillingState,
  ParticipantResponse,
  ZevIndividualParticipantBilling,
} from "../../../data/generated-sources/openapi"
import { DomainDependencies } from "../../Domain.Dependencies"
import {
  apiFormattedDateToTimestamp,
  appFormattedDate,
  appFormattedMonthDate,
  formatMoneyLabel,
  formatNumberString,
} from "../../Domain.Formatters"
import { zevPricesMapper } from "../../prices/Prices.Mapper"
import { formatPersonalFullName } from "../../profiles/Profiles.Formatters"
import { BillingsIndividualParticipantList } from "./BillingsIndividualParticipant.Model"
import { BillingsParticipantDetail, BillingsParticipantFinalise, BillingStatusType } from "./BillingsParticipant.Model"
import { billingParticipantMapper, billingConsumptionItemMapper } from "./BillingsParticipantPowerParamters.Mapper"
import { BillingsParticipantPowerMeterParameter } from "./BillingsParticipantPowerParamters.Model"

export const billingsIndividualParticipantMapper = (
  response: {
    billing: ZevIndividualParticipantBilling
    consumptionPoint: ConsumptionPointAdminResponse
    participant: ParticipantResponse
  }[],
  deps: DomainDependencies,
): BillingsIndividualParticipantList => {
  return {
    billingsIndividual: response.map((element) => ({
      id: element.billing.id,
      period: `${appFormattedMonthDate(element.billing.startDate, deps)} - ${appFormattedMonthDate(
        element.billing.endDate,
        deps,
      )}`,
      periodSortValue: apiFormattedDateToTimestamp(element.billing.startDate),
      consumptionPoint: element.consumptionPoint.name,
      participant: formatPersonalFullName(element.participant.personalData, deps),
      billingState: BillingStatusType[element.billing.currentState],
      billingApprovalReady:
        element.billing.currentState === IndividualParticipantBillingState.IN_PROGRESS ||
        element.billing.currentState === IndividualParticipantBillingState.IN_PROGRESS_REOPENED,
    })),
  }
}

export const billingsIndividualParticipantDetailMapper = (
  billing: IndividualParticipantBillingDetailsAdminResponse,
  powerMeterParameter: BillingsParticipantPowerMeterParameter,
  deps: DomainDependencies,
): BillingsParticipantDetail => {
  return {
    totalConsumption: formatNumberString(billing.totalConsumption),
    totalCosts: formatMoneyLabel(billing.totalCosts),
    billingStatusType: BillingStatusType[billing.billingStatus],
    billingDateRange:
      `${appFormattedMonthDate(billing.billingStartDate, deps)} - ` +
      appFormattedMonthDate(billing.billingEndDate, deps),
    prices: [zevPricesMapper(0, 1, "", billing.prices)],
    upsertPrices: Map(),
    containsErrorMessages: powerMeterParameter.parent.errorMessage !== undefined,
    billingFinalised: billing.billingStatus === IndividualParticipantBillingState.DONE,
    consumptionOverview: {
      totalHighTariff: parseFloat(billing.totalEnergyHighTariff),
      totalLowTariff: parseFloat(billing.totalEnergyLowTariff),
      totalProduction: parseFloat(billing.totalEnergyProduction),
    },
    allParticipants: billingParticipantMapper([powerMeterParameter], deps),
    allConsumption: [billingConsumptionItemMapper(powerMeterParameter, billing.bill, deps)],
  }
}

export const billingsIndividualParticipantFinaliseMapper = (
  billing: IndividualParticipantBillingDetailsAdminResponse,
  powerMeterParameter: BillingsParticipantPowerMeterParameter,
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
    allConsumption: [billingConsumptionItemMapper(powerMeterParameter, billing.bill, deps)],
  }
}
