import {
  ServiceBillingAdminResponse,
  ServiceBillingRunAdminResponse,
  ServiceBillingRunState,
  ServiceBillingState,
  BillingType,
  ServiceBillingType,
  AccountingStatus,
  Page,
  Municipality,
  TutorialStatus,
  ZevAdminResponse,
  ZevBillingFrequency,
  ZevState,
} from "../../../data/generated-sources/openapi"
import { DomainConfig } from "../../Domain.Dependencies"
import { BillingsRecurringUpsert, HalfOfYear } from "./BillingsRecurring.Model"

export const testConfig: DomainConfig = {
  baseUrl: "adminportal.ckw.noumenadigital.com",
  appName: "ckw-adminportal",
  locale: {
    code: "de",
  },
}

export const pageStub: Page = {
  limit: 10,
  currentPage: 1,
  totalElements: 10,
  totalPages: 1,
}

export const billingRecurringRunStub: ServiceBillingRunAdminResponse = {
  id: "billing-run-1",
  zevIds: ["zev-1", "zev-2"],
  startDate: "2022-07-01",
  endDate: "2022-12-31",
  currentState: ServiceBillingRunState.CANCELLED,
  serviceBillingIds: ["billing-1"],
}

export const serviceBillingStub: ServiceBillingAdminResponse = {
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

export const zevStub: ZevAdminResponse = {
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

export const serviceBillingUpsert: BillingsRecurringUpsert = {
  year: new Date(),
  halfOfYear: HalfOfYear.SECOND,
  startDate: new Date(),
  endDate: new Date(),
  selectedZevs: [zevStub.id],
}
