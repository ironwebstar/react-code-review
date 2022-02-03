import { BillDetails, EnergyType, PaymentStatus } from "../../../data/generated-sources/openapi"
import { DomainDependencies } from "../../Domain.Dependencies"
import { formatMoneyLabel, formatNumber, appFormattedMonthDate } from "../../Domain.Formatters"
import { formatPersonalFullName } from "../../profiles/Profiles.Formatters"
import { BillingsConsumptionItem } from "./BillingsParticipant.Model"
import { BillingsParticipantPowerMeterParameter } from "./BillingsParticipantPowerParamters.Model"

export const billingConsumptionItemMapper = (
  powerMeterParameter: BillingsParticipantPowerMeterParameter,
  bill: BillDetails | undefined,
  deps: DomainDependencies,
): BillingsConsumptionItem => {
  const consumptionOverview = {
    totalHighTariff: powerMeterParameter.parent.consumptionData.reduce((acc, value) => {
      if (value.energyType === EnergyType.HIGH_TARIFF) return acc + parseFloat(value.consumption)
      return acc
    }, 0),
    totalLowTariff: powerMeterParameter.parent.consumptionData.reduce((acc, value) => {
      if (value.energyType === EnergyType.LOW_TARIFF) return acc + parseFloat(value.consumption)
      return acc
    }, 0),
    totalProduction: powerMeterParameter.parent.consumptionData.reduce((acc, value) => {
      if (value.energyType === EnergyType.SOLAR) return acc + parseFloat(value.consumption)
      return acc
    }, 0),
  }
  const total = Math.floor(
    consumptionOverview.totalHighTariff + consumptionOverview.totalLowTariff + consumptionOverview.totalProduction,
  )
  return {
    id: powerMeterParameter.consumptionPoint.id,
    billId: bill?.id ?? "",
    paid: bill?.paymentStatus === PaymentStatus.PAID,
    period: `${appFormattedMonthDate(powerMeterParameter.parent.from, deps)} - ${appFormattedMonthDate(
      powerMeterParameter.parent.from,
      deps,
    )}`,
    consumptionPointId: powerMeterParameter.consumptionPoint.id,
    consumptionPointName: powerMeterParameter.consumptionPoint.name,
    buildingName: powerMeterParameter.building.name ?? "",
    participantName: formatPersonalFullName(powerMeterParameter.participant.personalData, deps),
    totalConsumption: formatNumber(total),
    totalConsumptionSortValue: total,
    totalCosts: formatMoneyLabel(
      bill?.billingCalculations.summaryPositions.find((position) => position.summaryType === "FINAL_AMOUNT_DUE")
        ?.amountDue,
    ),
    accountingStatus: bill?.accountingStatus ?? "",
    consumptionOverview: consumptionOverview,
    accountingErrorMessage: bill?.accountingErrorMessage ?? "",
    orderReferenceNumber: bill?.orderReferenceNumber ?? "",
    invoiceReferenceNumber: bill?.invoiceReferenceNumber ?? "",
  }
}

export const billingParticipantMapper = (
  powerMeterParameters: BillingsParticipantPowerMeterParameter[],
  deps: DomainDependencies,
) => {
  return powerMeterParameters.map((powerMeterParameter) => ({
    id: powerMeterParameter.consumptionPoint.id,
    consumptionPointId: powerMeterParameter.consumptionPoint.id,
    consumptionPointName: powerMeterParameter.consumptionPoint.name,
    participantName: formatPersonalFullName(powerMeterParameter.participant.personalData, deps),
    buildingId: powerMeterParameter.building.id,
    buildingName: powerMeterParameter.building.name ?? "",
    isDataAvailable: powerMeterParameter.parent.isDataAvailable,
    errorMessage: powerMeterParameter.parent.errorMessage ?? "-",
  }))
}
