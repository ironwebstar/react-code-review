import { lastValueFrom } from "rxjs"
import * as sinon from "sinon"
import { AdminProductsAndServicesApi } from "../../data/generated-sources/openapi/api"

import { ajaxSuccess, testDomainDependencies } from "../Domain.TestUtils"
import { getServiceComponents, getServiceComponentById, updateServiceComponent } from "./ServiceComponents.Repository"
import { testConfig, serviceComponentStub } from "./ServiceComponents.Stub"

const domainDependencies = testDomainDependencies()

test("Get service components", async () => {
  // given
  const adminProductsAndServicesApiStub = sinon.createStubInstance(AdminProductsAndServicesApi)
  adminProductsAndServicesApiStub.adminGetServiceComponents.returns(
    ajaxSuccess({
      elements: [serviceComponentStub],
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const result = getServiceComponents({
    ...domainDependencies,
    adminProductsAndServicesApi: adminProductsAndServicesApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: { serviceComponents: [serviceComponentStub] },
  })
})

test("Get service component by Id", async () => {
  // given
  const adminProductsAndServicesApiStub = sinon.createStubInstance(AdminProductsAndServicesApi)
  adminProductsAndServicesApiStub.adminGetServiceComponentById
    .withArgs(serviceComponentStub.id)
    .returns(ajaxSuccess(serviceComponentStub))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const result = getServiceComponentById(serviceComponentStub.id, {
    ...domainDependencies,
    adminProductsAndServicesApi: adminProductsAndServicesApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: serviceComponentStub,
  })
})

test("Update service component", async () => {
  // given
  const adminProductsAndServicesApiStub = sinon.createStubInstance(AdminProductsAndServicesApi)
  adminProductsAndServicesApiStub.adminPutServiceComponentById
    .withArgs(serviceComponentStub.id, { name: "Edited Name" })
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const result = updateServiceComponent(serviceComponentStub.id, "Edited Name", {
    ...domainDependencies,
    adminProductsAndServicesApi: adminProductsAndServicesApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})
