import { Observable, from, map, mergeMap, of, forkJoin } from "rxjs"
import { ZevIndividualParticipantBilling } from "../../../data/generated-sources/openapi"
import { apiHeaders, apiCall } from "../../Domain.Calls"
import { DomainDependencies } from "../../Domain.Dependencies"
import { DomainResponse } from "../../Domain.Response"
import {
  billingsIndividualParticipantDetailMapper,
  billingsIndividualParticipantFinaliseMapper,
  billingsIndividualParticipantMapper,
} from "./BillingsIndividualParticipant.Mapper"
import { BillingsIndividualParticipantList } from "./BillingsIndividualParticipant.Model"
import { BillingsParticipantDetail, BillingsParticipantFinalise } from "./BillingsParticipant.Model"
import { getParticipantBillingPowerParameter } from "./BillingsParticipantPowerParamters.Repository"

export const sendSapIndividualParticipantBillings = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  const authHeaders = apiHeaders(deps)
  return apiCall(
    from(
      deps.adminIndividualParticipantBillingApi.sapSendAdminIndividualParticipantBillingById(billingId, authHeaders),
    ).pipe(map(() => true)),
  )
}

export const getZevIndividualParticipantBillings = (
  zevId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<BillingsIndividualParticipantList>> => {
  const authHeaders = apiHeaders(deps)
  return apiCall(
    from(deps.adminZevApi.adminGetIndividualParticipantsBillingsZevById(zevId, authHeaders)).pipe(
      mergeMap((individualParticipantBilling) =>
        getIndividualParticipantBillingPowerParameters(
          individualParticipantBilling.data.elements,
          deps,
          authHeaders,
        ).pipe(
          map((billingsConsumptionPointParticipant) =>
            billingsIndividualParticipantMapper(billingsConsumptionPointParticipant, deps),
          ),
        ),
      ),
    ),
  )
}

const getIndividualParticipantBillingPowerParameters = (
  billings: ZevIndividualParticipantBilling[],
  deps: DomainDependencies,
  authHeaders: { headers: { Authorization: string } },
) => {
  if (billings.length === 0) return of([])
  return forkJoin(
    billings.map((billing) =>
      from(
        deps.adminConsumptionPointApi.adminGetConsumptionPointById(
          billing.powerMeterParameters.consumptionPointId,
          authHeaders,
        ),
      ).pipe(
        mergeMap((consumptionPoint) =>
          from(
            deps.adminConsumptionPointApi.getAdminParticipationById(
              billing.powerMeterParameters.consumptionPointId,
              billing.powerMeterParameters.participationId ?? "",
              authHeaders,
            ),
          ).pipe(
            mergeMap((participation) =>
              from(
                deps.adminParticipantsApi.adminGetParticipantById(participation.data.participantId ?? "", authHeaders),
              ).pipe(
                map((participant) => ({
                  billing: billing,
                  consumptionPoint: consumptionPoint.data,
                  participant: participant.data,
                })),
              ),
            ),
          ),
        ),
      ),
    ),
  )
}

export const getIndividualParticipantBillingDetail = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<BillingsParticipantDetail>> => {
  const authHeaders = apiHeaders(deps)
  return apiCall(
    from(
      deps.adminIndividualParticipantBillingApi.getAdminIndividualParticipantBillingDetailsById(billingId, authHeaders),
    ).pipe(
      mergeMap((billing) =>
        getParticipantBillingPowerParameter(billing.data.powerMeterParameters, deps, authHeaders).pipe(
          map((powerMeterParameter) =>
            billingsIndividualParticipantDetailMapper(billing.data, powerMeterParameter, deps),
          ),
        ),
      ),
    ),
  )
}

export const suspendIndividualParticipantBilling = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminIndividualParticipantBillingApi.putAdminIndividualParticipantBillingSuspendStateById(
        billingId,
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const unsuspendIndividualParticipantBilling = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminIndividualParticipantBillingApi.putAdminIndividualParticipantBillingUnSuspendStateById(
        billingId,
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const approveIndividualParticipantBilling = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminIndividualParticipantBillingApi.putAdminIndividualParticipantBillingApproveStateById(
        billingId,
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const getIndividualParticipantBillingFinalise = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<BillingsParticipantFinalise>> => {
  const authHeaders = apiHeaders(deps)
  return apiCall(
    from(
      deps.adminIndividualParticipantBillingApi.getAdminIndividualParticipantBillingDetailsById(billingId, authHeaders),
    ).pipe(
      mergeMap((billing) =>
        getParticipantBillingPowerParameter(billing.data.powerMeterParameters, deps, authHeaders).pipe(
          map((powerMeterParameter) =>
            billingsIndividualParticipantFinaliseMapper(billing.data, powerMeterParameter, deps),
          ),
        ),
      ),
    ),
  )
}

export const reopenIndividualParticipantBilling = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminIndividualParticipantBillingApi.putAdminIndividualParticipantBillingReopenStateById(
        billingId,
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}
