import { lastValueFrom } from "rxjs"
import * as sinon from "sinon"
import { parseISO } from "date-fns"
import { AdminProductsAndServicesApi } from "../../data/generated-sources/openapi"

import { ajaxSuccess, testDomainDependencies } from "../Domain.TestUtils"
import {
  createProduct,
  deletePriceComponent,
  deleteProduct,
  getProductPriceComponentUpdateById,
  getProducts,
  getProductUpdateById,
  updateProduct,
} from "./Products.Repository"
import {
  productUpsertStub,
  productAdminResponseStub,
  productStub,
  serviceComponentStub,
  testConfig,
} from "./Products.test.stubs"

const domainDependencies = testDomainDependencies()

test("getProducts() should return products ", async () => {
  // given
  const adminProductsAndServicesApiStub = sinon.createStubInstance(AdminProductsAndServicesApi)
  adminProductsAndServicesApiStub.adminGetProducts.returns(
    ajaxSuccess({
      elements: [productAdminResponseStub],
    }),
  )
  adminProductsAndServicesApiStub.adminGetServiceComponents.returns(
    ajaxSuccess({
      elements: [serviceComponentStub],
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const actual = getProducts({
    ...domainDependencies,
    adminProductsAndServicesApi: adminProductsAndServicesApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  // then
  await expect(lastValueFrom(actual)).resolves.toEqual({
    type: "ok",
    result: { productList: [productStub] },
  })
})

test("Create product", async () => {
  // given
  const adminProductsAndServicesApiStub = sinon.createStubInstance(AdminProductsAndServicesApi)
  adminProductsAndServicesApiStub.adminCreateProduct.withArgs(productUpsertStub).returns(ajaxSuccess("response-url"))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const actual = createProduct(productUpsertStub, {
    ...domainDependencies,
    adminProductsAndServicesApi: adminProductsAndServicesApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  // then
  await expect(lastValueFrom(actual)).resolves.toEqual({
    type: "ok",
    result: "response-url",
  })
})

test("Update product", async () => {
  // given
  const adminProductsAndServicesApiStub = sinon.createStubInstance(AdminProductsAndServicesApi)
  adminProductsAndServicesApiStub.adminUpdateProduct.withArgs(productStub.id, productUpsertStub).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const actual = updateProduct(productStub.id, productUpsertStub, {
    ...domainDependencies,
    adminProductsAndServicesApi: adminProductsAndServicesApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  await expect(lastValueFrom(actual)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})

test("Delete product", async () => {
  // given
  const adminProductsAndServicesApiStub = sinon.createStubInstance(AdminProductsAndServicesApi)
  adminProductsAndServicesApiStub.adminDeleteProduct.withArgs(productStub.id).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const actual = deleteProduct(productStub.id, {
    ...domainDependencies,
    adminProductsAndServicesApi: adminProductsAndServicesApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  // then
  await expect(lastValueFrom(actual)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})

test("Get Product PriceComponent Update ById", async () => {
  // given
  const adminProductsAndServicesApiStub = sinon.createStubInstance(AdminProductsAndServicesApi)
  adminProductsAndServicesApiStub.adminGetProductById
    .withArgs(productAdminResponseStub.id)
    .returns(ajaxSuccess(productAdminResponseStub))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const actual = getProductPriceComponentUpdateById(
    productAdminResponseStub.id,
    productAdminResponseStub.priceComponents[0].id,
    {
      ...domainDependencies,
      adminProductsAndServicesApi: adminProductsAndServicesApiStub,
      cookie: {
        ...domainDependencies.cookie,
        createCookieBearerToken: createCookieBearerToken,
        createCookieRefreshToken: createCookieRefreshToken,
      },
      config: testConfig,
    },
  )

  // then
  await expect(lastValueFrom(actual)).resolves.toEqual({
    type: "ok",
    result: {
      billingType: "MONTHLY_SPECIFIC_FEE_PER_CONSUMPTION_POINT",
      externalReferenceNumber: "555",
      name: "44",
      powermeterType: "HOUSEHOLD_POWERMETER",
      priceWithoutVat: "5.00",
      validFrom: parseISO(productAdminResponseStub.priceComponents[0].validFrom).getTime(),
      validUntil: productAdminResponseStub.priceComponents[0].validUntil
        ? parseISO(productAdminResponseStub.priceComponents[0].validUntil).getTime()
        : -1,
    },
  })
})

test("Get Price Component By Id", async () => {
  // given
  const adminProductsAndServicesApiStub = sinon.createStubInstance(AdminProductsAndServicesApi)
  adminProductsAndServicesApiStub.adminGetProductById
    .withArgs(productStub.id)
    .returns(ajaxSuccess(productAdminResponseStub))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const actual = getProductUpdateById(productStub.id, {
    ...domainDependencies,
    adminProductsAndServicesApi: adminProductsAndServicesApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  // then
  await expect(lastValueFrom(actual)).resolves.toEqual({
    type: "ok",
    result: productUpsertStub,
  })
})

test("Delete price component", async () => {
  // given
  const adminProductsAndServicesApiStub = sinon.createStubInstance(AdminProductsAndServicesApi)
  adminProductsAndServicesApiStub.adminDeletePricingComponent
    .withArgs(productAdminResponseStub.id, productAdminResponseStub.priceComponents[0].id)
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const actual = deletePriceComponent(productAdminResponseStub.id, productAdminResponseStub.priceComponents[0].id, {
    ...domainDependencies,
    adminProductsAndServicesApi: adminProductsAndServicesApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  // then
  await expect(lastValueFrom(actual)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})
