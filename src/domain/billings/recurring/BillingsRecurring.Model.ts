import { StatusType } from "../../Domain.Model"

export enum ServiceBillingActionState {
  APPROVE = "approve",
  CANCEL = "cancel",
  DELETE = "delete",
}

export enum AccountingStatus {
  CREATED = "CREATED",
  UNAVAILABLE = "UNAVAILABLE",
  ERROR = "ERROR",
}

export enum ServiceBillingState {
  DRAFT = "DRAFT",
  APPROVED = "APPROVED",
  CANCELLED = "CANCELLED",
}

export interface BillingsRecurringList {
  billingsRecurring: BillingsRecurringListItem[]
}

export interface BillingsRecurringListItem {
  id: string
  statusType: StatusType
  sortableStatusType: string
  period: string
  filterablePeriod: string
  sortablePeriod: number
  zevs: {
    id: string
    name: string
  }[]
}

export interface BillingsRecurringDetail {
  id: string
  statusType: StatusType
  period: string
  serviceBillings: ServiceBilling[]
  zevIds: string[]
}

export interface ServiceBilling {
  id: string
  statusType: StatusType
  sortableStatusType: string
  period: string
  sortablePeriod: number
  positions: BillingPosition[]
  billingType: string
  zevId: string
  zevName: string
  totalAmountDue: string
  sortableTotalAmountDue: number
  accountingStatus: AccountingStatus
  sortableAccountingStatus: string
  invoiceReferenceNumber: string
  orderReferenceNumber: string
  submissionError?: string
}

export interface BillingPosition {
  id: string
  name: string
  price: string
  sortablePrice: number
  quantity: string
  sortableQuantity: number
  finalAmountDue: string
  sortableFinalAmountDue: number
}

export interface BillingRecurringZevListItem {
  id: string
  name: string
  zevStartDate: number
  serviceEndDate: number
}

export enum HalfOfYear {
  FIRST = "FIRST",
  SECOND = "SECOND",
}

export interface BillingsRecurringUpsert {
  year: Date
  halfOfYear: HalfOfYear
  startDate: Date
  endDate: Date
  selectedZevs: Array<string>
}

export const emptyBillingsRecurringCreate = {
  year: new Date(),
  halfOfYear: HalfOfYear.FIRST,
  startDate: new Date(`${new Date().getFullYear()}-01-01`),
  endDate: new Date(`${new Date().getFullYear()}-06-30`),
  selectedZevs: [],
}
