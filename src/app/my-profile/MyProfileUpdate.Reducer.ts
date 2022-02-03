import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ProfileUpsert } from "../../domain/profiles/Profiles.Model"
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
import { MyProfileActionType } from "./MyProfile.Epic"

export interface MyProfileUpdateState {
  getMyProfileUpsertViewState: ViewState<ProfileUpsert>
  updateViewState: ViewState<ProfileUpsert>
}

const initialState: MyProfileUpdateState = {
  getMyProfileUpsertViewState: initialViewState(),
  updateViewState: initialViewState(),
}

export const myProfileUpdateReducer = (
  state: MyProfileUpdateState = initialState,
  action: AnyAction,
): MyProfileUpdateState => {
  switch (action.type) {
    case asStarted(MyProfileActionType.MY_PROFILE_GET_UPDATE):
      return {
        ...state,
        getMyProfileUpsertViewState: startLoading<ProfileUpsert>(state.getMyProfileUpsertViewState),
      }
    case asSuccess(MyProfileActionType.MY_PROFILE_GET_UPDATE):
      return {
        ...state,
        getMyProfileUpsertViewState: withDomainResult<ProfileUpsert>(state.getMyProfileUpsertViewState, action.result),
      }
    case asError(MyProfileActionType.MY_PROFILE_GET_UPDATE):
      return {
        ...state,
        getMyProfileUpsertViewState: withDomainError<ProfileUpsert>(state.getMyProfileUpsertViewState, action.result),
      }
    case asStarted(MyProfileActionType.MY_PROFILE_UPDATE):
      return {
        ...state,
        updateViewState: startLoading<ProfileUpsert>(state.updateViewState),
      }
    case asSuccess(MyProfileActionType.MY_PROFILE_UPDATE):
      return {
        ...state,
        updateViewState: withDomainResult<ProfileUpsert>(state.updateViewState, action.result),
      }
    case asError(MyProfileActionType.MY_PROFILE_UPDATE):
      return {
        ...state,
        updateViewState: withDomainError<ProfileUpsert>(state.updateViewState, action.result),
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
      }
    default:
      return {
        ...state,
      }
  }
}
