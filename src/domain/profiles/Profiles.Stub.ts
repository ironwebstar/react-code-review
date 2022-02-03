import {
  PersonalDataSalutationEnum,
  PersonState,
  UserType,
  ProfileAdminResponse,
  ZevAdminResponse,
  ZevState,
  ZevBillingFrequency,
  TutorialStatus,
  Municipality,
} from "../../data/generated-sources/openapi/api"
import { ProfileUpsert } from "./Profiles.Model"
import { StatusType } from "../Domain.Model"
import { DomainConfig } from "../Domain.Dependencies"

export const testConfig: DomainConfig = {
  baseUrl: "adminportal.ckw.noumenadigital.com",
  appName: "ckw-adminportal",
  locale: {
    code: "de",
  },
}

export const profileStub: ProfileAdminResponse = {
  id: "profile-id",
  party: "party",
  userType: UserType.ZEV_MANAGER,
  contact: {
    email: "test@email.com",
    telephone: "+12345679809",
    mobile: "+12345679809",
  },
  address: {
    street: "street",
    houseNumber: "No.1",
    postalCode: "101010",
    city: "Toronto",
  },
  personal: {
    salutation: PersonalDataSalutationEnum.MR,
    title: "Person",
    firstName: "Max",
    lastName: "Friberg",
  },
  customerNumber: "customer-number",
  externalUserId: "external-user-id",
  isBlocked: false,
  username: "admin",
  externalUserParties: ["party-1", "party-2"],
  currentState: PersonState.CREATED,
  zevIds: ["zev-1", "zev-2"],
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

export const profileUpsert: ProfileUpsert = {
  statusType: StatusType[profileStub.currentState],
  city: profileStub.address.city,
  telephone: profileStub.contact.telephone ?? "",
  mobile: profileStub.contact.mobile ?? "",
  email: profileStub.contact.email ?? "",
  userType: UserType.ZEV_MANAGER,
  title: profileStub.personal.title ?? "",
  firstName: profileStub.personal.firstName,
  lastName: profileStub.personal.lastName,
  salutation: profileStub.personal.salutation,
  houseNumber: profileStub.address.houseNumber,
  street: profileStub.address.street,
  postalCode: profileStub.address.postalCode,
}

export enum ProfileStatusType {
  NOT_CREATED,
  BLOCKED,
  ACTIVE,
}
