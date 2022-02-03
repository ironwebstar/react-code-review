import { Observable, from, map, mergeMap } from "rxjs"
import { apiHeaders, apiCall } from "../../Domain.Calls"
import { DomainDependencies } from "../../Domain.Dependencies"
import { DomainResponse } from "../../Domain.Response"
import { setPricesUpsertMapper } from "../../prices/Prices.Mapper"
import { PricePackageUpsert } from "../../prices/Prices.Model"
import {
  billingsAllParticipantDetailMapper,
  billingsAllParticipantFinaliseMapper,
  billingsAllParticipantListMapper,
} from "./BillingsAllParticipant.Mapper"
import { BillingsAllParticipantList } from "./BillingsAllParticipant.Model"
import { BillingsParticipantDetail, BillingsParticipantFinalise } from "./BillingsParticipant.Model"
import { getParticipantBillingPowerParameters } from "./BillingsParticipantPowerParamters.Repository"

export const sendSapAllParticipantBillings = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  const authHeaders = apiHeaders(deps)
  return apiCall(
    from(deps.adminAllParticipantBillingApi.sapSendAdminAllParticipantBillingById(billingId, authHeaders)).pipe(
      map(() => true),
    ),
  )
}

export const getZevAllParticipantBillings = (
  zevId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<BillingsAllParticipantList>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(deps.adminZevApi.adminGetAllParticipantsBillingsZevById(zevId, headers)).pipe(
      map((allParticipantBilling) => billingsAllParticipantListMapper(allParticipantBilling.data, deps)),
    ),
  )
}

export const getAllParticipantBillingDetail = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<BillingsParticipantDetail>> => {
  const authHeaders = apiHeaders(deps)
  return apiCall(
    from(deps.adminAllParticipantBillingApi.getAdminAllParticipantBillingDetailsById(billingId, authHeaders)).pipe(
      mergeMap((billing) =>
        getParticipantBillingPowerParameters(billing.data.powerMeterParameters, deps, authHeaders).pipe(
          map((powerMeterParameters) => billingsAllParticipantDetailMapper(billing.data, powerMeterParameters, deps)),
        ),
      ),
    ),
  )
}

export const updateAllParticipantBillingPrices = (
  billingId: string,
  prices: PricePackageUpsert,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(
      deps.adminAllParticipantBillingApi.updateAdminAllParticipantBillingPricesById(
        billingId,
        {
          pricePackages: setPricesUpsertMapper(prices),
        },
        headers,
      ),
    ).pipe(map(() => true)),
  )
}

export const suspendAllParticipantBilling = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminAllParticipantBillingApi.putAdminAllParticipantBillingSuspendStateById(billingId, apiHeaders(deps)),
    ).pipe(map(() => true)),
  )
}

export const unsuspendAllParticipantBilling = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminAllParticipantBillingApi.putAdminAllParticipantBillingUnSuspendStateById(billingId, apiHeaders(deps)),
    ).pipe(map(() => true)),
  )
}

export const approveAllParticipantBilling = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminAllParticipantBillingApi.putAdminAllParticipantBillingApproveStateById(billingId, apiHeaders(deps)),
    ).pipe(map(() => true)),
  )
}

export const getAllParticipantBillingFinalise = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<BillingsParticipantFinalise>> => {
  const authHeaders = apiHeaders(deps)
  return apiCall(
    from(deps.adminAllParticipantBillingApi.getAdminAllParticipantBillingDetailsById(billingId, authHeaders)).pipe(
      mergeMap((billing) =>
        getParticipantBillingPowerParameters(billing.data.powerMeterParameters, deps, authHeaders).pipe(
          map((powerMeterParameters) => billingsAllParticipantFinaliseMapper(billing.data, powerMeterParameters, deps)),
        ),
      ),
    ),
  )
}

export const reopenAllParticipantBilling = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminAllParticipantBillingApi.putAdminAllParticipantBillingReopenStateById(billingId, apiHeaders(deps)),
    ).pipe(map(() => true)),
  )
}
