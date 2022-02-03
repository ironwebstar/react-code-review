import { testDomainDependencies } from "../Domain.TestUtils"
import { productAdminResponseStub, serviceComponentsStub, testConfig } from "./Products.test.stubs"
import { priceComponentUpsertMapper, productDetailMapper, productsMapper } from "./Products.Mapper"
import { BillingType } from "./Products.Model"
import { apiFormattedDateToTimestamp } from "../Domain.Formatters"
import { PowerMeterType } from "../../data/generated-sources/openapi"

const domainDependencies = testDomainDependencies()
const depsStub = {
  ...domainDependencies,
  config: testConfig,
}

test("productMapper should return a ProductList collection", async () => {
  const actual = productsMapper(
    {
      elements: [productAdminResponseStub],
    },
    {
      elements: [serviceComponentsStub],
    },
  )

  expect(actual).toEqual({
    productList: [
      {
        id: "5d363bfd-6010-4591-bc6d-846bd4163f6f",
        name: "product",
        serviceComponents: [],
      },
    ],
  })
})

test.skip("productDetailMapper should return a ProductDetail obj", async () => {
  const actual = productDetailMapper(
    productAdminResponseStub,
    [
      {
        id: serviceComponentsStub.id,
        name: serviceComponentsStub.name,
        feature: serviceComponentsStub.feature,
      },
    ],
    depsStub,
  )

  expect(actual).toEqual({
    id: "productId",
    name: "Some product",
    serviceComponents: productAdminResponseStub.serviceComponents,
    priceComponents: productAdminResponseStub.priceComponents,
  })
})

test("priceComponentUpsertMapper should return a ProductPriceComponentUpsert obj, if found", async () => {
  const actual = priceComponentUpsertMapper(productAdminResponseStub, "1b9eca6d-570b-4248-a6ef-53f47876f76f")

  expect(actual).toEqual({
    name: productAdminResponseStub.priceComponents[0].name,
    externalReferenceNumber: productAdminResponseStub.priceComponents[0].externalReferenceNumber,
    billingType: BillingType[productAdminResponseStub.priceComponents[0].billingType],
    powermeterType: PowerMeterType.HOUSEHOLD_POWERMETER,
    priceWithoutVat: productAdminResponseStub.priceComponents[0].priceWithoutVat,
    validFrom: apiFormattedDateToTimestamp(productAdminResponseStub.priceComponents[0].validFrom),
    validUntil: apiFormattedDateToTimestamp(productAdminResponseStub.priceComponents[0].validUntil),
  })
})

test("priceComponentUpsertMapper should return a draftProductPriceComponentUpsert obj, when not found", async () => {
  const actual = priceComponentUpsertMapper(productAdminResponseStub, "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx")

  expect(actual).toEqual({
    name: "",
    externalReferenceNumber: "",
    billingType: BillingType.MONTHLY_FEE,
    priceWithoutVat: "",
    validFrom: -1,
    validUntil: -1,
  })
})
