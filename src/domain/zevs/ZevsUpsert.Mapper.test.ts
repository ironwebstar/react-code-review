import { parseISO } from "date-fns"
import { StatusType } from "../Domain.Model"

import { zevsUpdateMapper } from "./ZevsUpsert.Mapper"
import { zevMock, pricePackages } from "./Zevs.Stub"
import {} from "./ZevsDetail.Model"

test("zevsDetailMapper", () => {
  const result = zevsUpdateMapper(zevMock)

  expect(result).toEqual({
    id: zevMock.id,
    statusType: StatusType[zevMock.currentState],
    name: zevMock.name,
    serviceStartDate: parseISO(zevMock.serviceStartDate).getTime(),
    serviceEndDate: zevMock.serviceEndDate ? parseISO(zevMock.serviceEndDate).getTime() : -1,
    billingFrequency: zevMock.billingFrequency,
    externalReferenceNumber: zevMock.externalReferenceNumber,
    incomingMeteringCode: zevMock.incomingMeteringCode,
    outgoingMeteringCode: zevMock.outgoingMeteringCode,
    contactTelephoneNumber: zevMock.contact.telephone ?? "",
    contactMobileNumber: zevMock.contact.mobile ?? "",
    contactEmail: zevMock.contact.email ?? "",
    addressLineOne: zevMock.address.addressLineOne ?? "",
    addressLineTwo: zevMock.address.addressLineTwo ?? "",
    addressStreet: zevMock.address.street,
    addressHouseNumber: zevMock.address.houseNumber,
    addressPostalCode: zevMock.address.postalCode,
    addressCity: zevMock.address.city,
    municipality: zevMock.municipality,
    mainContactName: zevMock.mainContactPerson.name,
    mainContactTelephoneNumber: zevMock.mainContactPerson.contact.telephone ?? "",
    mainContactMobileNumber: zevMock.mainContactPerson.contact.mobile ?? "",
    mainContactEmail: zevMock.mainContactPerson.contact.email ?? "",
    paymentInformationPayee: zevMock.paymentInformation.payee,
    paymentInformationAccountNumber: zevMock.paymentInformation.accountNumber,
    paymentInformationIban: zevMock.paymentInformation.iban,
    paymentInformationVatNumber: zevMock.vatNumber,
    paymentInformationAddressStreet: zevMock.paymentInformation.payeeAddress.street,
    paymentInformationAddressHouseNumber: zevMock.paymentInformation.payeeAddress.houseNumber,
    paymentInformationAddressPostalCode: zevMock.paymentInformation.payeeAddress.postalCode,
    paymentInformationAddressCity: zevMock.paymentInformation.payeeAddress.city,
    managers: zevMock.managers,
    nextBillingFrequency: zevMock.nextBillingFrequency,
    nextBillingDate: parseISO(zevMock.nextBillingDate).getTime(),
    zevStartDate: parseISO(zevMock.zevStartDate).getTime(),
    pricePackages: pricePackages,
  })
})
