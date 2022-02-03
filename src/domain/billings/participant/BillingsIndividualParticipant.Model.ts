import { BillingStatusType } from "./BillingsParticipant.Model"

export interface BillingsIndividualParticipantList {
  billingsIndividual: BillingsIndividualParticipantListItem[]
}

export interface BillingsIndividualParticipantListItem {
  id: string
  period: string
  periodSortValue: number
  consumptionPoint: string
  participant: string
  billingState: BillingStatusType
  billingApprovalReady: boolean
}
