import localeDateDE from "date-fns/locale/de"
import { lastValueFrom } from "rxjs"
import * as sinon from "sinon"
import { format, parseISO } from "date-fns"
import {
  AdminAllParticipantBillingApi,
  AdminParticipantsApi,
  AdminZevApi,
  AdminConsumptionPointApi,
  AdminBuildingApi,
  AllParticipantsBillingState,
} from "../../../data/generated-sources/openapi"
import { ajaxSuccess, testDomainDependencies } from "../../Domain.TestUtils"
import {
  testConfig,
  powerMeterParametersStub,
  consumptionPointStub,
  participantStub,
  buildingStub,
  allParticipantBillingDetailsStub,
  allParticipantBillingStub,
  pricePackagesUpsert,
  zevStub,
} from "./BillingsParticipant.Stub"

import {
  getZevAllParticipantBillings,
  getAllParticipantBillingDetail,
  updateAllParticipantBillingPrices,
  suspendAllParticipantBilling,
  unsuspendAllParticipantBilling,
  approveAllParticipantBilling,
  getAllParticipantBillingFinalise,
  reopenAllParticipantBilling,
} from "./BillingsAllParticipant.Repository"
import { BillingStatusType } from "./BillingsParticipant.Model"
import { setPricesUpsertMapper } from "../../prices/Prices.Mapper"

const domainDependencies = testDomainDependencies()

test("getZevAllParticipantBillings", async () => {
  // given
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminZevApiStub.adminGetAllParticipantsBillingsZevById.withArgs(zevStub.id).returns(
    ajaxSuccess({
      elements: [allParticipantBillingStub],
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminZevApi: adminZevApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = getZevAllParticipantBillings(zevStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: {
      billingsAll: [
        {
          id: allParticipantBillingStub.id,
          period: `${format(parseISO(allParticipantBillingStub.startDate), "MMM yy", {
            locale: localeDateDE,
          })} - ${format(parseISO(allParticipantBillingStub.endDate), "MMM yy", {
            locale: localeDateDE,
          })}`,
          periodSortValue: parseISO(allParticipantBillingStub.startDate).getTime(),
          total: "",
          billingState: BillingStatusType[allParticipantBillingStub.currentState],
          billingApprovalReady:
            allParticipantBillingStub.currentState === AllParticipantsBillingState.IN_PROGRESS ||
            allParticipantBillingStub.currentState === AllParticipantsBillingState.IN_PROGRESS_REOPENED,
        },
      ],
    },
    type: "ok",
  })
})

test("getAllParticipantBillingDetail", async () => {
  // given
  const adminAllParticipantBillingApiStub = sinon.createStubInstance(AdminAllParticipantBillingApi)
  const adminConsumptionPointApiStub = sinon.createStubInstance(AdminConsumptionPointApi)
  const adminParticipantsApiStub = sinon.createStubInstance(AdminParticipantsApi)
  const adminBuildingApiStub = sinon.createStubInstance(AdminBuildingApi)

  adminAllParticipantBillingApiStub.getAdminAllParticipantBillingDetailsById
    .withArgs(allParticipantBillingStub.id)
    .returns(ajaxSuccess(allParticipantBillingDetailsStub))
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
    adminAllParticipantBillingApi: adminAllParticipantBillingApiStub,
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
  const result = getAllParticipantBillingDetail(allParticipantBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: {
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
            totalHighTariff: 1479.16,
            totalLowTariff: 1178.44,
            totalProduction: 4564.07,
          },
          consumptionPointId: "consumption-point-1",
          consumptionPointName: "1.OG rechts3",
          id: "consumption-point-1",
          paid: false,
          participantName: "Herr First Name 1477 Last Name 1477",
          period: "Jul 21 - Jul 21",
          totalConsumption: "7’221.00",
          totalConsumptionSortValue: 7221,
          totalCosts: "CHF 0.00",
          invoiceReferenceNumber: "",
          orderReferenceNumber: "",
          accountingErrorMessage: "",
        },
      ],
    },
    type: "ok",
  })
})

test("updateAllParticipantBillingPrices", async () => {
  // given
  const adminAllParticipantBillingApiStub = sinon.createStubInstance(AdminAllParticipantBillingApi)
  adminAllParticipantBillingApiStub.updateAdminAllParticipantBillingPricesById
    .withArgs(allParticipantBillingStub.id, {
      pricePackages: setPricesUpsertMapper(pricePackagesUpsert),
    })
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminAllParticipantBillingApi: adminAllParticipantBillingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = updateAllParticipantBillingPrices(allParticipantBillingStub.id, pricePackagesUpsert, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("suspendAllParticipantBilling", async () => {
  // given
  const adminAllParticipantBillingApiStub = sinon.createStubInstance(AdminAllParticipantBillingApi)
  adminAllParticipantBillingApiStub.putAdminAllParticipantBillingSuspendStateById
    .withArgs(allParticipantBillingStub.id)
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminAllParticipantBillingApi: adminAllParticipantBillingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = suspendAllParticipantBilling(allParticipantBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("unsuspendAllParticipantBilling", async () => {
  // given
  const adminAllParticipantBillingApiStub = sinon.createStubInstance(AdminAllParticipantBillingApi)
  adminAllParticipantBillingApiStub.putAdminAllParticipantBillingUnSuspendStateById
    .withArgs(allParticipantBillingStub.id)
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminAllParticipantBillingApi: adminAllParticipantBillingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = unsuspendAllParticipantBilling(allParticipantBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("approveAllParticipantBilling", async () => {
  // given
  const adminAllParticipantBillingApiStub = sinon.createStubInstance(AdminAllParticipantBillingApi)
  adminAllParticipantBillingApiStub.putAdminAllParticipantBillingApproveStateById
    .withArgs(allParticipantBillingStub.id)
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminAllParticipantBillingApi: adminAllParticipantBillingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = approveAllParticipantBilling(allParticipantBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("getAllParticipantBillingFinalise", async () => {
  // given
  const adminAllParticipantBillingApiStub = sinon.createStubInstance(AdminAllParticipantBillingApi)
  const adminConsumptionPointApiStub = sinon.createStubInstance(AdminConsumptionPointApi)
  const adminParticipantsApiStub = sinon.createStubInstance(AdminParticipantsApi)
  const adminBuildingApiStub = sinon.createStubInstance(AdminBuildingApi)

  adminAllParticipantBillingApiStub.getAdminAllParticipantBillingDetailsById
    .withArgs(allParticipantBillingStub.id)
    .returns(ajaxSuccess(allParticipantBillingDetailsStub))
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
    adminAllParticipantBillingApi: adminAllParticipantBillingApiStub,
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
  const result = getAllParticipantBillingFinalise(allParticipantBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: {
      billingStatusType: BillingStatusType[allParticipantBillingDetailsStub.billingStatus],
      billingDateRange: "Jul 21 - Dec 21",
      invoiceDate: "-",
      totalConsumption: "10’383.00",
      totalCosts: "CHF 1’728.15",
      allConsumption: [
        {
          accountingStatus: "UNAVAILABLE",
          billId: "bill-1",
          buildingName: "Autorep-Werkstatt mit Wohnung",
          consumptionOverview: {
            totalHighTariff: 1479.16,
            totalLowTariff: 1178.44,
            totalProduction: 4564.07,
          },
          consumptionPointId: "consumption-point-1",
          consumptionPointName: "1.OG rechts3",
          id: "consumption-point-1",
          paid: false,
          participantName: "Herr First Name 1477 Last Name 1477",
          period: "Jul 21 - Jul 21",
          totalConsumption: "7’221.00",
          totalConsumptionSortValue: 7221,
          totalCosts: "CHF 0.00",
          invoiceReferenceNumber: "",
          orderReferenceNumber: "",
          accountingErrorMessage: "",
        },
      ],
    },
    type: "ok",
  })
})

test("reopenAllParticipantBilling", async () => {
  // given
  const adminAllParticipantBillingApiStub = sinon.createStubInstance(AdminAllParticipantBillingApi)
  adminAllParticipantBillingApiStub.putAdminAllParticipantBillingReopenStateById
    .withArgs(allParticipantBillingStub.id)
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminAllParticipantBillingApi: adminAllParticipantBillingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = reopenAllParticipantBilling(allParticipantBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})
