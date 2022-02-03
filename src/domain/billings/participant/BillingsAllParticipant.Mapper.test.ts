import { format, parseISO } from "date-fns"
import { testDomainDependencies } from "../../Domain.TestUtils"
import {
  billingsAllParticipantDetailMapper,
  billingsAllParticipantFinaliseMapper,
  billingsAllParticipantListMapper,
} from "./BillingsAllParticipant.Mapper"
import { DomainConfig } from "../../Domain.Dependencies"
import localeDateDE from "date-fns/locale/de"
import { zevAllParticipantsBillingStatusStub } from "../Billings.Stub"
import { AllParticipantsBillingState } from "../../../data/generated-sources/openapi"
import {
  allParticipantBillingDetailsStub,
  buildingStub,
  consumptionPointStub,
  participantStub,
  powerMeterParametersStub,
  pricePackagesUpsert,
} from "./BillingsParticipant.Stub"
import { BillingStatusType } from "./BillingsParticipant.Model"

const domainDependencies = testDomainDependencies()

export const testConfig: DomainConfig = {
  baseUrl: "adminportal.ckw.noumenadigital.com",
  appName: "ckw-adminportal",
  locale: {
    code: "de",
  },
}

const depsStub = {
  ...domainDependencies,
  config: { ...testConfig, locale: localeDateDE },
}

test("billingsAllParticipantListMapper when status is DONE, returns totalAmount value", async () => {
  const actual = billingsAllParticipantListMapper(
    {
      elements: [zevAllParticipantsBillingStatusStub(AllParticipantsBillingState.DONE)],
    },
    depsStub,
  )

  expect(actual.billingsAll[0].total.replace(/\s/g, "")).toEqual("CHF4’533.20")
})

test("billingsAllParticipantListMapper when status is PAID, returns totalAmount value", async () => {
  const actual = billingsAllParticipantListMapper(
    {
      elements: [zevAllParticipantsBillingStatusStub(AllParticipantsBillingState.PAID)],
    },
    depsStub,
  )

  expect(actual.billingsAll[0].total.replace(/\s/g, "")).toEqual("CHF4’533.20")
})

test("billingsAllParticipantListMapper when status is IN_PROGRESS, does not return totalAmount value", async () => {
  const billing = zevAllParticipantsBillingStatusStub(AllParticipantsBillingState.IN_PROGRESS)
  const actual = billingsAllParticipantListMapper(
    {
      elements: [billing],
    },
    depsStub,
  )

  expect(actual).toEqual({
    billingsAll: [
      {
        billingApprovalReady: true,
        billingState: billing.currentState,
        id: billing.id,
        period: "Jul 21 - Dec 21",
        periodSortValue: parseISO(billing.startDate).getTime(),
        total: "",
      },
    ],
  })
})

test("billingsAllParticipantListMapper when status is PAID, does return totalAmount value", async () => {
  const billing = zevAllParticipantsBillingStatusStub(AllParticipantsBillingState.PAID)
  const actual = billingsAllParticipantListMapper(
    {
      elements: [billing],
    },
    depsStub,
  )

  expect(actual).toEqual({
    billingsAll: [
      {
        billingApprovalReady: false,
        billingState: billing.currentState,
        id: billing.id,
        period: "Jul 21 - Dec 21",
        periodSortValue: parseISO(billing.startDate).getTime(),
        total: "CHF 4’533.20",
      },
    ],
  })
})

test("billingsAllParticipantListMapper when status is DATA_AVAILABLE, does not return totalAmount value", async () => {
  const billing = zevAllParticipantsBillingStatusStub(AllParticipantsBillingState.DATA_AVAILABLE)
  const actual = billingsAllParticipantListMapper(
    {
      elements: [billing],
    },
    depsStub,
  )

  expect(actual).toEqual({
    billingsAll: [
      {
        billingApprovalReady: false,
        billingState: billing.currentState,
        id: billing.id,
        period: "Jul 21 - Dec 21",
        periodSortValue: parseISO(billing.startDate).getTime(),
        total: "",
      },
    ],
  })
})

test("billingsAllParticipantFinaliseMapper", () => {
  const result = billingsAllParticipantFinaliseMapper(
    allParticipantBillingDetailsStub,
    [
      {
        parent: powerMeterParametersStub,
        consumptionPoint: consumptionPointStub,
        participant: participantStub,
        building: buildingStub,
      },
    ],
    depsStub,
  )
  expect(result).toEqual({
    billingStatusType: BillingStatusType[allParticipantBillingDetailsStub.billingStatus],
    billingDateRange: "Jul 21 - Dec 21",
    invoiceDate: "-",
    totalCosts: "CHF 1’728.15",
    totalConsumption: "10’383.00",
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
        totalCosts: "CHF 0.00",
        invoiceReferenceNumber: "",
        orderReferenceNumber: "",
        accountingErrorMessage: "",
      },
    ],
  })
})

test("billingsAllParticipantListMapper when status is SUSPENDED, does not return totalAmount value", async () => {
  const billing = zevAllParticipantsBillingStatusStub(AllParticipantsBillingState.SUSPENDED)
  const actual = billingsAllParticipantListMapper(
    {
      elements: [billing],
    },
    depsStub,
  )

  expect(actual).toEqual({
    billingsAll: [
      {
        id: billing.id,
        period: `${format(parseISO(billing.startDate), "MMM yy", {
          locale: localeDateDE,
        })} - ${format(parseISO(billing.endDate), "MMM yy", {
          locale: localeDateDE,
        })}`,
        periodSortValue: parseISO(billing.startDate).getTime(),
        total: "",
        billingState: BillingStatusType[AllParticipantsBillingState.SUSPENDED],
        billingApprovalReady:
          billing.currentState === AllParticipantsBillingState.IN_PROGRESS ||
          billing.currentState === AllParticipantsBillingState.IN_PROGRESS_REOPENED,
      },
    ],
  })
})

test(
  "billingsAllParticipantListMapper when status is IN_PROGRESS_REOPENED, " + "does not return totalAmount value",
  async () => {
    const billing = zevAllParticipantsBillingStatusStub(AllParticipantsBillingState.IN_PROGRESS_REOPENED)
    const actual = billingsAllParticipantListMapper(
      {
        elements: [billing],
      },
      depsStub,
    )

    expect(actual).toEqual({
      billingsAll: [
        {
          billingApprovalReady: true,
          billingState: billing.currentState,
          id: billing.id,
          period: "Jul 21 - Dec 21",
          periodSortValue: parseISO(billing.startDate).getTime(),
          total: "",
        },
      ],
    })
  },
)

test("billingsAllParticipantDetailMapper", () => {
  const result = billingsAllParticipantDetailMapper(
    allParticipantBillingDetailsStub,
    [
      {
        parent: powerMeterParametersStub,
        consumptionPoint: consumptionPointStub,
        participant: participantStub,
        building: buildingStub,
      },
    ],
    depsStub,
  )

  expect(result).toEqual({
    totalConsumption: "10’383.00",
    totalCosts: "CHF 1’728.15",
    billingStatusType: BillingStatusType[allParticipantBillingDetailsStub.billingStatus],
    billingDateRange: "Jul 21 - Dec 21",
    prices: [
      {
        additionalServicesPrice: "CHF 5.0000",
        containsSpikePrice: false,
        id: 0,
        measurementType: "FLAT_RATE",
        order: 0,
        priceHighTariff: "CHF 0.1968",
        priceLowTariff: "CHF 0.1752",
        priceSolarPower: "CHF 0.1356",
        priceTitle: "Standard Preise",
        spikePrice: "",
      },
    ],
    upsertPrices: pricePackagesUpsert,
    containsErrorMessages: false,
    billingFinalised: allParticipantBillingDetailsStub.billingStatus === AllParticipantsBillingState.DONE,
    consumptionOverview: {
      totalHighTariff: parseFloat(allParticipantBillingDetailsStub.totalEnergyHighTariff),
      totalLowTariff: parseFloat(allParticipantBillingDetailsStub.totalEnergyLowTariff),
      totalProduction: parseFloat(allParticipantBillingDetailsStub.totalEnergyProduction),
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
        totalCosts: "CHF 0.00",
        invoiceReferenceNumber: "",
        orderReferenceNumber: "",
        accountingErrorMessage: "",
      },
    ],
  })
})

test(
  "billingsAllParticipantListMapper when status is WAITING_FOR_DATA, " + "does not return totalAmount value",
  async () => {
    const billing = zevAllParticipantsBillingStatusStub(AllParticipantsBillingState.WAITING_FOR_DATA)
    const actual = billingsAllParticipantListMapper(
      {
        elements: [billing],
      },
      depsStub,
    )

    expect(actual).toEqual({
      billingsAll: [
        {
          billingApprovalReady: false,
          billingState: billing.currentState,
          id: billing.id,
          period: "Jul 21 - Dec 21",
          periodSortValue: parseISO(billing.startDate).getTime(),
          total: "",
        },
      ],
    })
  },
)
