import {
  asError,
  asStarted,
  asSuccess,
  initialViewState,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
} from "../Shared.Reducer"
import { AnyAction } from "redux"
import { LOCATION_CHANGE } from "connected-react-router"
import { ProfilesActionType } from "./Profiles.Epic"
import { ProfileUpsert } from "../../domain/profiles/Profiles.Model"

export interface ProfilesUpdateState {
  getProfileViewState: ViewState<ProfileUpsert>
  updateProfileViewState: ViewState<ProfileUpsert>
}

const initialState: ProfilesUpdateState = {
  getProfileViewState: initialViewState(),
  updateProfileViewState: initialViewState(),
}

export const profilesUpdateReducer = (
  state: ProfilesUpdateState = initialState,
  action: AnyAction,
): ProfilesUpdateState => {
  switch (action.type) {
    case asStarted(ProfilesActionType.PROFILES_GET_UPDATE_BY_ID):
      return {
        ...state,
        getProfileViewState: startLoading<ProfileUpsert>(state.getProfileViewState),
      }
    case asSuccess(ProfilesActionType.PROFILES_GET_UPDATE_BY_ID):
      return {
        ...state,
        getProfileViewState: withDomainResult<ProfileUpsert>(state.getProfileViewState, action.result),
      }
    case asError(ProfilesActionType.PROFILES_GET_UPDATE_BY_ID):
      return {
        ...state,
        getProfileViewState: withDomainError<ProfileUpsert>(state.getProfileViewState, action.result),
      }
    case asStarted(ProfilesActionType.PROFILES_UPDATE):
      return {
        ...state,
        updateProfileViewState: startLoading<ProfileUpsert>(state.updateProfileViewState),
      }
    case asSuccess(ProfilesActionType.PROFILES_UPDATE):
      return {
        ...state,
        updateProfileViewState: withDomainResult<ProfileUpsert>(state.updateProfileViewState, action.result),
      }
    case asError(ProfilesActionType.PROFILES_UPDATE):
      return {
        ...state,
        updateProfileViewState: withDomainError<ProfileUpsert>(state.updateProfileViewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
