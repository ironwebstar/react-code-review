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

export interface ProfilesZevManagerListState {
  viewState: ViewState<ProfileManagerNameList>
}

const initialState: ProfilesZevManagerListState = {
  viewState: initialViewState(),
}

export const profilesZevManagerListReducer = (
  state: ProfilesZevManagerListState = initialState,
  action: AnyAction,
): ProfilesZevManagerListState => {
  switch (action.type) {
    case asStarted(ProfilesActionType.PROFILES_GET_MANAGER_LIST_BY_ZEV_ID):
      return {
        ...state,
        viewState: startLoading<ProfileManagerNameList>(state.viewState),
      }
    case asSuccess(ProfilesActionType.PROFILES_GET_MANAGER_LIST_BY_ZEV_ID):
      return {
        ...state,
        viewState: withDomainResult<ProfileManagerNameList>(state.viewState, action.result),
      }
    case asError(ProfilesActionType.PROFILES_GET_MANAGER_LIST_BY_ZEV_ID):
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
