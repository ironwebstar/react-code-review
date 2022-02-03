import { Map } from "immutable"
import { format, parseISO } from "date-fns"
import localeDateDE from "date-fns/locale/de"
import { IndividualParticipantBillingState } from "../../../data/generated-sources/openapi"
import { testDomainDependencies } from "../../Domain.TestUtils"

import {
  billingsIndividualParticipantMapper,
  billingsIndividualParticipantDetailMapper,
  billingsIndividualParticipantFinaliseMapper,
} from "./BillingsIndividualParticipant.Mapper"
import {
  testConfig,
  individualParticipantBillingStub,
  powerMeterParametersStub,
  consumptionPointStub,
  participantStub,
  buildingStub,
  individualParticipantBillingDetailsStub,
} from "./BillingsParticipant.Stub"
import { BillingStatusType } from "./BillingsParticipant.Model"

const domainDependencies = testDomainDependencies()
const depsStub = {
  ...domainDependencies,
  cookie: {
    ...domainDependencies.cookie,
  },
  config: {
    ...testConfig,
    locale: localeDateDE,
  },
}

test("billingsIndividualParticipantMapper", () => {
  const result = billingsIndividualParticipantMapper(
    [
      {
        billing: individualParticipantBillingStub,
        consumptionPoint: consumptionPointStub,
        participant: participantStub,
      },
    ],
    depsStub,
  )

  expect(result).toEqual({
    billingsIndividual: [
      {
        id: individualParticipantBillingStub.id,
        period: `${format(parseISO(individualParticipantBillingStub.startDate), "MMM yy", {
          locale: localeDateDE,
        })} - ${format(parseISO(individualParticipantBillingStub.endDate), "MMM yy", {
          locale: localeDateDE,
        })}`,
        periodSortValue: parseISO(individualParticipantBillingStub.startDate).getTime(),
        consumptionPoint: consumptionPointStub.name,
        participant: "Herr First Name 1477 Last Name 1477",
        billingState: BillingStatusType[individualParticipantBillingStub.currentState],
        billingApprovalReady:
          individualParticipantBillingStub.currentState === IndividualParticipantBillingState.IN_PROGRESS ||
          individualParticipantBillingStub.currentState === IndividualParticipantBillingState.IN_PROGRESS_REOPENED,
      },
    ],
  })
})

test("billingsIndividualParticipantDetailMapper", () => {
  const result = billingsIndividualParticipantDetailMapper(
    individualParticipantBillingDetailsStub,
    {
      parent: powerMeterParametersStub,
      consumptionPoint: consumptionPointStub,
      participant: participantStub,
      building: buildingStub,
    },
    depsStub,
  )

  expect(result).toEqual({
    totalConsumption: "471.00",
    totalCosts: "CHF 77.70",
    billingStatusType: BillingStatusType[individualParticipantBillingDetailsStub.billingStatus],
    billingDateRange: "Jul 21 - Sep 21",
    prices: [
      {
        additionalServicesPrice: "CHF 0.0132",
        containsSpikePrice: true,
        id: 0,
        measurementType: "CONSUMPTION_DEPENDANT",
        order: 1,
        priceHighTariff: "CHF 0.1962",
        priceLowTariff: "CHF 0.1753",
        priceSolarPower: "CHF 0.1235",
        priceTitle: "",
        spikePrice: "CHF 0.0123",
      },
    ],
    upsertPrices: Map(),
    containsErrorMessages: false,
    billingFinalised: individualParticipantBillingDetailsStub.billingStatus === IndividualParticipantBillingState.DONE,
    consumptionOverview: {
      totalHighTariff: parseFloat(individualParticipantBillingDetailsStub.totalEnergyHighTariff),
      totalLowTariff: parseFloat(individualParticipantBillingDetailsStub.totalEnergyLowTariff),
      totalProduction: parseFloat(individualParticipantBillingDetailsStub.totalEnergyProduction),
    },
    allParticipants: [
      {
        buildingId: "building-1",
        buildingName: "Autorep-Werkstatt mit Wohnung",
        consumptionPointId: "consumption-point-1",
        consumptionPointName: "1.OG rechts3",
        errorMessage: "-",
        id: "consumption-point-1",
        isDataAvailable: true,
        participantName: "Herr First Name 1477 Last Name 1477",
      },
    ],
    allConsumption: [
      {
        accountingStatus: "UNAVAILABLE",
        billId: "bill-1",
        buildingName: "Autorep-Werkstatt mit Wohnung",
        consumptionOverview: {
          totalHighTariff: 0,
          totalLowTariff: 0,
          totalProduction: NaN,
        },
        consumptionPointId: "consumption-point-1",
        consumptionPointName: "1.OG rechts3",
        id: "consumption-point-1",
        paid: false,
        participantName: "Herr First Name 1477 Last Name 1477",
        period: "Jul 21 - Jul 21",
        totalConsumption: "NaN",
        totalConsumptionSortValue: NaN,
        totalCosts: "CHF 77.70",
        invoiceReferenceNumber: "",
        orderReferenceNumber: "",
        accountingErrorMessage: "",
      },
    ],
  })
})

test("billingsIndividualParticipantFinaliseMapper", () => {
  const result = billingsIndividualParticipantFinaliseMapper(
    individualParticipantBillingDetailsStub,
    {
      parent: powerMeterParametersStub,
      consumptionPoint: consumptionPointStub,
      participant: participantStub,
      building: buildingStub,
    },
    depsStub,
  )

  expect(result).toEqual({
    billingStatusType: BillingStatusType[individualParticipantBillingDetailsStub.billingStatus],
    billingDateRange: "Jul 21 - Sep 21",
    invoiceDate: "04. Jan 2022",
    totalCosts: "CHF 77.70",
    totalConsumption: "471.00",
    allConsumption: [
      {
        accountingStatus: "UNAVAILABLE",
        billId: "bill-1",
        buildingName: "Autorep-Werkstatt mit Wohnung",
        consumptionOverview: {
          totalHighTariff: 0,
          totalLowTariff: 0,
          totalProduction: NaN,
        },
        consumptionPointId: "consumption-point-1",
        consumptionPointName: "1.OG rechts3",
        id: "consumption-point-1",
        paid: false,
        participantName: "Herr First Name 1477 Last Name 1477",
        period: "Jul 21 - Jul 21",
        totalConsumption: "NaN",
        totalConsumptionSortValue: NaN,
        totalCosts: "CHF 77.70",
        invoiceReferenceNumber: "",
        orderReferenceNumber: "",
        accountingErrorMessage: "",
      },
    ],
  })
})
