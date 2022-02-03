import { DomainDependencies } from "../../Domain.Dependencies"
import { from, map, mergeMap, Observable } from "rxjs"
import { DomainResponse } from "../../Domain.Response"
import { apiCall, apiHeaders } from "../../Domain.Calls"
import { BillingsInitialDetail, BillingsInitialList } from "./BillingsInitial.Model"
import { billingsInitialListMapper, billingsInitialMapper } from "./BillingsInitial.Mapper"

export const getInitialBillings = (deps: DomainDependencies): Observable<DomainResponse<BillingsInitialList>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(deps.adminServiceBillingsApi.getAdminServiceBillings(headers)).pipe(
      mergeMap((billingResponse) =>
        from(deps.adminZevApi.adminGetZevs(1, 10000, undefined, headers)).pipe(
          map((zevResponse) => billingsInitialListMapper(billingResponse.data, zevResponse.data, deps)),
        ),
      ),
    ),
  )
}

export const getInitialBillingById = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<BillingsInitialDetail>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(deps.adminServiceBillingsApi.getAdminServiceBillingById(billingId, headers)).pipe(
      mergeMap((billingResponse) =>
        from(deps.adminZevApi.adminGetZevById(billingResponse.data.zevId, headers)).pipe(
          map((zevResponse) => billingsInitialMapper(billingResponse.data, zevResponse.data, deps)),
        ),
      ),
    ),
  )
}

export const recalculateInitialBillingById = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminServiceBillingsApi.recalculateAdminServiceBillingById(billingId, apiHeaders(deps))).pipe(
      map(() => true),
    ),
  )
}

export const approveInitialBillingById = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminServiceBillingsApi.putAdminServiceBillingStateChangeById(billingId, "approve", apiHeaders(deps)),
    ).pipe(map(() => true)),
  )
}

export const cancelInitialBillingById = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminServiceBillingsApi.putAdminServiceBillingStateChangeById(billingId, "cancel", apiHeaders(deps)),
    ).pipe(map(() => true)),
  )
}

export const submitInitialBillingToSAP = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminServiceBillingsApi.sapSendAdminServiceBillingById(billingId, apiHeaders(deps))).pipe(
      map(() => true),
    ),
  )
}

export const deleteInitialBillingById = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminServiceBillingsApi.deleteAdminServiceBillingById(billingId, apiHeaders(deps))).pipe(map(() => true)),
  )
}
