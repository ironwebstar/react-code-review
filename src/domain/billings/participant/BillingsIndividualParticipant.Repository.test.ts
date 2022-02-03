import localeDateDE from "date-fns/locale/de"
import { Map } from "immutable"
import { lastValueFrom } from "rxjs"
import * as sinon from "sinon"
import { format, parseISO } from "date-fns"
import {
  AdminIndividualParticipantBillingApi,
  AdminParticipantsApi,
  AdminZevApi,
  AdminConsumptionPointApi,
  AdminBuildingApi,
  IndividualParticipantBillingState,
} from "../../../data/generated-sources/openapi/api"
import { ajaxSuccess, testDomainDependencies } from "../../Domain.TestUtils"
import {
  testConfig,
  powerMeterParametersStub,
  consumptionPointStub,
  participantStub,
  buildingStub,
  individualParticipantBillingDetailsStub,
  individualParticipantBillingStub,
  zevStub,
} from "./BillingsParticipant.Stub"

import {
  getZevIndividualParticipantBillings,
  getIndividualParticipantBillingDetail,
  suspendIndividualParticipantBilling,
  unsuspendIndividualParticipantBilling,
  approveIndividualParticipantBilling,
  getIndividualParticipantBillingFinalise,
  reopenIndividualParticipantBilling,
} from "./BillingsIndividualParticipant.Repository"
import { BillingStatusType } from "./BillingsParticipant.Model"

const domainDependencies = testDomainDependencies()

test("getZevIndividualParticipantBillings", async () => {
  // given
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  const adminConsumptionPointApiStub = sinon.createStubInstance(AdminConsumptionPointApi)
  const adminParticipantsApiStub = sinon.createStubInstance(AdminParticipantsApi)

  adminZevApiStub.adminGetIndividualParticipantsBillingsZevById.withArgs(zevStub.id).returns(
    ajaxSuccess({
      elements: [individualParticipantBillingStub],
    }),
  )
  adminConsumptionPointApiStub.adminGetConsumptionPointById
    .withArgs(powerMeterParametersStub.consumptionPointId)
    .returns(ajaxSuccess(consumptionPointStub))
  adminConsumptionPointApiStub.getAdminParticipationById
    .withArgs(powerMeterParametersStub.consumptionPointId, powerMeterParametersStub.participationId ?? "")
    .returns(
      ajaxSuccess({
        id: participantStub.id,
        moveInDate: "",
        moveOutDate: "",
        participantId: "participant-1",
        bills: [],
        consumptionPointId: "consumption-point-1",
      }),
    )
  adminParticipantsApiStub.adminGetParticipantById
    .withArgs(participantStub.id ?? "")
    .returns(ajaxSuccess(participantStub))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminZevApi: adminZevApiStub,
    adminConsumptionPointApi: adminConsumptionPointApiStub,
    adminParticipantsApi: adminParticipantsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = getZevIndividualParticipantBillings(zevStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: {
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
    },
    type: "ok",
  })
})

test("getIndividualParticipantBillingDetail", async () => {
  // given
  const adminIndividualParticipantBillingApiStub = sinon.createStubInstance(AdminIndividualParticipantBillingApi)
  const adminConsumptionPointApiStub = sinon.createStubInstance(AdminConsumptionPointApi)
  const adminParticipantsApiStub = sinon.createStubInstance(AdminParticipantsApi)
  const adminBuildingApiStub = sinon.createStubInstance(AdminBuildingApi)

  adminIndividualParticipantBillingApiStub.getAdminIndividualParticipantBillingDetailsById
    .withArgs(individualParticipantBillingStub.id)
    .returns(ajaxSuccess(individualParticipantBillingDetailsStub))
  adminConsumptionPointApiStub.adminGetConsumptionPointById
    .withArgs(powerMeterParametersStub.consumptionPointId)
    .returns(ajaxSuccess(consumptionPointStub))
  adminConsumptionPointApiStub.getAdminParticipationById
    .withArgs(powerMeterParametersStub.consumptionPointId, powerMeterParametersStub.participationId ?? "")
    .returns(
      ajaxSuccess({
        id: participantStub.id,
        moveInDate: "",
        moveOutDate: "",
        participantId: "participant-1",
        bills: [],
        consumptionPointId: "consumption-point-1",
      }),
    )
  adminParticipantsApiStub.adminGetParticipantById
    .withArgs(participantStub.id ?? "")
    .returns(ajaxSuccess(participantStub))
  adminBuildingApiStub.adminGetBuildingById.withArgs(consumptionPointStub.buildingId).returns(ajaxSuccess(buildingStub))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminIndividualParticipantBillingApi: adminIndividualParticipantBillingApiStub,
    adminConsumptionPointApi: adminConsumptionPointApiStub,
    adminParticipantsApi: adminParticipantsApiStub,
    adminBuildingApi: adminBuildingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = getIndividualParticipantBillingDetail(individualParticipantBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: {
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
      billingFinalised:
        individualParticipantBillingDetailsStub.billingStatus === IndividualParticipantBillingState.DONE,
      consumptionOverview: {
        totalHighTariff: 565.44,
        totalLowTariff: 1012.02,
        totalProduction: 2079.352,
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
            totalHighTariff: 61.5,
            totalLowTariff: 170.17,
            totalProduction: 239.68,
          },
          consumptionPointId: "consumption-point-1",
          consumptionPointName: "1.OG rechts3",
          id: "consumption-point-1",
          paid: false,
          participantName: "Herr First Name 1477 Last Name 1477",
          period: "Jul 21 - Jul 21",
          totalConsumption: "471.00",
          totalConsumptionSortValue: 471,
          totalCosts: "CHF 77.70",
          invoiceReferenceNumber: "",
          orderReferenceNumber: "",
          accountingErrorMessage: "",
        },
      ],
    },
    type: "ok",
  })
})

test("suspendIndividualParticipantBilling", async () => {
  // given
  const adminIndividualParticipantBillingApiStub = sinon.createStubInstance(AdminIndividualParticipantBillingApi)
  adminIndividualParticipantBillingApiStub.putAdminIndividualParticipantBillingSuspendStateById
    .withArgs(individualParticipantBillingStub.id)
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminIndividualParticipantBillingApi: adminIndividualParticipantBillingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = suspendIndividualParticipantBilling(individualParticipantBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("unsuspendIndividualParticipantBilling", async () => {
  // given
  const adminIndividualParticipantBillingApiStub = sinon.createStubInstance(AdminIndividualParticipantBillingApi)
  adminIndividualParticipantBillingApiStub.putAdminIndividualParticipantBillingUnSuspendStateById
    .withArgs(individualParticipantBillingStub.id)
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminIndividualParticipantBillingApi: adminIndividualParticipantBillingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = unsuspendIndividualParticipantBilling(individualParticipantBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("approveAllParticipantBilling", async () => {
  // given
  const adminIndividualParticipantBillingApiStub = sinon.createStubInstance(AdminIndividualParticipantBillingApi)
  adminIndividualParticipantBillingApiStub.putAdminIndividualParticipantBillingApproveStateById
    .withArgs(individualParticipantBillingStub.id)
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminIndividualParticipantBillingApi: adminIndividualParticipantBillingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = approveIndividualParticipantBilling(individualParticipantBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("getIndividualParticipantBillingFinalise", async () => {
  // given
  const adminIndividualParticipantBillingApiStub = sinon.createStubInstance(AdminIndividualParticipantBillingApi)
  const adminConsumptionPointApiStub = sinon.createStubInstance(AdminConsumptionPointApi)
  const adminParticipantsApiStub = sinon.createStubInstance(AdminParticipantsApi)
  const adminBuildingApiStub = sinon.createStubInstance(AdminBuildingApi)

  adminIndividualParticipantBillingApiStub.getAdminIndividualParticipantBillingDetailsById
    .withArgs(individualParticipantBillingStub.id)
    .returns(ajaxSuccess(individualParticipantBillingDetailsStub))
  adminConsumptionPointApiStub.adminGetConsumptionPointById
    .withArgs(powerMeterParametersStub.consumptionPointId)
    .returns(ajaxSuccess(consumptionPointStub))
  adminConsumptionPointApiStub.getAdminParticipationById
    .withArgs(powerMeterParametersStub.consumptionPointId, powerMeterParametersStub.participationId ?? "")
    .returns(
      ajaxSuccess({
        id: participantStub.id,
        moveInDate: "",
        moveOutDate: "",
        participantId: "participant-1",
        bills: [],
        consumptionPointId: "consumption-point-1",
      }),
    )
  adminParticipantsApiStub.adminGetParticipantById
    .withArgs(participantStub.id ?? "")
    .returns(ajaxSuccess(participantStub))
  adminBuildingApiStub.adminGetBuildingById.withArgs(consumptionPointStub.buildingId).returns(ajaxSuccess(buildingStub))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminIndividualParticipantBillingApi: adminIndividualParticipantBillingApiStub,
    adminConsumptionPointApi: adminConsumptionPointApiStub,
    adminParticipantsApi: adminParticipantsApiStub,
    adminBuildingApi: adminBuildingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = getIndividualParticipantBillingFinalise(individualParticipantBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: {
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
            totalHighTariff: 61.5,
            totalLowTariff: 170.17,
            totalProduction: 239.68,
          },
          consumptionPointId: "consumption-point-1",
          consumptionPointName: "1.OG rechts3",
          id: "consumption-point-1",
          paid: false,
          participantName: "Herr First Name 1477 Last Name 1477",
          period: "Jul 21 - Jul 21",
          totalConsumption: "471.00",
          totalConsumptionSortValue: 471,
          totalCosts: "CHF 77.70",
          invoiceReferenceNumber: "",
          orderReferenceNumber: "",
          accountingErrorMessage: "",
        },
      ],
    },
    type: "ok",
  })
})

test("reopenIndividualParticipantBilling", async () => {
  // given
  const adminIndividualParticipantBillingApiStub = sinon.createStubInstance(AdminIndividualParticipantBillingApi)
  adminIndividualParticipantBillingApiStub.putAdminIndividualParticipantBillingReopenStateById
    .withArgs(individualParticipantBillingStub.id)
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminIndividualParticipantBillingApi: adminIndividualParticipantBillingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = reopenIndividualParticipantBilling(individualParticipantBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})
