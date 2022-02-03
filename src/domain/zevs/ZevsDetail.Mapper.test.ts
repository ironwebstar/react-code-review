import localeDateDE from "date-fns/locale/de"
import { parseISO } from "date-fns"
import { testDomainDependencies } from "../Domain.TestUtils"
import { StatusType } from "../Domain.Model"

import {
  zevDetailInitialBillingsListMapper,
  zevDetailRecurringBillingsListMapper,
  zevsDetailMapper,
  zevsDetailProfilePrefillMapper,
} from "./ZevsDetail.Mapper"
import { multiServiceBillingAdminResponse, profileMock, testConfig, zevMock } from "./Zevs.Stub"
import { zevStub } from "../billings/recurring/BillingsRecurring.Stub"

const domainDependencies = testDomainDependencies()
const depsStub = {
  ...domainDependencies,
  config: { ...testConfig, locale: localeDateDE },
}

test("zevsDetailMapper", () => {
  const result = zevsDetailMapper(zevMock, [], undefined, depsStub)
  const pricePackageResult = {
    additionalServicesPrice: "?",
    containsSpikePrice: false,
    id: 0,
    measurementType: "CONSUMPTION_DEPENDANT",
    order: 0,
    priceHighTariff: "?",
    priceLowTariff: "?",
    priceSolarPower: "?",
    priceTitle: "Standard Preise",
    spikePrice: "",
  }

  expect(result).toEqual({
    id: zevMock.id,
    name: zevMock.name,
    statusType: StatusType[zevMock.currentState],
    serviceStartDate: "01. Jan 2020",
    serviceEndDate: zevMock.serviceEndDate ? "" : undefined,
    nextBillingDate: "30. Jun 2022",
    billingFrequency: zevMock.billingFrequency,
    nextBillingFrequency: zevMock.nextBillingFrequency?.toString(),
    zevStartDate: "01. Jan 2020",
    externalReferenceNumber: zevMock.externalReferenceNumber,
    incomingMeteringCode: zevMock.incomingMeteringCode,
    outgoingMeteringCode: zevMock.outgoingMeteringCode,
    contactTelephoneNumber: zevMock.contact.telephone,
    contactMobileNumber: zevMock.contact.mobile,
    contactEmail: zevMock.contact.email,
    addressLineOne: zevMock.address.addressLineOne,
    addressLineTwo: zevMock.address.addressLineTwo,
    addressStreet: zevMock.address.street,
    addressHouseNumber: zevMock.address.houseNumber,
    addressPostalCode: zevMock.address.postalCode,
    addressCity: zevMock.address.city,
    municipality: zevMock.municipality,
    mainContactName: zevMock.mainContactPerson.name,
    mainContactTelephoneNumber: zevMock.mainContactPerson.contact.telephone,
    mainContactMobileNumber: zevMock.mainContactPerson.contact.mobile,
    mainContactEmail: zevMock.mainContactPerson.contact.email,
    paymentInformationPayee: zevMock.paymentInformation.payee,
    paymentInformationAccountNumber: zevMock.paymentInformation.accountNumber,
    paymentInformationIban: zevMock.paymentInformation.iban,
    paymentInformationVatNumber: zevMock.vatNumber,
    paymentInformationAddressStreet: zevMock.paymentInformation.payeeAddress.street,
    paymentInformationAddressHouseNumber: zevMock.paymentInformation.payeeAddress.houseNumber,
    paymentInformationAddressPostalCode: zevMock.paymentInformation.payeeAddress.postalCode,
    paymentInformationAddressCity: zevMock.paymentInformation.payeeAddress.city,
    managers: zevMock.managers,
    pricePackages: zevMock.pricePackages ? [pricePackageResult] : [],
    readyForInitialInvoice: false,
    readyForInitialContract: true,
    zevStartDateValue: parseISO(zevMock.zevStartDate).getTime(),
  })
})

test("zevsDetailProfilePrefillMapper", () => {
  const result = zevsDetailProfilePrefillMapper(profileMock, {
    ...domainDependencies,
    config: testConfig,
  })

  expect(result).toEqual({
    mainContactName: "Herr 234234 234234",
    contactEmail: profileMock.contact.email ?? "",
    contactMobileNumber: profileMock.contact.mobile ?? "",
    contactTelephoneNumber: profileMock.contact.telephone ?? "",
    addressStreet: profileMock.address.street,
    addressHouseNumber: profileMock.address.houseNumber,
    addressPostalCode: profileMock.address.postalCode,
    addressCity: profileMock.address.city,
  })
})

test("zevDetailInitialBillingsListMapper should return mapped initial billing for zevId", () => {
  const actual = zevDetailInitialBillingsListMapper(multiServiceBillingAdminResponse, zevStub, depsStub)
  expect(actual).toEqual({
    zevDetailBillings: [
      {
        billNumber: "billing-run-1",
        date: "01. Jan 2022",
        id: "billing-1",
        sortableStatus: "APPROVED",
        status: "APPROVED",
        totalAmountDue: "CHF 442.80",
      },
    ],
  })
})

test("zevDetailRecurringBillingsListMapper should return mapped recurring billing for zevId", () => {
  const actual = zevDetailRecurringBillingsListMapper(multiServiceBillingAdminResponse, zevStub, depsStub)
  expect(actual).toEqual({
    zevDetailBillings: [
      {
        billNumber: "billing-run-1",
        date: "01. Jan 2022",
        id: "billing-1",
        sortableStatus: "CANCELLED",
        status: "CANCELLED",
        totalAmountDue: "CHF 442.80",
      },
    ],
  })
})
