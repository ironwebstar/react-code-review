import { PagedProfileAdminResponse, ProfileAdminResponse, UserType } from "../../data/generated-sources/openapi"
import { DomainDependencies } from "../Domain.Dependencies"
import { formatPersonalFullName, formatTitleSalutation } from "./Profiles.Formatters"
import {
  ProfileDetail,
  ProfileListItem,
  ProfileManagerNameListItem,
  ProfileStatusType,
  ProfileUpsert,
} from "./Profiles.Model"
import { StatusType } from "../Domain.Model"

export const managerNamesMapper = (
  allProfilesResponse: PagedProfileAdminResponse,
  deps: DomainDependencies,
): ProfileManagerNameListItem[] => {
  return allProfilesResponse.elements
    .filter((profile) => profile.userType === UserType.ZEV_MANAGER)
    .map((profile) => ({
      id: profile.id,
      fullNameAddress:
        `${formatPersonalFullName(profile.personal, deps)}, ${profile.address.street} ` +
        `${profile.address.houseNumber}`,
    }))
}

export const profileListItemMapper = (profile: ProfileAdminResponse, deps: DomainDependencies): ProfileListItem => {
  return {
    id: profile.id,
    statusType: StatusType[profile.currentState],
    profileName: formatPersonalFullName(profile.personal, deps),
    userName: profile.username,
    type: profile.userType,
    profileStatusType: profileStatusTypeMapper(profile.username, profile.isBlocked),
  }
}

export const profileDetailMapper = (response: ProfileAdminResponse, deps: DomainDependencies): ProfileDetail => {
  return {
    id: response.id,
    statusType: StatusType[response.currentState],
    username: response.username,
    profileName: `${response.personal.firstName} ${response.personal.lastName}`,
    userTitle: `${formatTitleSalutation(response.personal.title, response.personal.salutation, deps)}`,
    address: `${response.address.street} ${response.address.houseNumber}`,
    city: `${response.address.postalCode} ${response.address.city}`,
    telephone: response.contact.telephone ?? "",
    mobile: response.contact.mobile ?? "",
    email: response.contact.email ?? "",
    type: response.userType,
    profileStatusType: profileStatusTypeMapper(response.username, response.isBlocked),
  }
}

export const profileStatusTypeMapper = (username: string, isBlocked: boolean) => {
  if (username === "unavailable") return ProfileStatusType.NOT_CREATED
  if (isBlocked) return ProfileStatusType.BLOCKED
  return ProfileStatusType.ACTIVE
}

export const profileUpdateMapper = (response: ProfileAdminResponse): ProfileUpsert => {
  return {
    statusType: StatusType[response.currentState],
    userType: response.userType,
    firstName: response.personal.firstName,
    lastName: response.personal.lastName,
    title: response.personal.title ?? "",
    salutation: response.personal.salutation,
    houseNumber: response.address.houseNumber,
    street: response.address.street,
    postalCode: response.address.postalCode,
    city: response.address.city,
    telephone: response.contact.telephone ?? "",
    mobile: response.contact.mobile ?? "",
    email: response.contact.email ?? "",
  }
}
