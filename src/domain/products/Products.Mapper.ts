import {
  MultiProductAdminResponse,
  MultiServiceComponentAdminResponse,
  PriceComponent,
  ProductAdminResponse,
} from "../../data/generated-sources/openapi"
import { DomainDependencies } from "../Domain.Dependencies"
import { apiFormattedDateToTimestamp, appFormattedDate } from "../Domain.Formatters"
import {
  BillingType,
  draftProductPriceComponentUpsert,
  PowerMeterType,
  ProductDetail,
  ProductList,
  ProductPriceComponent,
  ProductPriceComponentUpsert,
} from "./Products.Model"

export const productsMapper = (
  products: MultiProductAdminResponse,
  serviceComponents: MultiServiceComponentAdminResponse,
): ProductList => {
  return {
    productList: products.elements.map((product) => {
      const productServiceComponents = serviceComponents.elements.filter((serviceComponent) =>
        product.serviceComponents.includes(serviceComponent.id),
      )
      return {
        id: product.id,
        name: product.name,
        serviceComponents: productServiceComponents.map((serviceComponent) => ({
          id: serviceComponent.id,
          name: serviceComponent.name,
          feature: serviceComponent.feature,
        })),
      }
    }),
  }
}

export const productDetailMapper = (
  productResponse: ProductAdminResponse,
  serviceComponentsResponse: {
    id: string
    name: string
    feature: string
  }[],
  deps: DomainDependencies,
): ProductDetail => {
  return {
    id: productResponse.id,
    name: productResponse.name,
    serviceComponents: serviceComponentsResponse,
    priceComponents: productResponse.priceComponents.map((priceComponent) =>
      priceComponentMapper(priceComponent, deps),
    ),
  }
}

export const priceComponentUpsertMapper = (
  productResponse: ProductAdminResponse,
  priceId: string,
): ProductPriceComponentUpsert => {
  const priceComponent = productResponse.priceComponents.find((priceComponent) => priceComponent.id === priceId)
  if (!priceComponent) return draftProductPriceComponentUpsert
  return {
    name: priceComponent.name,
    externalReferenceNumber: priceComponent.externalReferenceNumber,
    billingType: BillingType[priceComponent.billingType],
    powermeterType: priceComponent.powermeterType ? PowerMeterType[priceComponent.powermeterType] : undefined,
    priceWithoutVat: priceComponent.priceWithoutVat,
    validFrom: apiFormattedDateToTimestamp(priceComponent.validFrom),
    validUntil: apiFormattedDateToTimestamp(priceComponent.validUntil),
  }
}

export const priceComponentMapper = (
  priceComponent: PriceComponent,
  deps: DomainDependencies,
): ProductPriceComponent => {
  return {
    id: priceComponent.id,
    name: priceComponent.name,
    billingType: BillingType[priceComponent.billingType],
    powermeterType: priceComponent.powermeterType ? PowerMeterType[priceComponent.powermeterType] : undefined,
    priceWithoutVat: priceComponent.priceWithoutVat,
    validFrom: appFormattedDate(priceComponent.validFrom, deps),
    validUntil: appFormattedDate(priceComponent.validUntil, deps),
    externalReferenceNumber: priceComponent.externalReferenceNumber,
  }
}
