import { StatusType } from "../../Domain.Model"

export interface BillingsInitialList {
  billingsInitial: BillingsInitialListItem[]
}

export interface BillingsInitialListItem {
  id: string
  statusType: StatusType
  sortableStatusType: string
  billNumber: string
  date: string
  zevId: string
  zevName: string
}

export interface BillingsInitialDetail {
  name: string
  statusType: StatusType
  date: string
  type: string
  orderReferenceNumber: string
  invoiceReferenceNumber: string
  accountingStatus: string
  totalAmountDue: string
  zevName: string
  zevId: string
  positions: BillingsInitialPosition[]
}

export interface BillingsInitialPosition {
  id: number
  name: string
  quantity: string
  price: string
  totalAmountDue: string
  sortablePrice: number
  sortableTotalAmountDue: number
}
