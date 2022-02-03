import { Map } from "immutable"
import { parseISO } from "date-fns"
import {
  AccountingStatus,
  BillingType,
  MultiServiceBillingAdminResponse,
  Municipality,
  Page,
  PersonalDataSalutationEnum,
  PersonState,
  ProfileAdminResponse,
  ServiceBillingAdminResponse,
  ServiceBillingState,
  ServiceBillingType,
  TutorialStatus,
  UserType,
  ZevAdminResponse,
  ZevBillingFrequency,
  ZevState,
} from "../../data/generated-sources/openapi"
import { StatusType } from "../Domain.Model"
import { DomainConfig } from "../Domain.Dependencies"
import { PriceMeasurementType, PricePackageItem, PricePackageUpsert } from "../prices/Prices.Model"
import { ZevsUpsert } from "./ZevsUpsert.Model"

export const testConfig: DomainConfig = {
  baseUrl: "adminportal.ckw.noumenadigital.com",
  appName: "ckw-adminportal",
  locale: {
    code: "de",
  },
}

export const pageMock: Page = {
  limit: 10,
  currentPage: 1,
  totalElements: 10,
  totalPages: 1,
}

export const zevMock: ZevAdminResponse = {
  id: "zev-1",
  name: "Samuel Kirton",
  contact: {
    email: "samkirton@me.com",
    telephone: "+41762033341",
    mobile: "",
  },
  mainContactPerson: {
    name: "Sam",
    contact: {
      email: "",
      telephone: "",
      mobile: "",
    },
  },
  address: {
    street: "Seestrasse 91",
    houseNumber: "91",
    postalCode: "8002",
    city: "zürich",
    addressLineOne: "Seestrasse 91",
  },
  serviceStartDate: "2020-01-01",
  managers: ["profile-id"],
  buildings: [],
  currentState: ZevState.ACTIVE,
  participants: [],
  incomingMeteringCode: "342234234234234444444444444444444",
  outgoingMeteringCode: "342234234234234444444444444444444",
  paymentInformation: {
    payee: "Samuel Kirton",
    accountNumber: "rewrwerwewrrw",
    iban: "CH93 0076 2011 6238 5295 7",
    payeeAddress: {
      street: "Seestrasse 91",
      houseNumber: "Seestrasse 91",
      postalCode: "8002",
      city: "Zürich",
    },
  },
  nextBillingDate: "2022-06-30",
  billingFrequency: ZevBillingFrequency.BIANNUAL,
  paymentDeadlineInDays: 30,
  tutorialStatus: TutorialStatus.OPEN,
  zevStartDate: "2020-01-01",
  allParticipantsBillingsHistory: [],
  recurringServiceBillings: [],
  externalReferenceNumber: "231231231231233213",
  municipality: Municipality.DIERIKON,
  contracts: [],
  pricePackages: [
    {
      id: 0,
      name: "Standard Preise",
      order: 0,
    },
  ],
  vatNumber: "",
}

export const profileMock: ProfileAdminResponse = {
  id: "1df403b4-5df6-45d9-952d-3d1e9ce37f9f",
  party: "ac8bc993-d658-4d51-8df2-7f9aa9cc2def",
  userType: UserType.ZEV_MANAGER,
  contact: {
    email: "me@you.com",
    telephone: "+41762033341",
  },
  address: {
    street: "Seestrasse 91",
    houseNumber: "Seestrasse 91",
    postalCode: "8002",
    city: "Zürich",
  },
  personal: {
    salutation: PersonalDataSalutationEnum.MR,
    firstName: "234234",
    lastName: "234234",
  },
  isBlocked: false,
  username: "unavailable",
  currentState: PersonState.CREATED,
  zevIds: [],
}

const pricePackage = {
  id: 0,
  order: 0,
  priceTitle: "Standard Preise",
  priceSolarPower: "0.0000",
  priceHighTariff: "0.0000",
  priceLowTariff: "0.0000",
  additionalServicesPrice: "0.0000",
  measurementType: PriceMeasurementType.CONSUMPTION_DEPENDANT,
  spikePrice: "",
  containsSpikePrice: false,
}

export const pricePackages: PricePackageUpsert = Map<number, PricePackageItem>([[pricePackage.id, pricePackage]])

export const zevsUpsert: ZevsUpsert = {
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
  pricePackages,
}

export const serviceInitialBillingStub: ServiceBillingAdminResponse = {
  id: "billing-1",
  billingDate: "2022-01-13",
  currentState: ServiceBillingState.APPROVED,
  positions: [
    {
      name: "Abrechnungsdienstleistung Deluxe",
      billingType: BillingType.INITIAL_FEE,
      quantity: 54,
      price: "5.50",
      finalAmountDue: "297.00",
      externalReferenceNumber: "121632",
      averageNumberCp: 9,
    },
  ],
  billingType: ServiceBillingType.INITIAL,
  contractId: "contract-1",
  zevId: "zev-1",
  totalAmountDue: "442.80",
  accountingStatus: AccountingStatus.CREATED,
  startDate: "2022-01-01",
  endDate: "2022-06-30",
  billingRunId: "billing-run-1",
  orderReferenceNumber: "0020150837",
  invoiceReferenceNumber: "0090166849",
}

export const nonMatchingserviceInitialBillingStub: ServiceBillingAdminResponse = {
  id: "billing-1",
  billingDate: "2022-01-13",
  currentState: ServiceBillingState.APPROVED,
  positions: [
    {
      name: "Abrechnungsdienstleistung Deluxe",
      billingType: BillingType.INITIAL_FEE,
      quantity: 54,
      price: "5.50",
      finalAmountDue: "297.00",
      externalReferenceNumber: "121632",
      averageNumberCp: 9,
    },
  ],
  billingType: ServiceBillingType.INITIAL,
  contractId: "contract-1",
  zevId: "zev-10123",
  totalAmountDue: "442.80",
  accountingStatus: AccountingStatus.CREATED,
  startDate: "2022-01-01",
  endDate: "2022-06-30",
  billingRunId: "billing-run-1",
  orderReferenceNumber: "0020150837",
  invoiceReferenceNumber: "0090166849",
}

export const serviceRecurringBillingStub: ServiceBillingAdminResponse = {
  id: "billing-1",
  billingDate: "2022-01-13",
  currentState: ServiceBillingState.CANCELLED,
  positions: [
    {
      name: "Abrechnungsdienstleistung Deluxe",
      billingType: BillingType.MONTHLY_FEE_PER_CONSUMPTION_POINT,
      quantity: 54,
      price: "5.50",
      finalAmountDue: "297.00",
      externalReferenceNumber: "121632",
      averageNumberCp: 9,
    },
  ],
  billingType: ServiceBillingType.RECURRING,
  contractId: "contract-1",
  zevId: "zev-1",
  totalAmountDue: "442.80",
  accountingStatus: AccountingStatus.CREATED,
  startDate: "2022-01-01",
  endDate: "2022-06-30",
  billingRunId: "billing-run-1",
  orderReferenceNumber: "0020150837",
  invoiceReferenceNumber: "0090166849",
}

export const multiServiceBillingAdminResponse: MultiServiceBillingAdminResponse = {
  elements: [serviceInitialBillingStub, serviceRecurringBillingStub, nonMatchingserviceInitialBillingStub],
}
