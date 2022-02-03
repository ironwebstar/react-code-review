import { ParticipantResponse, ZevAdminResponse } from "../../data/generated-sources/openapi"
import { DomainDependencies } from "../Domain.Dependencies"
import { formatPersonalFullName, formatSalutation } from "../profiles/Profiles.Formatters"

import { ParticipantDetail, ParticipantUpsert } from "./Participant.Model"

export const participantDetailsMapper = (
  participant: ParticipantResponse,
  zev: ZevAdminResponse,
  deps: DomainDependencies,
): ParticipantDetail => {
  return {
    id: participant.id,
    name: formatPersonalFullName(participant.personalData, deps),
    zevId: zev.id,
    zevName: zev.name,
    businessPartnerName: participant.sapGp ?? "",
    businessPartnerType: participant.gpType,
    salutation: formatSalutation(participant.personalData.salutation, deps) ?? "",
    title: participant.personalData.title ?? "",
    firstName: participant.personalData.firstName,
    lastName: participant.personalData.lastName,
    firstNameSecondPerson: participant.personalData.firstNameSecondPerson ?? "",
    lastNameSecondPerson: participant.personalData.lastNameSecondPerson ?? "",
    contactTelephone: participant.contactDetails.phone ?? "",
    contactMobile: participant.contactDetails.mobile ?? "",
    contactEmail: participant.contactDetails.email ?? "",
    addressStreet: participant.domicileAddress.street,
    addressHouseNumber: participant.domicileAddress.houseNumber,
    addressCO: participant.domicileAddress.co ?? "",
    addressPostBox: participant.domicileAddress.poBox ?? "",
    addressPostCode: participant.domicileAddress.postCode,
    addressCity: participant.domicileAddress.city,
    addressCountry: participant.domicileAddress.land,
    syncStatus: participant.syncStatus,
  }
}

export const participantUpdateMapper = (participant: ParticipantResponse): ParticipantUpsert => {
  return {
    id: participant.id,
    businessPartnerName: participant.sapGp ?? "",
    businessPartnerType: participant.gpType,
    salutation: participant.personalData.salutation,
    title: participant.personalData.title ?? "",
    firstName: participant.personalData.firstName,
    lastName: participant.personalData.lastName,
    firstNameSecondPerson: participant.personalData.firstNameSecondPerson ?? "",
    lastNameSecondPerson: participant.personalData.lastNameSecondPerson ?? "",
    contactTelephone: participant.contactDetails.phone ?? "",
    contactMobile: participant.contactDetails.mobile ?? "",
    contactEmail: participant.contactDetails.email ?? "",
    addressStreet: participant.domicileAddress.street,
    addressHouseNumber: participant.domicileAddress.houseNumber,
    addressCO: participant.domicileAddress.co ?? "",
    addressPostBox: participant.domicileAddress.poBox ?? "",
    addressPostCode: participant.domicileAddress.postCode,
    addressCity: participant.domicileAddress.city,
    addressCountry: participant.domicileAddress.land,
  }
}
