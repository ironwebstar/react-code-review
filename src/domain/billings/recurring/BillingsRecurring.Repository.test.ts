import localeDateDE from "date-fns/locale/de"
import { lastValueFrom } from "rxjs"
import * as sinon from "sinon"
import { format, parseISO } from "date-fns"
import { AdminServiceBillingsApi, AdminZevApi } from "../../../data/generated-sources/openapi/api"
import { ajaxSuccess, testDomainDependencies } from "../../Domain.TestUtils"
import {
  getRecurringBillings,
  getRecurringBillingRunById,
  getServiceBillingsForBillingRun,
  createRecurringBillings,
  approveServiceBillingsRunById,
  sapSendServiceBillingsRunById,
  sapSendServiceBillingsById,
  recalculateServiceBillingById,
  cancelServiceBillingById,
  deleteRecurringBillingById,
  removeServiceBillingRunZevById,
  getBillingRecurringZevs,
} from "./BillingsRecurring.Repository"
import {
  testConfig,
  pageStub,
  billingRecurringRunStub,
  serviceBillingStub,
  zevStub,
  serviceBillingUpsert,
} from "./BillingsRecurring.Stub"
import { StatusType } from "../../Domain.Model"
import { ServiceBillingActionState } from "./BillingsRecurring.Model"

const domainDependencies = testDomainDependencies()

test("getRecurringBillings", async () => {
  // given
  const adminServiceBillingsApiStub = sinon.createStubInstance(AdminServiceBillingsApi)
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminServiceBillingsApiStub.getAllAdminServiceBillingRuns.returns(
    ajaxSuccess({
      elements: [billingRecurringRunStub],
    }),
  )
  adminZevApiStub.adminGetZevs.withArgs(1, 10000, undefined).returns(
    ajaxSuccess({
      page: pageStub,
      elements: [zevStub],
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminServiceBillingsApi: adminServiceBillingsApiStub,
    adminZevApi: adminZevApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = getRecurringBillings(depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: {
      billingsRecurring: [
        {
          id: billingRecurringRunStub.id,
          statusType: StatusType[billingRecurringRunStub.currentState],
          sortableStatusType: billingRecurringRunStub.currentState.toString(),
          period: "01. Jul 2022 - 31. Dec 2022",
          sortablePeriod: parseISO(billingRecurringRunStub.startDate).getTime(),
          filterablePeriod: "2022-07-01 - 2022-12-31",
          zevs: [{ id: zevStub.id, name: zevStub.name }],
        },
      ],
    },
    type: "ok",
  })
})

test("getRecurringBillingRunById", async () => {
  // given
  const adminServiceBillingsApiStub = sinon.createStubInstance(AdminServiceBillingsApi)
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminServiceBillingsApiStub.getAdminServiceBillingRunById
    .withArgs(billingRecurringRunStub.id)
    .returns(ajaxSuccess(billingRecurringRunStub))
  adminServiceBillingsApiStub.getAdminServiceBillingById
    .withArgs(serviceBillingStub.id)
    .returns(ajaxSuccess(serviceBillingStub))
  adminZevApiStub.adminGetZevById.withArgs(zevStub.id).returns(ajaxSuccess(zevStub))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminServiceBillingsApi: adminServiceBillingsApiStub,
    adminZevApi: adminZevApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = getRecurringBillingRunById(billingRecurringRunStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: {
      id: billingRecurringRunStub.id,
      statusType: StatusType[billingRecurringRunStub.currentState],
      period: "01. Jul 2022 - 31. Dec 2022",
      zevIds: billingRecurringRunStub.zevIds,
      serviceBillings: [
        {
          id: serviceBillingStub.id,
          statusType: StatusType[serviceBillingStub.currentState],
          sortableStatusType: serviceBillingStub.currentState.toString(),
          period: "01. Jan 2022 - 30. Jun 2022",
          sortableAccountingStatus: serviceBillingStub.accountingStatus.toString(),
          sortablePeriod: parseISO(serviceBillingStub.startDate ?? "").getTime(),
          positions: [
            {
              id: "0",
              name: serviceBillingStub.positions[0].name,
              quantity: "54",
              sortableQuantity: 54,
              price: "CHF 5.50",
              sortablePrice: 5.5,
              finalAmountDue: "CHF 297.00",
              sortableFinalAmountDue: 297,
            },
          ],
          billingType: serviceBillingStub.billingType,
          zevId: zevStub.id,
          zevName: zevStub.name,
          totalAmountDue: "CHF 442.80",
          sortableTotalAmountDue: 442.8,
          accountingStatus: serviceBillingStub.accountingStatus,
          invoiceReferenceNumber: serviceBillingStub.invoiceReferenceNumber ?? "",
          orderReferenceNumber: serviceBillingStub.orderReferenceNumber ?? "",
          submissionError: serviceBillingStub.accountingErrorMessage,
        },
      ],
    },
    type: "ok",
  })
})

test("getServiceBillingsForBillingRun", async () => {
  // given
  const adminServiceBillingsApiStub = sinon.createStubInstance(AdminServiceBillingsApi)
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminServiceBillingsApiStub.getAdminServiceBillingById
    .withArgs(serviceBillingStub.id)
    .returns(ajaxSuccess(serviceBillingStub))
  adminZevApiStub.adminGetZevById.withArgs(zevStub.id).returns(ajaxSuccess(zevStub))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminServiceBillingsApi: adminServiceBillingsApiStub,
    adminZevApi: adminZevApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = getServiceBillingsForBillingRun(billingRecurringRunStub.serviceBillingIds, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual([
    {
      zevResponse: zevStub,
      serviceBillingAdminResponse: serviceBillingStub,
    },
  ])
})

test("createRecurringBillings", async () => {
  // given
  const adminServiceBillingsApiStub = sinon.createStubInstance(AdminServiceBillingsApi)
  adminServiceBillingsApiStub.createAdminServiceBillingRun
    .withArgs({
      zevIds: serviceBillingUpsert.selectedZevs,
      startDate: format(serviceBillingUpsert.startDate.getTime(), "yyyy-MM-dd", {
        locale: localeDateDE,
      }),
      endDate: format(serviceBillingUpsert.endDate.getTime(), "yyyy-MM-dd", {
        locale: localeDateDE,
      }),
    })
    .returns(ajaxSuccess("create-recurring-billing-url"))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminServiceBillingsApi: adminServiceBillingsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = createRecurringBillings(serviceBillingUpsert, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: "create-recurring-billing-url",
    type: "ok",
  })
})

test("approveServiceBillingsRunById", async () => {
  // given
  const adminServiceBillingsApiStub = sinon.createStubInstance(AdminServiceBillingsApi)
  adminServiceBillingsApiStub.approveAdminServiceBillingRunById.withArgs(billingRecurringRunStub.id).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminServiceBillingsApi: adminServiceBillingsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = approveServiceBillingsRunById(billingRecurringRunStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("sapSendServiceBillingsRunById", async () => {
  // given
  const adminServiceBillingsApiStub = sinon.createStubInstance(AdminServiceBillingsApi)
  adminServiceBillingsApiStub.sapSendAdminServiceBillingRunById.withArgs(billingRecurringRunStub.id).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminServiceBillingsApi: adminServiceBillingsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = sapSendServiceBillingsRunById(billingRecurringRunStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("sapSendServiceBillingsById", async () => {
  // given
  const adminServiceBillingsApiStub = sinon.createStubInstance(AdminServiceBillingsApi)
  adminServiceBillingsApiStub.sapSendAdminServiceBillingById.withArgs(serviceBillingStub.id).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminServiceBillingsApi: adminServiceBillingsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = sapSendServiceBillingsById(serviceBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("recalculateServiceBillingById", async () => {
  // given
  const adminServiceBillingsApiStub = sinon.createStubInstance(AdminServiceBillingsApi)
  adminServiceBillingsApiStub.recalculateAdminServiceBillingById.withArgs(serviceBillingStub.id).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminServiceBillingsApi: adminServiceBillingsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = recalculateServiceBillingById(serviceBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("cancelServiceBillingById", async () => {
  // given
  const adminServiceBillingsApiStub = sinon.createStubInstance(AdminServiceBillingsApi)
  adminServiceBillingsApiStub.putAdminServiceBillingStateChangeById
    .withArgs(serviceBillingStub.id, ServiceBillingActionState.CANCEL)
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminServiceBillingsApi: adminServiceBillingsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = cancelServiceBillingById(serviceBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("deleteRecurringBillingById", async () => {
  // given
  const adminServiceBillingsApiStub = sinon.createStubInstance(AdminServiceBillingsApi)
  adminServiceBillingsApiStub.deleteAdminServiceBillingRunById.withArgs(serviceBillingStub.id).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminServiceBillingsApi: adminServiceBillingsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = deleteRecurringBillingById(serviceBillingStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("removeServiceBillingRunZevById", async () => {
  // given
  const adminServiceBillingsApiStub = sinon.createStubInstance(AdminServiceBillingsApi)
  adminServiceBillingsApiStub.removeAdminServiceBillingRunZevById
    .withArgs(billingRecurringRunStub.id, zevStub.id)
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminServiceBillingsApi: adminServiceBillingsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = removeServiceBillingRunZevById(billingRecurringRunStub.id, zevStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("getBillingRecurringZevs", async () => {
  // given
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminZevApiStub.adminGetZevs.withArgs(1, 10000, undefined).returns(
    ajaxSuccess({
      page: pageStub,
      elements: [zevStub],
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
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = getBillingRecurringZevs(depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: [
      {
        id: zevStub.id,
        name: zevStub.name,
        zevStartDate: parseISO(zevStub.zevStartDate).getTime(),
        serviceEndDate: zevStub.serviceEndDate ? parseISO(zevStub.serviceEndDate).getTime() : -1,
      },
    ],
    type: "ok",
  })
})
