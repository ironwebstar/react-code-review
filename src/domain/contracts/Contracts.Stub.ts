import {
  BillingType,
  ContractAdminResponse,
  ContractState,
  Municipality,
  Page,
  PowerMeterType,
  ProductAdminResponse,
  TutorialStatus,
  ZevAdminResponse,
  ZevBillingFrequency,
  ZevState,
} from "../../data/generated-sources/openapi"
import { StatusType } from "../Domain.Model"
import { ContractUpsert } from "./Contracts.Models"
import { DomainConfig } from "../Domain.Dependencies"

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

export const contractStub: ContractAdminResponse = {
  id: "contract-1",
  currentState: ContractState.DRAFT,
  startDate: "2022-08-01",
  endDate: "2022-12-01",
  productId: "product-1",
  zevId: "zev-1",
  predecessorContractId: "contract-1",
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
  serviceStartDate: "2022-01-19",
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
  zevStartDate: "2022-01-19",
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

export const productStub: ProductAdminResponse = {
  id: "product-1",
  name: "product",
  serviceComponents: [
    "30f4082d-6fef-43aa-85de-25a1cf277057",
    "84321bff-b580-4e4c-9608-fafa8e218dc3",
    "ab89e598-563c-4976-b450-73cb52709e85",
  ],
  priceComponents: [
    {
      id: "1b9eca6d-570b-4248-a6ef-53f47876f76f",
      name: "44",
      billingType: BillingType.MONTHLY_SPECIFIC_FEE_PER_CONSUMPTION_POINT,
      priceWithoutVat: "5.00",
      validFrom: "2022-01-01",
      validUntil: "2023-01-01",
      externalReferenceNumber: "555",
      powermeterType: PowerMeterType.HOUSEHOLD_POWERMETER,
    },
  ],
}

export const contractUpsert: ContractUpsert = {
  statusType: StatusType.CREATED,
  startDate: 1642350494,
  endDate: 1642360494,
  productId: "product-1",
  products: [],
}
