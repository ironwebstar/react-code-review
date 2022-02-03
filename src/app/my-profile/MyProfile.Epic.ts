import { createEpic } from "../Shared.Epic"
import { MyProfileModel } from "../../domain/my-profile/MyProfile.Model"
import { updateMyProfile, getMyProfile, getMyProfileUpsert } from "../../domain/my-profile/MyProfile.Repository"
import { DOMAIN_DEPENDENCIES } from "../App.Config"
import { ProfileUpsert } from "../../domain/profiles/Profiles.Model"

export enum MyProfileActionType {
  MY_PROFILE_GET = "MY_PROFILE_GET",
  MY_PROFILE_GET_UPDATE = "MY_PROFILE_GET_UPDATE",
  MY_PROFILE_UPDATE = "MY_PROFILE_UPDATE",
}

export const myProfileEpic = [
  createEpic<MyProfileModel>(MyProfileActionType.MY_PROFILE_GET, () => getMyProfile(DOMAIN_DEPENDENCIES)),
  createEpic<ProfileUpsert>(MyProfileActionType.MY_PROFILE_GET_UPDATE, () => getMyProfileUpsert(DOMAIN_DEPENDENCIES)),
  createEpic<boolean>(MyProfileActionType.MY_PROFILE_UPDATE, (action) =>
    updateMyProfile(action.profileId, action.profileUpsert, DOMAIN_DEPENDENCIES),
  ),
]
