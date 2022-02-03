import { from, map, Observable } from "rxjs"
import { DomainResponse } from "../Domain.Response"
import { ServiceComponentsDetailItem, ServiceComponentsList } from "./ServiceComponents.Model"
import { apiCall, apiHeaders } from "../Domain.Calls"
import { DomainDependencies } from "../Domain.Dependencies"

export const getServiceComponents = (deps: DomainDependencies): Observable<DomainResponse<ServiceComponentsList>> =>
  apiCall(
    from(deps.adminProductsAndServicesApi.adminGetServiceComponents(apiHeaders(deps))).pipe(
      map((serviceComponentResponse) => ({
        serviceComponents: serviceComponentResponse.data.elements.map((serviceComponent) => ({
          id: serviceComponent.id,
          name: serviceComponent.name,
          feature: serviceComponent.feature,
        })),
      })),
    ),
  )

export const getServiceComponentById = (
  serviceComponentId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ServiceComponentsDetailItem>> =>
  apiCall(
    from(deps.adminProductsAndServicesApi.adminGetServiceComponentById(serviceComponentId, apiHeaders(deps))).pipe(
      map((serviceComponentResponse) => ({
        id: serviceComponentResponse.data.id,
        name: serviceComponentResponse.data.name,
        feature: serviceComponentResponse.data.feature,
      })),
    ),
  )

export const updateServiceComponent = (
  serviceComponentId: string,
  name: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> =>
  apiCall(
    from(
      deps.adminProductsAndServicesApi.adminPutServiceComponentById(
        serviceComponentId,
        { name: name },
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
