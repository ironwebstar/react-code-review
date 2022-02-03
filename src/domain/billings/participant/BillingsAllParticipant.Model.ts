import { BillingStatusType } from "./BillingsParticipant.Model"

export interface BillingsAllParticipantList {
  billingsAll: BillingsAllParticipantListItem[]
}

export interface BillingsAllParticipantListItem {
  id: string
  period: string
  periodSortValue: number
  total: string
  billingState: BillingStatusType
  billingApprovalReady: boolean
}
