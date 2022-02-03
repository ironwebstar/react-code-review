import { ParticipantGpType, ParticipantPersonalDataSalutationEnum } from "../../data/generated-sources/openapi"

export enum ParticipantAddressCountry {
  Schweiz = "Schweiz",
}

export const participantAddressCountryKeys = Object.keys(ParticipantAddressCountry)

export const salutationKeys = Object.keys(ParticipantPersonalDataSalutationEnum)

export const businessPartnerTypeKeys = Object.keys(ParticipantGpType)

export interface ParticipantZevList {
  participants: ParticipantZevListItem[]
}

export interface ParticipantZevListItem {
  id: string
  synchronised: boolean
  firstName: string
  lastName: string
  gpNumber: string
  email: string
}

export interface ConsumptionPointParticipationsData {
  currentParticipation?: ConsumptionPointParticipationItem
  participations: ConsumptionPointParticipationItem[]
}

export interface ConsumptionPointParticipant {
  id: string
  fullName: string
}

export interface ConsumptionPointParticipationItem {
  id: string
  moveInDate: string
  nextMoveInDate: number
  moveOutDate?: string
  nextMoveOutDate: number
  sortableMoveInDate: number
  sortableMoveOutDate: number
  participant?: ConsumptionPointParticipant
}

export interface ParticipantDetail {
  id: string
  name: string
  zevId: string
  zevName: string
  businessPartnerName: string
  businessPartnerType: string
  salutation: string
  title: string
  firstName: string
  lastName: string
  firstNameSecondPerson: string
  lastNameSecondPerson: string
  contactTelephone: string
  contactMobile: string
  contactEmail: string
  addressStreet: string
  addressHouseNumber: string
  addressCO: string
  addressPostBox: string
  addressPostCode: string
  addressCity: string
  addressCountry: string
  syncStatus: boolean
}

export interface ParticipantUpsert {
  id: string
  businessPartnerName: string
  businessPartnerType: string
  salutation: string
  title: string
  firstName: string
  lastName: string
  firstNameSecondPerson: string
  lastNameSecondPerson: string
  contactTelephone: string
  contactMobile: string
  contactEmail: string
  addressStreet: string
  addressHouseNumber: string
  addressCO: string
  addressPostBox: string
  addressPostCode: string
  addressCity: string
  addressCountry: string
}

export const initialParticipant = {
  id: "",
  businessPartnerName: "",
  businessPartnerType: ParticipantGpType.PERSON,
  salutation: ParticipantPersonalDataSalutationEnum.UNDEFINED,
  title: "",
  firstName: "",
  lastName: "",
  firstNameSecondPerson: "",
  lastNameSecondPerson: "",
  contactTelephone: "",
  contactMobile: "",
  contactEmail: "",
  addressStreet: "",
  addressHouseNumber: "",
  addressCO: "",
  addressPostBox: "",
  addressPostCode: "",
  addressCity: "",
  addressCountry: ParticipantAddressCountry.Schweiz,
}
