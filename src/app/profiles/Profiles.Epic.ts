import {
  activateProfile,
  createProfile,
  createProfileLogin,
  deactivateProfile,
  deleteProfileById,
  getManagerNames,
  getManagerNamesByZevId,
  getProfileById,
  getProfiles,
  getProfileUpdateById,
  resetPasswordProfile,
  updateProfile,
} from "../../domain/profiles/Profiles.Repository"
import { ProfileList, ProfileManagerNameList, ProfileDetail, ProfileUpsert } from "../../domain/profiles/Profiles.Model"
import { DOMAIN_DEPENDENCIES } from "../App.Config"
import { createEpic } from "../Shared.Epic"

export enum ProfilesActionType {
  PROFILES_LIST_GET = "PROFILES_LIST_GET",
  PROFILES_GET_BY_ID = "PROFILES_GET_BY_ID",
  PROFILES_DELETE_BY_ID = "PROFILES_DELETE_BY_ID",
  PROFILES_GET_MANAGER_LIST = "PROFILES_GET_MANAGER_LIST",
  PROFILES_GET_MANAGER_LIST_BY_ZEV_ID = "PROFILES_GET_MANAGER_LIST_BY_ZEV_ID",
  PROFILES_UPDATE = "PROFILES_UPDATE",
  PROFILES_GET_UPDATE_BY_ID = "PROFILES_GET_UPDATE_BY_ID",
  PROFILES_CREATE = "PROFILES_CREATE",
  PROFILES_CREATE_LOGIN_BY_ID = "PROFILES_CREATE_LOGIN_BY_ID",
  PROFILES_ACTIVATE = "PROFILES_ACTIVATE",
  PROFILES_DEACTIVATE = "PROFILES_DEACTIVATE",
  PROFILES_RESET_PASSWORD = "PROFILES_RESET_PASSWORD",
}

export const profilesEpics = [
  createEpic<ProfileList>(ProfilesActionType.PROFILES_LIST_GET, () => getProfiles(DOMAIN_DEPENDENCIES)),
  createEpic<ProfileManagerNameList>(ProfilesActionType.PROFILES_GET_MANAGER_LIST, () =>
    getManagerNames(DOMAIN_DEPENDENCIES),
  ),
  createEpic<ProfileManagerNameList>(ProfilesActionType.PROFILES_GET_MANAGER_LIST_BY_ZEV_ID, (action) =>
    getManagerNamesByZevId(action.zevId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ProfileDetail>(ProfilesActionType.PROFILES_GET_BY_ID, (action) =>
    getProfileById(action.profileId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ProfilesActionType.PROFILES_DELETE_BY_ID, (action) =>
    deleteProfileById(action.profileId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ProfileUpsert>(ProfilesActionType.PROFILES_GET_UPDATE_BY_ID, (action) =>
    getProfileUpdateById(action.profileId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ProfilesActionType.PROFILES_UPDATE, (action) =>
    updateProfile(action.profileId, action.profileUpdate, DOMAIN_DEPENDENCIES),
  ),
  createEpic<string>(ProfilesActionType.PROFILES_CREATE, (action) =>
    createProfile(action.profile, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ProfilesActionType.PROFILES_CREATE_LOGIN_BY_ID, (action) =>
    createProfileLogin(action.profileId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ProfilesActionType.PROFILES_ACTIVATE, (action) =>
    activateProfile(action.profileId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ProfilesActionType.PROFILES_DEACTIVATE, (action) =>
    deactivateProfile(action.profileId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ProfilesActionType.PROFILES_RESET_PASSWORD, (action) =>
    resetPasswordProfile(action.profileId, DOMAIN_DEPENDENCIES),
  ),
]
