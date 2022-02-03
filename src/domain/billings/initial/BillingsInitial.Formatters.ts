import { AccountingStatus, ServiceBillingType } from "../../../data/generated-sources/openapi"
import { DomainDependencies } from "../../Domain.Dependencies"

export const formatInitialBilllingName = (zevName: string, deps: DomainDependencies) => {
  switch (deps.config.locale.code) {
    case "de":
      return `${zevName} - Initiale Rechnung`
    case "en":
      return `${zevName} - Initial bill`
    default:
      return zevName
  }
}

export const formatAccountingStatus = (accountingStatus: AccountingStatus, deps: DomainDependencies) => {
  switch (deps.config.locale.code) {
    case "de":
      switch (accountingStatus) {
        case AccountingStatus.CREATED:
          return "Erstellt"
        case AccountingStatus.UNAVAILABLE:
          return "Nicht verfügbar"
        case AccountingStatus.ERROR:
          return "Fehler"
      }
      break
    case "en":
      return accountingStatus
    default:
      return accountingStatus
  }
}

export const formatBillingType = (billingType: ServiceBillingType, deps: DomainDependencies) => {
  switch (deps.config.locale.code) {
    case "de":
      switch (billingType) {
        case ServiceBillingType.INITIAL:
          return "Initial"
        case ServiceBillingType.RECURRING:
          return "Wiederkehrend"
      }
      break
    case "en":
      return billingType
    default:
      return billingType
  }
}
