import { DomainDependencies } from "../Domain.Dependencies"
import { from, map, Observable } from "rxjs"
import { DomainResponse } from "../Domain.Response"
import { apiCall, apiHeaders } from "../Domain.Calls"
import { MyProfileModel } from "./MyProfile.Model"
import { myProfileMapper } from "./MyProfile.Mapper"
import { ProfileUpsert } from "../profiles/Profiles.Model"
import { profileUpdateMapper } from "../profiles/Profiles.Mapper"
import { UserType } from "../../data/generated-sources/openapi"
import { updateProfile } from "../profiles/Profiles.Repository"

export const getMyProfile = (deps: DomainDependencies): Observable<DomainResponse<MyProfileModel>> => {
  return apiCall(
    from(deps.adminProfileApi.getAdminProfile(apiHeaders(deps))).pipe(
      map((adminProfileResponse) => myProfileMapper(adminProfileResponse.data, deps)),
    ),
  )
}

export const getMyProfileUpsert = (deps: DomainDependencies): Observable<DomainResponse<ProfileUpsert>> => {
  return apiCall(
    from(deps.adminProfileApi.getAdminProfile(apiHeaders(deps))).pipe(
      map((adminProfileResponse) => profileUpdateMapper(adminProfileResponse.data)),
    ),
  )
}

/**
 * When an Admin updates their own profile, they are not given the option
 * to change their email address.
 */
export const updateMyProfile = (
  profileId: string,
  profileUpdate: ProfileUpsert,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  if (profileUpdate.userType === UserType.ADMIN) {
    return updateProfile(
      profileId,
      {
        ...profileUpdate,
        email: "",
      },
      deps,
    )
  }
  return updateProfile(profileId, profileUpdate, deps)
}
