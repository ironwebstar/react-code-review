import {
  ContractAdminResponse,
  ContractState,
  MultiServiceBillingAdminResponse,
  ProfileAdminResponse,
  ServiceBillingAdminResponse,
  ServiceBillingState,
  ServiceBillingType,
  ZevAdminResponse,
  ZevState,
} from "../../data/generated-sources/openapi"
import { DomainDependencies } from "../Domain.Dependencies"
import { apiFormattedDateToTimestamp, appFormattedDate, formatMoneyLabel } from "../Domain.Formatters"
import { StatusType } from "../Domain.Model"
import { zevPricePackageMapper } from "../prices/Prices.Mapper"
import { formatPersonalFullName } from "../profiles/Profiles.Formatters"
import { ZevDetail, ZevDetailBillingsList, ZevPrefillProfile } from "./ZevsDetail.Model"

export const zevsDetailMapper = (
  zevResponse: ZevAdminResponse,
  contracts: ContractAdminResponse[],
  serviceBilling: ServiceBillingAdminResponse | undefined,
  deps: DomainDependencies,
): ZevDetail => {
  return {
    id: zevResponse.id,
    name: zevResponse.name,
    statusType: StatusType[zevResponse.currentState],
    serviceStartDate: appFormattedDate(zevResponse.serviceStartDate, deps),
    serviceEndDate: zevResponse.serviceEndDate ? appFormattedDate(zevResponse.serviceEndDate, deps) : undefined,
    nextBillingDate: appFormattedDate(zevResponse.nextBillingDate, deps),
    billingFrequency: zevResponse.billingFrequency,
    nextBillingFrequency: zevResponse.nextBillingFrequency?.toString(),
    zevStartDate: appFormattedDate(zevResponse.zevStartDate, deps),
    externalReferenceNumber: zevResponse.externalReferenceNumber,
    incomingMeteringCode: zevResponse.incomingMeteringCode,
    outgoingMeteringCode: zevResponse.outgoingMeteringCode,
    contactTelephoneNumber: zevResponse.contact.telephone,
    contactMobileNumber: zevResponse.contact.mobile,
    contactEmail: zevResponse.contact.email,
    addressLineOne: zevResponse.address.addressLineOne,
    addressLineTwo: zevResponse.address.addressLineTwo,
    addressStreet: zevResponse.address.street,
    addressHouseNumber: zevResponse.address.houseNumber,
    addressPostalCode: zevResponse.address.postalCode,
    addressCity: zevResponse.address.city,
    municipality: zevResponse.municipality,
    mainContactName: zevResponse.mainContactPerson.name,
    mainContactTelephoneNumber: zevResponse.mainContactPerson.contact.telephone,
    mainContactMobileNumber: zevResponse.mainContactPerson.contact.mobile,
    mainContactEmail: zevResponse.mainContactPerson.contact.email,
    paymentInformationPayee: zevResponse.paymentInformation.payee,
    paymentInformationAccountNumber: zevResponse.paymentInformation.accountNumber,
    paymentInformationIban: zevResponse.paymentInformation.iban,
    paymentInformationVatNumber: zevResponse.vatNumber,
    paymentInformationAddressStreet: zevResponse.paymentInformation.payeeAddress.street,
    paymentInformationAddressHouseNumber: zevResponse.paymentInformation.payeeAddress.houseNumber,
    paymentInformationAddressPostalCode: zevResponse.paymentInformation.payeeAddress.postalCode,
    paymentInformationAddressCity: zevResponse.paymentInformation.payeeAddress.city,
    managers: zevResponse.managers,
    readyForInitialInvoice: determineInitialBilling(zevResponse, contracts, serviceBilling),
    pricePackages: zevResponse.pricePackages
      ? zevResponse.pricePackages.map((pricePackage) => zevPricePackageMapper(pricePackage))
      : [],
    zevStartDateValue: apiFormattedDateToTimestamp(zevResponse.zevStartDate),
    readyForInitialContract: determineInitialContract(zevResponse, contracts),
  }
}

export const determineInitialBilling = (
  zevResponse: ZevAdminResponse,
  contracts: ContractAdminResponse[],
  serviceBilling: ServiceBillingAdminResponse | undefined,
) => {
  const zevStateForBilling = zevResponse.currentState === ZevState.ACTIVE
  const approvedContract = contracts.find((contract) => contract.currentState === ContractState.APPROVED) !== undefined
  const activeInitialServiceBilling =
    serviceBilling === undefined || serviceBilling.currentState === ServiceBillingState.CANCELLED
  return zevStateForBilling && approvedContract && activeInitialServiceBilling
}

const determineInitialContract = (zevResponse: ZevAdminResponse, contracts: ContractAdminResponse[]) => {
  return zevResponse.currentState === ZevState.ACTIVE && contracts.length === 0
}

export const zevsDetailProfilePrefillMapper = (
  profile: ProfileAdminResponse,
  deps: DomainDependencies,
): ZevPrefillProfile => {
  return {
    mainContactName: formatPersonalFullName(profile.personal, deps),
    contactEmail: profile.contact.email ?? "",
    contactMobileNumber: profile.contact.mobile ?? "",
    contactTelephoneNumber: profile.contact.telephone ?? "",
    addressStreet: profile.address.street,
    addressHouseNumber: profile.address.houseNumber,
    addressPostalCode: profile.address.postalCode,
    addressCity: profile.address.city,
  }
}

export const emptyZevPrefillProfile: ZevPrefillProfile = {
  mainContactName: "",
  contactMobileNumber: "",
  contactTelephoneNumber: "",
  addressStreet: "",
  addressHouseNumber: "",
  addressPostalCode: "",
  addressCity: "",
  contactEmail: "",
}

export const zevDetailInitialBillingsListMapper = (
  billingsInitial: MultiServiceBillingAdminResponse,
  zevResponse: ZevAdminResponse,
  deps: DomainDependencies,
): ZevDetailBillingsList => ({
  zevDetailBillings: billingsInitial.elements
    .filter((initial) => initial.zevId === zevResponse.id && initial.billingType === ServiceBillingType.INITIAL)
    .map((initialBilling) => ({
      id: initialBilling.id,
      status: StatusType[initialBilling.currentState],
      sortableStatus: initialBilling.currentState.toString(),
      billNumber: initialBilling.billingRunId ?? "",
      date: appFormattedDate(initialBilling.startDate, deps),
      totalAmountDue: formatMoneyLabel(initialBilling.totalAmountDue) ?? "-",
    })),
})

export const zevDetailRecurringBillingsListMapper = (
  billingsInitial: MultiServiceBillingAdminResponse,
  zevResponse: ZevAdminResponse,
  deps: DomainDependencies,
): ZevDetailBillingsList => ({
  zevDetailBillings: billingsInitial.elements
    .filter(
      (serviceBillingResponse) =>
        serviceBillingResponse.zevId === zevResponse.id &&
        serviceBillingResponse.billingType === ServiceBillingType.RECURRING,
    )
    .map((recurring) => ({
      id: recurring.id,
      status: StatusType[recurring.currentState],
      sortableStatus: recurring.currentState.toString(),
      billNumber: recurring.billingRunId ?? "",
      date: appFormattedDate(recurring.startDate, deps),
      totalAmountDue: formatMoneyLabel(recurring.totalAmountDue) ?? "-",
    })),
})
