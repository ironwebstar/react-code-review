import {
  MultiServiceBillingAdminResponse,
  PagedZevAdminResponse,
  ServiceBillingAdminResponse,
  ServiceBillingType,
  ZevAdminResponse,
} from "../../../data/generated-sources/openapi"
import { DomainDependencies } from "../../Domain.Dependencies"
import { appFormattedDate, formatMoneyLabel } from "../../Domain.Formatters"
import { StatusType } from "../../Domain.Model"
import { formatAccountingStatus, formatBillingType, formatInitialBilllingName } from "./BillingsInitial.Formatters"
import { BillingsInitialDetail, BillingsInitialList } from "./BillingsInitial.Model"

export const billingsInitialListMapper = (
  billingsInitial: MultiServiceBillingAdminResponse,
  zevs: PagedZevAdminResponse,
  deps: DomainDependencies,
): BillingsInitialList => {
  return {
    billingsInitial: billingsInitial.elements
      .filter((billing) => billing.billingType === ServiceBillingType.INITIAL)
      .map((billing) => {
        const zev = zevs.elements.find((zev) => billing.zevId === zev.id)
        return {
          id: billing.id,
          statusType: StatusType[billing.currentState],
          sortableStatusType: billing.currentState.toString(),
          billNumber: "",
          date: appFormattedDate(billing.billingDate, deps),
          zevId: zev?.id ?? "",
          zevName: zev?.name ?? "",
        }
      }),
  }
}

export const billingsInitialMapper = (
  serviceBillingAdminResponse: ServiceBillingAdminResponse,
  zev: ZevAdminResponse,
  deps: DomainDependencies,
): BillingsInitialDetail => {
  return {
    name: formatInitialBilllingName(zev.name, deps),
    statusType: StatusType[serviceBillingAdminResponse.currentState],
    date: appFormattedDate(serviceBillingAdminResponse.billingDate, deps),
    type: formatBillingType(serviceBillingAdminResponse.billingType, deps),
    orderReferenceNumber: serviceBillingAdminResponse.orderReferenceNumber ?? "",
    invoiceReferenceNumber: serviceBillingAdminResponse.invoiceReferenceNumber ?? "",
    accountingStatus: formatAccountingStatus(serviceBillingAdminResponse.accountingStatus, deps),
    totalAmountDue: formatMoneyLabel(serviceBillingAdminResponse.totalAmountDue),
    zevName: zev.name,
    zevId: zev.id,
    positions: serviceBillingAdminResponse.positions.map((position, index) => ({
      id: index,
      name: position.name,
      quantity: `${position.quantity}`,
      price: position.price,
      totalAmountDue: position.finalAmountDue,
      sortableTotalAmountDue: parseFloat(position.finalAmountDue),
      sortablePrice: parseFloat(position.price),
    })),
  }
}
