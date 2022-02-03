import {
  PagedZevAdminResponse,
  ServiceBillingAdminResponse,
  ServiceBillingPosition,
  ServiceBillingRunAdminResponse,
  ServiceBillingRunMultiAdminResponse,
  ZevAdminResponse,
} from "../../../data/generated-sources/openapi"
import { DomainDependencies } from "../../Domain.Dependencies"
import { apiFormattedDateToTimestamp, appFormattedDate, formatMoneyLabel } from "../../Domain.Formatters"
import { StatusType } from "../../Domain.Model"
import {
  BillingPosition,
  BillingsRecurringDetail,
  BillingsRecurringList,
  ServiceBilling,
} from "./BillingsRecurring.Model"

export const billingsRecurringListMapper = (
  billingsRecurring: ServiceBillingRunMultiAdminResponse,
  zevs: PagedZevAdminResponse,
  deps: DomainDependencies,
): BillingsRecurringList => {
  return {
    billingsRecurring: billingsRecurring.elements
      .map((billing) => {
        return {
          id: billing.id,
          statusType: StatusType[billing.currentState],
          sortableStatusType: billing.currentState.toString(),
          period: `${appFormattedDate(billing.startDate, deps)} - ${appFormattedDate(billing.endDate, deps)}`,
          sortablePeriod: apiFormattedDateToTimestamp(billing.startDate),
          filterablePeriod: `${billing.startDate} - ${billing.endDate}`,
          zevs: billing.zevIds
            .map((zevId) => {
              const zev = zevs.elements.find((zev) => zev.id === zevId)
              return {
                id: zev?.id ?? "",
                name: zev?.name ?? "",
              }
            })
            .filter((zev) => zev.id !== ""),
        }
      })
      .filter((billing) => billing.zevs.length > 0),
  }
}

export const billingsRecurringMapper = (
  billing: ServiceBillingRunAdminResponse,
  zevServiceBillings: {
    zevResponse: ZevAdminResponse
    serviceBillingAdminResponse: ServiceBillingAdminResponse
  }[],
  deps: DomainDependencies,
): BillingsRecurringDetail => {
  return {
    id: billing.id,
    statusType: StatusType[billing.currentState],
    period: `${appFormattedDate(billing.startDate, deps)} - ${appFormattedDate(billing.endDate, deps)}`,
    zevIds: billing.zevIds,
    serviceBillings: zevServiceBillings.map((zevServiceBilling) => serviceBillingMapper(zevServiceBilling, deps)),
  }
}

export const serviceBillingMapper = (
  zevServiceBilling: {
    zevResponse: ZevAdminResponse
    serviceBillingAdminResponse: ServiceBillingAdminResponse
  },
  deps: DomainDependencies,
): ServiceBilling => {
  const { zevResponse, serviceBillingAdminResponse } = zevServiceBilling
  return {
    id: serviceBillingAdminResponse.id,
    statusType: StatusType[serviceBillingAdminResponse.currentState],
    sortableStatusType: serviceBillingAdminResponse.currentState.toString(),
    period: `${appFormattedDate(serviceBillingAdminResponse.startDate, deps)} - ${appFormattedDate(
      serviceBillingAdminResponse.endDate,
      deps,
    )}`,
    sortablePeriod: apiFormattedDateToTimestamp(serviceBillingAdminResponse.startDate),
    positions: serviceBillingAdminResponse.positions.map((position, index) => billingPositionMapper(position, index)),
    billingType: serviceBillingAdminResponse.billingType,
    zevId: zevResponse.id,
    zevName: zevResponse.name,
    totalAmountDue: formatMoneyLabel(serviceBillingAdminResponse.totalAmountDue),
    sortableTotalAmountDue: parseFloat(serviceBillingAdminResponse.totalAmountDue),
    accountingStatus: serviceBillingAdminResponse.accountingStatus,
    sortableAccountingStatus: serviceBillingAdminResponse.accountingStatus.toString(),
    invoiceReferenceNumber: serviceBillingAdminResponse.invoiceReferenceNumber ?? "",
    orderReferenceNumber: serviceBillingAdminResponse.orderReferenceNumber ?? "",
    submissionError: serviceBillingAdminResponse.accountingErrorMessage,
  }
}

export const billingPositionMapper = (position: ServiceBillingPosition, index: number): BillingPosition => {
  return {
    id: `${index}`,
    name: position.name,
    quantity: `${position.quantity}`,
    sortableQuantity: position.quantity,
    price: formatMoneyLabel(position.price),
    sortablePrice: parseFloat(position.price),
    finalAmountDue: formatMoneyLabel(position.finalAmountDue),
    sortableFinalAmountDue: parseFloat(position.finalAmountDue),
  }
}
