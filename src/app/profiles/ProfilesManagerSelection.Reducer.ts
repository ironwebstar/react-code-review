import { AnyAction } from "redux"
import { ProfileManagerNameList } from "../../domain/profiles/Profiles.Model"
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

export interface ProfilesManagerSelectionState {
  viewState: ViewState<ProfileManagerNameList>
}

const initialState: ProfilesManagerSelectionState = {
  viewState: initialViewState(),
}

export const profilesManagerSelectionReducer = (
  state: ProfilesManagerSelectionState = initialState,
  action: AnyAction,
): ProfilesManagerSelectionState => {
  switch (action.type) {
    case asStarted(ProfilesActionType.PROFILES_GET_MANAGER_LIST):
      return {
        ...state,
        viewState: startLoading<ProfileManagerNameList>(state.viewState),
      }
    case asSuccess(ProfilesActionType.PROFILES_GET_MANAGER_LIST):
      return {
        ...state,
        viewState: withDomainResult<ProfileManagerNameList>(state.viewState, action.result),
      }
    case asError(ProfilesActionType.PROFILES_GET_MANAGER_LIST):
      return {
        ...state,
        viewState: withDomainError<ProfileManagerNameList>(state.viewState, action.result),
      }
    default:
      return {
        ...state,
      }
  }
}
