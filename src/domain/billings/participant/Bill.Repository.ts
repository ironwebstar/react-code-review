import { Observable, from, map } from "rxjs"
import { apiCall, apiHeaders, fileAttachmentDownload, fileAttachmentName } from "../../Domain.Calls"
import { DomainDependencies } from "../../Domain.Dependencies"
import { DomainResponse } from "../../Domain.Response"

export const downloadBillPdf = (billId: string, deps: DomainDependencies): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminBillsApi.getAdminBillPdf(billId, apiHeaders(deps))).pipe(
      map((pdf) => {
        fileAttachmentDownload(fileAttachmentName(pdf.headers), new Blob([pdf.data]))
        return true
      }),
    ),
  )
}

export const downloadAllParticipantBillPdf = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminBillsApi.getAdminAllParticipantBillingPdfs(billingId, apiHeaders(deps))).pipe(
      map((pdf) => {
        fileAttachmentDownload(fileAttachmentName(pdf.headers), new Blob([pdf.data]))
        return true
      }),
    ),
  )
}

export const downloadAllParticipantBillCsv = (
  billingId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminBillsApi.getAdminAllParticipantBillingCsv(billingId, apiHeaders(deps))).pipe(
      map((csv) => {
        fileAttachmentDownload(fileAttachmentName(csv.headers), new Blob([csv.data]))
        return true
      }),
    ),
  )
}

export const paidOrUnpaidBill = (
  billId: string,
  paid: boolean,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  switch (paid) {
    case true:
      return paidBill(billId, deps)
    case false:
      return unpaidBill(billId, deps)
  }
}

const paidBill = (billId: string, deps: DomainDependencies): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminBillsApi.updateAdminBillPaidOrUnpaid(billId, "paid", apiHeaders(deps))).pipe(map(() => true)),
  )
}

const unpaidBill = (billId: string, deps: DomainDependencies): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminBillsApi.updateAdminBillPaidOrUnpaid(billId, "unpaid", apiHeaders(deps))).pipe(map(() => false)),
  )
}
