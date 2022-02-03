import {
  Task,
  Page,
  ZevAdminResponse,
  TaskStatusEnum,
  TaskTypeEnum,
  TaskReferenceTypeEnum,
  ZevState,
  ZevBillingFrequency,
  TutorialStatus,
  Municipality,
  ParticipantResponse,
  ParticipantGpType,
  ParticipantPersonalDataSalutationEnum,
} from "../../data/generated-sources/openapi"
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

export const tasksStub: Task[] = [
  {
    id: 1,
    createdAt: "2021-12-23",
    reference: "3f755b91-3642-4b27-861c-e67858cc8a91",
    status: TaskStatusEnum.CREATED,
    type: TaskTypeEnum.NEW_PARTICIPANT,
    zevId: "zev-1",
    referenceType: TaskReferenceTypeEnum.PARTICIPANT,
    completedAt: "2022-01-01",
    participantSapSyncStatus: true,
  },
  {
    id: 2,
    createdAt: "2021-12-23",
    reference: "4299cf1b-cd4c-4640-bc0a-4b333ba826ee",
    status: TaskStatusEnum.DONE,
    type: TaskTypeEnum.NEW_PARTICIPANT,
    zevId: "zev-1",
    referenceType: TaskReferenceTypeEnum.PARTICIPANT,
    completedAt: "2022-01-14",
    participantSapSyncStatus: false,
  },
]

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

export const participantStub: ParticipantResponse = {
  id: "participant-1",
  zevId: "zev-1",
  gpType: ParticipantGpType.PERSON,
  personalData: {
    salutation: ParticipantPersonalDataSalutationEnum.MR_AND_MS,
    firstName: "First Name 5",
    lastName: "Last Name 5",
    firstNameSecondPerson: "Second First Name 5",
    lastNameSecondPerson: "Second Last Name 5",
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
  sapGp: "1274245",
}
