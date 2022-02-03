import { lastValueFrom } from "rxjs"
import * as sinon from "sinon"
import { AdminBillsApi } from "../../../data/generated-sources/openapi/api"
import { ajaxSuccess, testDomainDependencies } from "../../Domain.TestUtils"
import {
  downloadBillPdf,
  downloadAllParticipantBillPdf,
  downloadAllParticipantBillCsv,
  paidOrUnpaidBill,
} from "./Bill.Repository"

const domainDependencies = testDomainDependencies()
global.URL.createObjectURL = jest.fn()

test("downloadBillPdf", async () => {
  // given
  const adminBillsApiStub = sinon.createStubInstance(AdminBillsApi)
  adminBillsApiStub.getAdminBillPdf.withArgs("bill-1").returns(ajaxSuccess("any"))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminBillsApi: adminBillsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = downloadBillPdf("bill-1", depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("downloadAllParticipantBillPdf", async () => {
  // given
  const adminBillsApiStub = sinon.createStubInstance(AdminBillsApi)
  adminBillsApiStub.getAdminAllParticipantBillingPdfs.withArgs("bill-1").returns(ajaxSuccess("any"))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminBillsApi: adminBillsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = downloadAllParticipantBillPdf("bill-1", depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("downloadAllParticipantBillCsv", async () => {
  // given
  const adminBillsApiStub = sinon.createStubInstance(AdminBillsApi)
  adminBillsApiStub.getAdminAllParticipantBillingCsv.withArgs("bill-1").returns(ajaxSuccess("any"))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminBillsApi: adminBillsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = downloadAllParticipantBillCsv("bill-1", depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("paidOrUnpaidBill", async () => {
  // given
  const adminBillsApiStub = sinon.createStubInstance(AdminBillsApi)
  adminBillsApiStub.updateAdminBillPaidOrUnpaid.withArgs("bill-1", "paid").resolves()
  adminBillsApiStub.updateAdminBillPaidOrUnpaid.withArgs("bill-1", "unpaid").resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminBillsApi: adminBillsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result1 = paidOrUnpaidBill("bill-1", true, depsStub)
  const result2 = paidOrUnpaidBill("bill-1", false, depsStub)
  await expect(lastValueFrom(result1)).resolves.toEqual({
    result: true,
    type: "ok",
  })
  await expect(lastValueFrom(result2)).resolves.toEqual({
    result: false,
    type: "ok",
  })
})
