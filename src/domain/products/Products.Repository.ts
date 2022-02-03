import { forkJoin, from, Observable, of } from "rxjs"
import { map, mergeMap } from "rxjs/operators"
import { apiCall, apiHeaders } from "../Domain.Calls"
import { DomainDependencies } from "../Domain.Dependencies"
import { DomainResponse } from "../Domain.Response"
import { ProductDetail, ProductList, ProductPriceComponentUpsert, ProductUpsert } from "./Products.Model"
import { priceComponentUpsertMapper, productDetailMapper, productsMapper } from "./Products.Mapper"
import { timestampToApiFormattedDate } from "../Domain.Formatters"
import { santiseEmptyValues } from "../Domain.Mapper"
import { ORDERED_STRING_COMPARATOR } from "../Domain.Comparators"

export const getProducts = (deps: DomainDependencies): Observable<DomainResponse<ProductList>> => {
  return apiCall(
    from(deps.adminProductsAndServicesApi.adminGetProducts(apiHeaders(deps))).pipe(
      mergeMap((productListResponse) =>
        from(deps.adminProductsAndServicesApi.adminGetServiceComponents(apiHeaders(deps))).pipe(
          map((serviceComponentsResponse) => productsMapper(productListResponse.data, serviceComponentsResponse.data)),
        ),
      ),
    ),
  )
}

export const getProductById = (
  productId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ProductDetail>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(deps.adminProductsAndServicesApi.adminGetProductById(productId, headers)).pipe(
      mergeMap((productResponse) =>
        getServiceComponentsForProductId(productResponse.data.serviceComponents, deps).pipe(
          map((values) => productDetailMapper(productResponse.data, values, deps)),
        ),
      ),
    ),
  )
}

export const getServiceComponentsForProductId = (serviceComponents: string[], deps: DomainDependencies) => {
  if (serviceComponents.length === 0) return of([])
  return forkJoin(
    serviceComponents.map((serviceId) =>
      from(deps.adminProductsAndServicesApi.adminGetServiceComponentById(serviceId, apiHeaders(deps))).pipe(
        map((serviceComponentResponse) => ({
          name: serviceComponentResponse.data.name,
          id: serviceComponentResponse.data.id,
          feature: serviceComponentResponse.data.feature,
        })),
      ),
    ),
  )
}

export const createProduct = (
  productCreate: ProductUpsert,
  deps: DomainDependencies,
): Observable<DomainResponse<string>> => {
  return apiCall(
    from(
      deps.adminProductsAndServicesApi.adminCreateProduct(
        {
          name: productCreate.name,
          serviceComponents: productCreate.serviceComponents,
        },
        apiHeaders(deps),
      ),
    ).pipe(map((url) => url.data.split("/").pop() ?? "")),
  )
}

export const updateProduct = (
  productId: string,
  productUpdate: ProductUpsert,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminProductsAndServicesApi.adminUpdateProduct(
        productId,
        {
          name: productUpdate.name,
          serviceComponents: productUpdate.serviceComponents,
        },
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const createPriceComponent = (
  productId: string,
  priceComponent: ProductPriceComponentUpsert,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminProductsAndServicesApi.adminCreateAndLinkPricingComponent(
        productId,
        {
          name: priceComponent.name,
          billingType: priceComponent.billingType,
          powermeterType: priceComponent.powermeterType,
          priceWithoutVat: priceComponent.priceWithoutVat,
          validFrom: timestampToApiFormattedDate(priceComponent.validFrom, deps),
          validUntil: timestampToApiFormattedDate(priceComponent.validUntil, deps),
          externalReferenceNumber: priceComponent.externalReferenceNumber,
        },
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const getProductUpdateById = (
  productId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ProductUpsert>> => {
  return apiCall(
    from(deps.adminProductsAndServicesApi.adminGetProductById(productId, apiHeaders(deps))).pipe(
      map((product) => ({
        name: product.data.name,
        serviceComponents: product.data.serviceComponents.sort((a, b) => ORDERED_STRING_COMPARATOR(a, b, "asc")),
      })),
    ),
  )
}

export const deleteProduct = (productId: string, deps: DomainDependencies): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminProductsAndServicesApi.adminDeleteProduct(productId, apiHeaders(deps))).pipe(map(() => true)),
  )
}

export const getProductPriceComponentUpdateById = (
  productId: string,
  priceId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ProductPriceComponentUpsert>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(deps.adminProductsAndServicesApi.adminGetProductById(productId, headers)).pipe(
      map((productResponse) => priceComponentUpsertMapper(productResponse.data, priceId)),
    ),
  )
}

export const updatePriceComponent = (
  productId: string,
  priceId: string,
  updatePriceComponent: ProductPriceComponentUpsert,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminProductsAndServicesApi.adminUpdatePricingComponent(
        productId,
        priceId,
        santiseEmptyValues({
          name: updatePriceComponent.name,
          billingType: updatePriceComponent.billingType,
          powermeterType: updatePriceComponent.powermeterType,
          priceWithoutVat: updatePriceComponent.priceWithoutVat,
          validFrom: timestampToApiFormattedDate(updatePriceComponent.validFrom, deps),
          validUntil: timestampToApiFormattedDate(updatePriceComponent.validUntil, deps),
          externalReferenceNumber: updatePriceComponent.externalReferenceNumber,
        }),
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const deletePriceComponent = (
  productId: string,
  priceId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminProductsAndServicesApi.adminDeletePricingComponent(productId, priceId, apiHeaders(deps))).pipe(
      map(() => true),
    ),
  )
}
