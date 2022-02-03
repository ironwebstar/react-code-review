import localeDateDE from "date-fns/locale/de"
import { lastValueFrom } from "rxjs"
import * as sinon from "sinon"
import { format, parseISO } from "date-fns"
import { AdminContractsApi, AdminZevApi, AdminProductsAndServicesApi } from "../../data/generated-sources/openapi/api"
import { ajaxSuccess, testDomainDependencies } from "../Domain.TestUtils"
import {
  getAllContracts,
  getContractById,
  replaceContract,
  approveContract,
  deleteContract,
  getContractsByZevId,
  getContractUpdateById,
  updateContract,
} from "./Contracts.Repository"
import { testConfig, pageStub, contractStub, zevStub, productStub, contractUpsert } from "./Contracts.Stub"
import { StatusType } from "../Domain.Model"
import { apiFormattedDateToTimestamp } from "../Domain.Formatters"

const domainDependencies = testDomainDependencies()

test("getAllContracts", async () => {
  // given
  const adminContractsApiStub = sinon.createStubInstance(AdminContractsApi)
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  const adminProductsAndServicesApiStub = sinon.createStubInstance(AdminProductsAndServicesApi)
  adminContractsApiStub.adminGetContracts.withArgs(1, 10000, undefined).returns(
    ajaxSuccess({
      page: pageStub,
      elements: [contractStub],
    }),
  )
  adminZevApiStub.adminGetZevs.withArgs(1, 10000, undefined).returns(
    ajaxSuccess({
      page: pageStub,
      elements: [zevStub],
    }),
  )
  adminProductsAndServicesApiStub.adminGetProducts.returns(
    ajaxSuccess({
      elements: [productStub],
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminContractsApi: adminContractsApiStub,
    adminZevApi: adminZevApiStub,
    adminProductsAndServicesApi: adminProductsAndServicesApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result1 = getAllContracts(depsStub)
  await expect(lastValueFrom(result1)).resolves.toEqual({
    result: {
      contracts: [
        {
          id: contractStub.id,
          statusType: StatusType[contractStub.currentState],
          startDate: "01. Aug 2022",
          sortableStartDate: parseISO(contractStub.startDate).getTime(),
          endDate: "01. Dec 2022",
          sortableEndDate: parseISO(contractStub.endDate ?? "").getTime(),
          productId: productStub.id,
          productName: productStub.name,
          zevId: zevStub.id,
          zevName: zevStub.name,
          predecessorContractId: contractStub.predecessorContractId,
        },
      ],
    },
    type: "ok",
  })
})

test("getContractById", async () => {
  // given
  const adminContractsApiStub = sinon.createStubInstance(AdminContractsApi)
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  const adminProductsAndServicesApiStub = sinon.createStubInstance(AdminProductsAndServicesApi)
  adminContractsApiStub.adminGetContractById.withArgs(contractStub.id).returns(ajaxSuccess(contractStub))
  adminZevApiStub.adminGetZevs.withArgs(1, 10000, undefined).returns(
    ajaxSuccess({
      page: pageStub,
      elements: [zevStub],
    }),
  )
  adminProductsAndServicesApiStub.adminGetProducts.returns(
    ajaxSuccess({
      elements: [productStub],
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminContractsApi: adminContractsApiStub,
    adminZevApi: adminZevApiStub,
    adminProductsAndServicesApi: adminProductsAndServicesApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = getContractById(contractStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: {
      id: contractStub.id,
      contractStatus: StatusType[contractStub.currentState],
      startDate: "01. Aug 2022",
      startDateValue: apiFormattedDateToTimestamp(contractStub.startDate),
      endDate: "01. Dec 2022",
      endDateValue: apiFormattedDateToTimestamp(contractStub.endDate),
      productId: productStub.id,
      productName: productStub.name,
      zevId: zevStub.id,
      zevName: zevStub.name,
      availableProducts: [productStub].map((product) => ({ id: product.id, name: product.name })),
    },
    type: "ok",
  })
})

test("replaceContract", async () => {
  // given
  const adminContractsApiStub = sinon.createStubInstance(AdminContractsApi)
  adminContractsApiStub.adminReplaceContractById
    .withArgs(contractStub.id, {
      productId: productStub.id,
      endDate: format(1642360494, "yyyy-MM-dd", {
        locale: localeDateDE,
      }),
    })
    .returns(ajaxSuccess("replace-contract-url"))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminContractsApi: adminContractsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = replaceContract(contractStub.id, productStub.id, 1642360494, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: "replace-contract-url",
    type: "ok",
  })
})

test("approveContract", async () => {
  // given
  const adminContractsApiStub = sinon.createStubInstance(AdminContractsApi)
  adminContractsApiStub.adminApproveContractById.withArgs(contractStub.id, false, false).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminContractsApi: adminContractsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = approveContract(contractStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("deleteContract", async () => {
  // given
  const adminContractsApiStub = sinon.createStubInstance(AdminContractsApi)
  adminContractsApiStub.adminDeleteContractById.withArgs(contractStub.id).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminContractsApi: adminContractsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = deleteContract(contractStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})

test("getContractsByZevId", async () => {
  // given
  const adminContractsApiStub = sinon.createStubInstance(AdminContractsApi)
  const adminProductsAndServicesApiStub = sinon.createStubInstance(AdminProductsAndServicesApi)
  adminContractsApiStub.adminGetContracts.withArgs(1, 10000, undefined).returns(
    ajaxSuccess({
      page: pageStub,
      elements: [contractStub],
    }),
  )
  adminProductsAndServicesApiStub.adminGetProducts.returns(
    ajaxSuccess({
      elements: [productStub],
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminContractsApi: adminContractsApiStub,
    adminProductsAndServicesApi: adminProductsAndServicesApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = getContractsByZevId(zevStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: {
      contracts: [
        {
          id: contractStub.id,
          statusType: StatusType[contractStub.currentState],
          startDate: "01. Aug 2022",
          endDate: "01. Dec 2022",
          productName: productStub.name,
          contractNumber: contractStub.id,
        },
      ],
    },
    type: "ok",
  })
})

test("getContractUpdateById", async () => {
  // given
  const adminContractsApiStub = sinon.createStubInstance(AdminContractsApi)
  const adminProductsAndServicesApiStub = sinon.createStubInstance(AdminProductsAndServicesApi)
  adminContractsApiStub.adminGetContractById.withArgs(contractStub.id).returns(ajaxSuccess(contractStub))
  adminProductsAndServicesApiStub.adminGetProducts.returns(
    ajaxSuccess({
      elements: [productStub],
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminContractsApi: adminContractsApiStub,
    adminProductsAndServicesApi: adminProductsAndServicesApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = getContractUpdateById(contractStub.id, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: {
      statusType: StatusType[contractStub.currentState],
      startDate: parseISO(contractStub.startDate).getTime(),
      endDate: parseISO(contractStub.endDate ?? "").getTime(),
      productId: contractStub.productId,
      products: [productStub].map((product) => ({
        id: product.id,
        name: product.name,
      })),
    },
    type: "ok",
  })
})

test("updateContract", async () => {
  // given
  const adminContractsApiStub = sinon.createStubInstance(AdminContractsApi)
  adminContractsApiStub.adminUpdateContractById
    .withArgs(contractStub.id, {
      startDate: format(1659301200, "yyyy-MM-dd", {
        locale: localeDateDE,
      }),
      endDate: format(1669842000, "yyyy-MM-dd", {
        locale: localeDateDE,
      }),
      productId: contractUpsert.productId,
    })
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminContractsApi: adminContractsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = updateContract(contractStub.id, contractUpsert, depsStub)
  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})
