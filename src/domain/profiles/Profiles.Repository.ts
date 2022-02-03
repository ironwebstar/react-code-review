import { from, Observable } from "rxjs"
import { map, mergeMap } from "rxjs/operators"
import { apiCall, apiHeaders } from "../Domain.Calls"
import { DomainDependencies } from "../Domain.Dependencies"
import { DomainResponse } from "../Domain.Response"
import { managerNamesMapper, profileDetailMapper, profileListItemMapper, profileUpdateMapper } from "./Profiles.Mapper"
import { ProfileDetail, ProfileList, ProfileManagerNameList, ProfileUpsert } from "./Profiles.Model"
import { PersonalDataSalutationEnum, UserType } from "../../data/generated-sources/openapi"
import { santiseEmptyValues } from "../Domain.Mapper"

export const getProfiles = (deps: DomainDependencies): Observable<DomainResponse<ProfileList>> => {
  return apiCall(
    from(deps.adminProfileApi.getAllProfiles(1, 10000, undefined, apiHeaders(deps))).pipe(
      map((allProfilesResponse) => ({
        profiles: allProfilesResponse.data.elements.map((profile) => profileListItemMapper(profile, deps)),
        page: allProfilesResponse.data.page,
      })),
    ),
  )
}

export const getProfileById = (
  profileId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ProfileDetail>> => {
  return apiCall(
    from(deps.adminProfileApi.getAdminProfileById(profileId, apiHeaders(deps))).pipe(
      map((profileResponse) => profileDetailMapper(profileResponse.data, deps)),
    ),
  )
}

export const getProfileUpdateById = (
  profileId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ProfileUpsert>> => {
  return apiCall(
    from(deps.adminProfileApi.getAdminProfileById(profileId, apiHeaders(deps))).pipe(
      map((profileResponse) => profileUpdateMapper(profileResponse.data)),
    ),
  )
}

export const updateProfile = (
  profileId: string,
  profileUpdate: ProfileUpsert,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminProfileApi.updateAdminProfileById(
        profileId,
        santiseEmptyValues({
          contact: {
            email: profileUpdate.email,
            telephone: profileUpdate.telephone,
            mobile: profileUpdate.mobile,
          },
          address: {
            street: profileUpdate.street,
            houseNumber: profileUpdate.houseNumber,
            postalCode: profileUpdate.postalCode,
            city: profileUpdate.city,
          },
          personal: {
            salutation: PersonalDataSalutationEnum[profileUpdate.salutation as keyof typeof PersonalDataSalutationEnum],
            title: profileUpdate.title,
            firstName: profileUpdate.firstName,
            lastName: profileUpdate.lastName,
          },
        }),
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const createProfile = (profile: ProfileUpsert, deps: DomainDependencies): Observable<DomainResponse<string>> => {
  return apiCall(
    from(
      deps.adminProfileApi.createProfile(
        santiseEmptyValues({
          userType: UserType[profile.userType as keyof typeof UserType],
          contact: {
            email: profile.email,
            telephone: profile.telephone,
            mobile: profile.mobile,
          },
          address: {
            street: profile.street,
            houseNumber: profile.houseNumber,
            postalCode: profile.postalCode,
            city: profile.city,
          },
          personal: {
            salutation: PersonalDataSalutationEnum[profile.salutation as keyof typeof PersonalDataSalutationEnum],
            title: profile.title,
            firstName: profile.firstName,
            lastName: profile.lastName,
          },
        }),
        undefined,
        undefined,
        apiHeaders(deps),
      ),
    ).pipe(map((url) => url.data.split("/").pop() ?? "")),
  )
}

export const deleteProfileById = (profileId: string, deps: DomainDependencies): Observable<DomainResponse<boolean>> => {
  return apiCall(from(deps.adminProfileApi.deleteProfileById(profileId, apiHeaders(deps))).pipe(map(() => true)))
}

export const createProfileLogin = (
  profileId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminProfileApi.createAdminProfileLoginById(profileId, apiHeaders(deps))).pipe(map(() => true)),
  )
}

export const activateProfile = (profileId: string, deps: DomainDependencies): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminProfileApi.blockunblockProfileById(profileId, "unblock", apiHeaders(deps))).pipe(map(() => true)),
  )
}

export const deactivateProfile = (profileId: string, deps: DomainDependencies): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminProfileApi.blockunblockProfileById(profileId, "block", apiHeaders(deps))).pipe(map(() => true)),
  )
}

export const resetPasswordProfile = (
  profileId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminProfileApi.adminProfileResetPassword(profileId, apiHeaders(deps))).pipe(map(() => true)),
  )
}

export const getManagerNames = (deps: DomainDependencies): Observable<DomainResponse<ProfileManagerNameList>> => {
  return apiCall(
    from(deps.adminProfileApi.getAllProfiles(1, 10000, undefined, apiHeaders(deps))).pipe(
      map((allProfilesResponse) => ({
        profiles: managerNamesMapper(allProfilesResponse.data, deps),
      })),
    ),
  )
}

export const getManagerNamesByZevId = (
  zevId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ProfileManagerNameList>> => {
  const authHeaders = apiHeaders(deps)
  return apiCall(
    from(deps.adminZevApi.adminGetZevById(zevId, authHeaders)).pipe(
      mergeMap((zev) =>
        from(deps.adminProfileApi.getAllProfiles(1, 10000, undefined, authHeaders)).pipe(
          map((allProfilesResponse) => ({
            profiles: managerNamesMapper(allProfilesResponse.data, deps).filter((profile) =>
              zev.data.managers.includes(profile.id),
            ),
          })),
        ),
      ),
    ),
  )
}
