import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import {
  asError,
  asStarted,
  asSuccess,
  initialViewState,
  showAlertForRoute,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
} from "../Shared.Reducer"
import { MyProfileModel } from "../../domain/my-profile/MyProfile.Model"
import { MyProfileActionType } from "./MyProfile.Epic"

export interface MyProfileDetailState {
  getMyProfileViewState: ViewState<MyProfileModel>
  showUpdateAlert: boolean
}

const initialState: MyProfileDetailState = {
  getMyProfileViewState: initialViewState(),
  showUpdateAlert: false,
}

export const myProfileDetailReducer = (
  state: MyProfileDetailState = initialState,
  action: AnyAction,
): MyProfileDetailState => {
  switch (action.type) {
    case asStarted(MyProfileActionType.MY_PROFILE_GET):
      return {
        ...state,
        getMyProfileViewState: startLoading<MyProfileModel>(state.getMyProfileViewState),
      }
    case asSuccess(MyProfileActionType.MY_PROFILE_GET):
      return {
        ...state,
        getMyProfileViewState: withDomainResult<MyProfileModel>(state.getMyProfileViewState, action.result),
      }
    case asError(MyProfileActionType.MY_PROFILE_GET):
      return {
        ...state,
        getMyProfileViewState: withDomainError<MyProfileModel>(state.getMyProfileViewState, action.result),
      }
    case asSuccess(MyProfileActionType.MY_PROFILE_UPDATE):
      return {
        ...state,
        showUpdateAlert: true,
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        showUpdateAlert: showAlertForRoute(state.showUpdateAlert, "my-profile", action.payload.location.pathname),
      }
    default:
      return {
        ...state,
      }
  }
}
