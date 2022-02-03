import {
  Page,
  BuildingAdminResponse,
  BuildingState,
  Municipality,
  TutorialStatus,
  ZevAdminResponse,
  ZevBillingFrequency,
  ZevState,
  ParticipantResponse,
  ParticipantGpType,
  ParticipantPersonalDataSalutationEnum,
  ConsumptionPointAdminResponse,
  ConsumptionPointState,
  PowerMeterType,
  ConsumptionPointType,
} from "../../data/generated-sources/openapi"

import { StatusType } from "../Domain.Model"
import { BuildingUpsert } from "./Buildings.Model"
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

export const buildingStub: BuildingAdminResponse = {
  id: "c7b9bc17-61e5-40d4-802f-7e62ba549301",
  address: {
    street: "Garageweg",
    houseNumber: "67",
    postalCode: "6028",
    city: "Herlisberg",
  },
  zevId: "zev-1",
  consumptionPoints: ["consumption-point-1"],
  currentState: BuildingState.INACTIVE,
  name: "Autorep-Werkstatt mit Wohnung",
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

export const participantStub: ParticipantResponse = {
  id: "participant-1",
  zevId: "zev-1",
  gpType: ParticipantGpType.PERSON,
  personalData: {
    salutation: ParticipantPersonalDataSalutationEnum.MR,
    firstName: "First Name 1477",
    lastName: "Last Name 1477",
    firstNameSecondPerson: "Second First Name 1477",
    lastNameSecondPerson: "Second Last Name 1477",
  },
  contactDetails: {
    email: "email@bluewin.ch",
    phone: "+41 41 000 00 00",
  },
  domicileAddress: {
    city: "Alberswil",
    postCode: "6020",
    houseNumber: "7",
    street: "Street",
    land: "Schweiz",
    co: "someone somewhere",
  },
  syncStatus: false,
}

export const consumptionPointStub: ConsumptionPointAdminResponse = {
  id: "consumption-point-1",
  name: "1.OG rechts3",
  buildingId: "b0ea098c-2349-4936-b77e-5af207813e54",
  currentState: ConsumptionPointState.ACTIVE,
  meterType: PowerMeterType.COMMERCIAL_POWERMETER_LARGE,
  meteringCode: "CH100360123450000000000000508971033",
  participations: [],
  pricePackageId: 0,
  type: ConsumptionPointType.BUSINESS,
  billableFrom: "2020-01-25",
}

export const buildingUpsert: BuildingUpsert = {
  statusType: StatusType[buildingStub.currentState],
  buildingObject: buildingStub.name ?? "",
  addressStreet: buildingStub.address.street,
  addressHouseNumber: buildingStub.address.houseNumber,
  addressPostCode: buildingStub.address.postalCode,
  addressCity: buildingStub.address.city,
}
