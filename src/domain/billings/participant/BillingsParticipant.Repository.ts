import { from, map, Observable } from "rxjs"
import { ZevServiceComponentFeaturesResponse } from "../../../data/generated-sources/openapi"
import { apiCall, apiHeaders } from "../../Domain.Calls"
import { DomainDependencies } from "../../Domain.Dependencies"
import { DomainResponse } from "../../Domain.Response"
import {
  approveAllParticipantBilling,
  getAllParticipantBillingDetail,
  getAllParticipantBillingFinalise,
  reopenAllParticipantBilling,
  suspendAllParticipantBilling,
  unsuspendAllParticipantBilling,
  sendSapAllParticipantBillings,
} from "./BillingsAllParticipant.Repository"
import {
  approveIndividualParticipantBilling,
  getIndividualParticipantBillingDetail,
  getIndividualParticipantBillingFinalise,
  reopenIndividualParticipantBilling,
  suspendIndividualParticipantBilling,
  unsuspendIndividualParticipantBilling,
  sendSapIndividualParticipantBillings,
} from "./BillingsIndividualParticipant.Repository"
import {
  BillingParticipantType,
  BillingsParticipantDetail,
  BillingsParticipantFinalise,
} from "./BillingsParticipant.Model"

export const sendSapParticipantBillings = (
  billingId: string,
  billingParticipantType: BillingParticipantType,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  switch (billingParticipantType) {
    case BillingParticipantType.ALL:
      return sendSapAllParticipantBillings(billingId, deps)
    case BillingParticipantType.INDIVIDUAL:
      return sendSapIndividualParticipantBillings(billingId, deps)
  }
}

export const getParticipantBillingDetail = (
  billingId: string,
  billingParticipantType: BillingParticipantType,
  deps: DomainDependencies,
): Observable<DomainResponse<BillingsParticipantDetail>> => {
  switch (billingParticipantType) {
    case BillingParticipantType.ALL:
      return getAllParticipantBillingDetail(billingId, deps)
    case BillingParticipantType.INDIVIDUAL:
      return getIndividualParticipantBillingDetail(billingId, deps)
  }
}

export const suspendParticipantBilling = (
  billingId: string,
  billingParticipantType: BillingParticipantType,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  switch (billingParticipantType) {
    case BillingParticipantType.ALL:
      return suspendAllParticipantBilling(billingId, deps)
    case BillingParticipantType.INDIVIDUAL:
      return suspendIndividualParticipantBilling(billingId, deps)
  }
}

export const unsuspendParticipantBilling = (
  billingId: string,
  billingParticipantType: BillingParticipantType,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  switch (billingParticipantType) {
    case BillingParticipantType.ALL:
      return unsuspendAllParticipantBilling(billingId, deps)
    case BillingParticipantType.INDIVIDUAL:
      return unsuspendIndividualParticipantBilling(billingId, deps)
  }
}

export const approveParticipantBilling = (
  billingId: string,
  billingParticipantType: BillingParticipantType,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  switch (billingParticipantType) {
    case BillingParticipantType.ALL:
      return approveAllParticipantBilling(billingId, deps)
    case BillingParticipantType.INDIVIDUAL:
      return approveIndividualParticipantBilling(billingId, deps)
  }
}

export const getParticipantBillingFinalise = (
  billingId: string,
  billingParticipantType: BillingParticipantType,
  deps: DomainDependencies,
): Observable<DomainResponse<BillingsParticipantFinalise>> => {
  switch (billingParticipantType) {
    case BillingParticipantType.ALL:
      return getAllParticipantBillingFinalise(billingId, deps)
    case BillingParticipantType.INDIVIDUAL:
      return getIndividualParticipantBillingFinalise(billingId, deps)
  }
}

export const reopenParticipantBilling = (
  billingId: string,
  billingParticipantType: BillingParticipantType,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  switch (billingParticipantType) {
    case BillingParticipantType.ALL:
      return reopenAllParticipantBilling(billingId, deps)
    case BillingParticipantType.INDIVIDUAL:
      return reopenIndividualParticipantBilling(billingId, deps)
  }
}

export const getZevServiceComponentFeatures = (
  zevId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ZevServiceComponentFeaturesResponse>> => {
  return apiCall(
    from(deps.adminZevApi.adminGetZevServiceComponentFeatures(zevId, apiHeaders(deps))).pipe(
      map((componentFeaturesData) => componentFeaturesData.data),
    ),
  )
}
