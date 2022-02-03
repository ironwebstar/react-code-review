import { Observable, from, mergeMap, map, forkJoin, of } from "rxjs"
import { apiHeaders, apiCall } from "../../Domain.Calls"
import { DomainDependencies } from "../../Domain.Dependencies"
import { DomainResponse } from "../../Domain.Response"
import { billingsRecurringListMapper, billingsRecurringMapper } from "./BillingsRecurring.Mapper"
import {
  BillingsRecurringDetail,
  BillingsRecurringList,
  BillingsRecurringUpsert,
  ServiceBillingActionState,
  BillingRecurringZevListItem,
} from "./BillingsRecurring.Model"
import { apiFormattedDateToTimestamp, timestampToApiFormattedDate } from "../../Domain.Formatters"
import { ServiceBillingAdminResponse, ZevAdminResponse, ZevState } from "../../../data/generated-sources/openapi"

export const getRecurringBillings = (deps: DomainDependencies): Observable<DomainResponse<BillingsRecurringList>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(deps.adminServiceBillingsApi.getAllAdminServiceBillingRuns(headers)).pipe(
      mergeMap((buildingsResponse) =>
        from(deps.adminZevApi.adminGetZevs(1, 10000, undefined, headers)).pipe(
          map((zevResponse) => billingsRecurringListMapper(buildingsResponse.data, zevResponse.data, deps)),
        ),
      ),
    ),
  )
}

export const getRecurringBillingRunById = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<BillingsRecurringDetail>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(deps.adminServiceBillingsApi.getAdminServiceBillingRunById(billingId, headers)).pipe(
      mergeMap((billingRunResponse) =>
        getServiceBillingsForBillingRun(billingRunResponse.data.serviceBillingIds, deps).pipe(
          map((values) => billingsRecurringMapper(billingRunResponse.data, values, deps)),
        ),
      ),
    ),
  )
}

export const getServiceBillingsForBillingRun = (
  serviceBillingIds: string[],
  deps: DomainDependencies,
): Observable<
  {
    zevResponse: ZevAdminResponse
    serviceBillingAdminResponse: ServiceBillingAdminResponse
  }[]
> => {
  if (serviceBillingIds.length === 0) return of([])
  return forkJoin(
    serviceBillingIds.map((serviceBillingId) =>
      from(deps.adminServiceBillingsApi.getAdminServiceBillingById(serviceBillingId, apiHeaders(deps))).pipe(
        mergeMap((serviceBillingAdminResponse) =>
          from(deps.adminZevApi.adminGetZevById(serviceBillingAdminResponse.data.zevId, apiHeaders(deps))).pipe(
            map((zevResponse) => ({
              zevResponse: zevResponse.data,
              serviceBillingAdminResponse: serviceBillingAdminResponse.data,
            })),
          ),
        ),
      ),
    ),
  )
}

export const createRecurringBillings = (
  recurringBillingUpsert: BillingsRecurringUpsert,
  deps: DomainDependencies,
): Observable<DomainResponse<string>> => {
  return apiCall(
    from(
      deps.adminServiceBillingsApi.createAdminServiceBillingRun(
        {
          zevIds: recurringBillingUpsert.selectedZevs,
          startDate: timestampToApiFormattedDate(recurringBillingUpsert.startDate.getTime(), deps),
          endDate: timestampToApiFormattedDate(recurringBillingUpsert.endDate.getTime(), deps),
        },
        apiHeaders(deps),
      ),
    ).pipe(map((url) => url.data.split("/").pop() ?? "")),
  )
}

export const approveServiceBillingsRunById = (
  billingRunId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminServiceBillingsApi.approveAdminServiceBillingRunById(billingRunId, apiHeaders(deps))).pipe(
      map(() => true),
    ),
  )
}

export const sapSendServiceBillingsRunById = (
  billingRunId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminServiceBillingsApi.sapSendAdminServiceBillingRunById(billingRunId, apiHeaders(deps))).pipe(
      map(() => true),
    ),
  )
}

export const sapSendServiceBillingsById = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminServiceBillingsApi.sapSendAdminServiceBillingById(billingId, apiHeaders(deps))).pipe(
      map(() => true),
    ),
  )
}

export const recalculateServiceBillingById = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminServiceBillingsApi.recalculateAdminServiceBillingById(billingId, apiHeaders(deps))).pipe(
      map(() => true),
    ),
  )
}

export const cancelServiceBillingById = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminServiceBillingsApi.putAdminServiceBillingStateChangeById(
        billingId,
        ServiceBillingActionState.CANCEL,
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const deleteRecurringBillingById = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminServiceBillingsApi.deleteAdminServiceBillingRunById(billingId, apiHeaders(deps))).pipe(
      map(() => true),
    ),
  )
}

export const removeServiceBillingRunZevById = (
  billingRunId: string,
  zevId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminServiceBillingsApi.removeAdminServiceBillingRunZevById(billingRunId, zevId, apiHeaders(deps))).pipe(
      map(() => true),
    ),
  )
}

export const getBillingRecurringZevs = (
  deps: DomainDependencies,
): Observable<DomainResponse<BillingRecurringZevListItem[]>> =>
  apiCall(
    from(deps.adminZevApi.adminGetZevs(1, 10000, undefined, apiHeaders(deps))).pipe(
      map((zevResponse) =>
        zevResponse.data.elements
          .filter((zev) => zev.currentState === ZevState.ACTIVE || zev.currentState === ZevState.INACTIVE)
          .map((zev) => ({
            id: zev.id,
            name: zev.name,
            zevStartDate: apiFormattedDateToTimestamp(zev.zevStartDate),
            serviceEndDate: apiFormattedDateToTimestamp(zev.serviceEndDate),
          })),
      ),
    ),
  )
