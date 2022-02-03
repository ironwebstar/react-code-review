import { StatusType } from "../Domain.Model"
import { PricePackageItem } from "../prices/Prices.Model"

export interface ZevDetail {
  id: string
  name: string
  statusType: StatusType
  serviceStartDate: string
  serviceEndDate: string | undefined
  nextBillingDate: string
  billingFrequency: string
  nextBillingFrequency: string | undefined
  zevStartDate: string
  externalReferenceNumber: string
  incomingMeteringCode: string
  outgoingMeteringCode: string
  contactTelephoneNumber: string | undefined
  contactMobileNumber: string | undefined
  contactEmail: string | undefined
  addressLineOne: string | undefined
  addressLineTwo: string | undefined
  addressStreet: string
  addressHouseNumber: string
  addressPostalCode: string
  addressCity: string
  municipality: string
  mainContactName: string
  mainContactTelephoneNumber: string | undefined
  mainContactMobileNumber: string | undefined
  mainContactEmail: string | undefined
  paymentInformationPayee: string
  paymentInformationAccountNumber: string
  paymentInformationIban: string
  paymentInformationVatNumber: string | undefined
  paymentInformationAddressStreet: string
  paymentInformationAddressHouseNumber: string
  paymentInformationAddressPostalCode: string
  paymentInformationAddressCity: string
  managers: string[]
  readyForInitialInvoice: boolean
  pricePackages: PricePackageItem[]
  prefillProfile?: ZevPrefillProfile
  zevStartDateValue: number
  readyForInitialContract: boolean
}

export interface ZevPrefillProfile {
  mainContactName: string
  contactMobileNumber: string
  contactTelephoneNumber: string
  addressStreet: string
  addressHouseNumber: string
  addressPostalCode: string
  addressCity: string
  contactEmail: string
}

export interface ZevDetailBillingsList {
  zevDetailBillings: ZevDetailBillingsListItem[]
}

export interface ZevDetailBillingsListItem {
  id: string
  status: StatusType
  sortableStatus: string
  billNumber: string
  date: string
  totalAmountDue: string
}
