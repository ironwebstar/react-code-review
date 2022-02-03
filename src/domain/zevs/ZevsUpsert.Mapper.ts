import { ZevAdminResponse } from "../../data/generated-sources/openapi"
import { apiFormattedDateToTimestamp } from "../Domain.Formatters"
import { StatusType } from "../Domain.Model"
import { getPricesUpsertMapper } from "../prices/Prices.Mapper"
import { ZevsUpsert } from "./ZevsUpsert.Model"

export const zevsUpdateMapper = (zevResponse: ZevAdminResponse): ZevsUpsert => {
  return {
    id: zevResponse.id,
    statusType: StatusType[zevResponse.currentState],
    name: zevResponse.name,
    serviceStartDate: apiFormattedDateToTimestamp(zevResponse.serviceStartDate),
    serviceEndDate: apiFormattedDateToTimestamp(zevResponse.serviceEndDate),
    billingFrequency: zevResponse.billingFrequency,
    externalReferenceNumber: zevResponse.externalReferenceNumber,
    incomingMeteringCode: zevResponse.incomingMeteringCode,
    outgoingMeteringCode: zevResponse.outgoingMeteringCode,
    contactTelephoneNumber: zevResponse.contact.telephone ?? "",
    contactMobileNumber: zevResponse.contact.mobile ?? "",
    contactEmail: zevResponse.contact.email ?? "",
    addressLineOne: zevResponse.address.addressLineOne ?? "",
    addressLineTwo: zevResponse.address.addressLineTwo ?? "",
    addressStreet: zevResponse.address.street,
    addressHouseNumber: zevResponse.address.houseNumber,
    addressPostalCode: zevResponse.address.postalCode,
    addressCity: zevResponse.address.city,
    municipality: zevResponse.municipality,
    mainContactName: zevResponse.mainContactPerson.name,
    mainContactTelephoneNumber: zevResponse.mainContactPerson.contact.telephone ?? "",
    mainContactMobileNumber: zevResponse.mainContactPerson.contact.mobile ?? "",
    mainContactEmail: zevResponse.mainContactPerson.contact.email ?? "",
    paymentInformationPayee: zevResponse.paymentInformation.payee,
    paymentInformationAccountNumber: zevResponse.paymentInformation.accountNumber,
    paymentInformationIban: zevResponse.paymentInformation.iban,
    paymentInformationVatNumber: zevResponse.vatNumber,
    paymentInformationAddressStreet: zevResponse.paymentInformation.payeeAddress.street,
    paymentInformationAddressHouseNumber: zevResponse.paymentInformation.payeeAddress.houseNumber,
    paymentInformationAddressPostalCode: zevResponse.paymentInformation.payeeAddress.postalCode,
    paymentInformationAddressCity: zevResponse.paymentInformation.payeeAddress.city,
    managers: zevResponse.managers,
    nextBillingFrequency: zevResponse.nextBillingFrequency,
    nextBillingDate: apiFormattedDateToTimestamp(zevResponse.nextBillingDate),
    zevStartDate: apiFormattedDateToTimestamp(zevResponse.zevStartDate),
    pricePackages: getPricesUpsertMapper(zevResponse.pricePackages),
  }
}
