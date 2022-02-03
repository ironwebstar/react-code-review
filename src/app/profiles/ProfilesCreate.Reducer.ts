import { AnyAction } from "redux"
import { LOCATION_CHANGE } from "connected-react-router"
import {
  asSuccess,
  asError,
  asStarted,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
  initialViewState,
} from "../Shared.Reducer"
import { ProfilesActionType } from "./Profiles.Epic"

export interface ProfilesCreateState {
  createProfileViewState: ViewState<string>
}

const initialState: ProfilesCreateState = {
  createProfileViewState: initialViewState(),
}

export const profilesCreateReducer = (
  state: ProfilesCreateState = initialState,
  action: AnyAction,
): ProfilesCreateState => {
  switch (action.type) {
    case asStarted(ProfilesActionType.PROFILES_CREATE):
      return {
        ...state,
        createProfileViewState: startLoading<string>(state.createProfileViewState),
      }
    case asSuccess(ProfilesActionType.PROFILES_CREATE):
      return {
        ...state,
        createProfileViewState: withDomainResult<string>(state.createProfileViewState, action.result),
      }
    case asError(ProfilesActionType.PROFILES_CREATE):
      return {
        ...state,
        createProfileViewState: withDomainError<string>(state.createProfileViewState, action.result),
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
