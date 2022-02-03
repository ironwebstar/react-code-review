import { StatusType } from "../Domain.Model"
import { PersonalDataSalutationEnum, UserType } from "../../data/generated-sources/openapi"

export interface ProfileListItem {
  id: string
  statusType: StatusType
  profileName: string
  userName: string
  type: string
  profileStatusType: ProfileStatusType
}

export interface ProfileList {
  profiles: ProfileListItem[]
  page: {
    limit: number
    currentPage: number
    totalElements: number
    totalPages: number
  }
}

export enum ProfileStatusType {
  NOT_CREATED,
  BLOCKED,
  ACTIVE,
}

export interface ProfileDetail {
  id: string
  statusType: StatusType
  username: string
  profileName: string
  userTitle: string
  address: string
  city: string
  telephone: string
  mobile?: string
  email?: string
  type: string
  profileStatusType: ProfileStatusType
}

export interface ProfileUpsert {
  userType: UserType
  statusType: StatusType
  title: string
  firstName: string
  lastName: string
  salutation: string
  houseNumber: string
  street: string
  postalCode: string
  city: string
  telephone: string
  mobile: string
  email: string
}

export const draftProfile = {
  statusType: StatusType.DRAFT,
  userType: UserType.ZEV_MANAGER,
  title: "",
  firstName: "",
  lastName: "",
  salutation: "",
  houseNumber: "",
  street: "",
  postalCode: "",
  city: "",
  telephone: "",
  mobile: "",
  email: "",
}

export interface ProfileManagerNameList {
  profiles: ProfileManagerNameListItem[]
}

export interface ProfileManagerNameListItem {
  id: string
  fullNameAddress: string
}

export const salutationKeys = Object.keys(PersonalDataSalutationEnum)

export const userTypeKeys = Object.keys(UserType)
