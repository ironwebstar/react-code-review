import { ServiceComponentFeature } from "../../../data/generated-sources/openapi"
import { PricePackageItem, PricePackageUpsert } from "../../prices/Prices.Model"

export enum BillingStatusType {
  WAITING_FOR_DATA = "WAITING_FOR_DATA",
  DATA_AVAILABLE = "DATA_AVAILABLE",
  SUSPENDED = "SUSPENDED",
  IN_PROGRESS = "IN_PROGRESS",
  IN_PROGRESS_REOPENED = "IN_PROGRESS_REOPENED",
  DONE = "DONE",
  PAID = "PAID",
}

export enum BillingParticipantType {
  ALL = "ALL",
  INDIVIDUAL = "INDIVIDUAL",
}

export interface BillingsParticipantDetail {
  billingStatusType: BillingStatusType
  billingDateRange: string
  totalConsumption: string
  totalCosts: string
  containsErrorMessages: boolean
  billingFinalised: boolean
  consumptionOverview: {
    totalHighTariff: number
    totalLowTariff: number
    totalProduction: number
  }
  allParticipants: BillingsParticipantsItem[]
  allConsumption: BillingsConsumptionItem[]
  prices: PricePackageItem[]
  upsertPrices: PricePackageUpsert
}

export interface BillingsParticipantsItem {
  id: string
  consumptionPointId: string
  consumptionPointName: string
  buildingId: string
  buildingName: string
  participantName: string
  isDataAvailable: boolean
  errorMessage: string
}

export interface BillingsConsumptionItem {
  id: string
  billId: string
  paid: boolean
  period: string
  consumptionPointId: string
  consumptionPointName: string
  buildingName: string
  participantName: string
  totalConsumption: string
  totalConsumptionSortValue: number
  totalCosts: string
  accountingStatus: string
  consumptionOverview: {
    totalHighTariff: number
    totalLowTariff: number
    totalProduction: number
  }
  accountingErrorMessage?: string
  invoiceReferenceNumber?: string
  orderReferenceNumber?: string
}

export interface BillingsParticipantFinalise {
  billingStatusType: BillingStatusType
  billingDateRange: string
  invoiceDate: string
  totalCosts: string
  totalConsumption: string
  allConsumption: BillingsConsumptionItem[]
}

export interface ZevServiceComponentFeaturesResponse {
  features: ServiceComponentFeature[]
}
