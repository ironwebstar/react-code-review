import { LOCATION_CHANGE } from "connected-react-router"
import { AnyAction } from "redux"
import { ProfileList, ProfileStatusType } from "../../domain/profiles/Profiles.Model"
import {
  asSuccess,
  asError,
  asStarted,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
  initialViewState,
  ViewStateMap,
  initialViewStateMap,
  startLoadingMap,
  withDomainErrorMap,
  withDomainResultMap,
  showAlertForRoute,
} from "../Shared.Reducer"
import { ProfilesActionType } from "./Profiles.Epic"

export interface ProfilesListState {
  viewState: ViewState<ProfileList>
  activateViewStateMap: ViewStateMap<string, boolean>
  deactivateViewStateMap: ViewStateMap<string, boolean>
  showDeleteAlert: boolean
}

const initialState: ProfilesListState = {
  viewState: initialViewState(),
  activateViewStateMap: initialViewStateMap(),
  deactivateViewStateMap: initialViewStateMap(),
  showDeleteAlert: false,
}

export const profilesListReducer = (state: ProfilesListState = initialState, action: AnyAction): ProfilesListState => {
  switch (action.type) {
    case asStarted(ProfilesActionType.PROFILES_LIST_GET):
      return {
        ...state,
        viewState: startLoading<ProfileList>(state.viewState),
      }
    case asSuccess(ProfilesActionType.PROFILES_LIST_GET):
      return {
        ...state,
        viewState: withDomainResult<ProfileList>(state.viewState, action.result),
      }
    case asError(ProfilesActionType.PROFILES_LIST_GET):
      return {
        ...state,
        viewState: withDomainError<ProfileList>(state.viewState, action.result),
      }
    case asSuccess(ProfilesActionType.PROFILES_DELETE_BY_ID):
      return {
        ...state,
        showDeleteAlert: true,
      }
    case asStarted(ProfilesActionType.PROFILES_ACTIVATE):
      return {
        ...state,
        activateViewStateMap: startLoadingMap<string, boolean>(action.profileId, state.activateViewStateMap),
      }
    case asSuccess(ProfilesActionType.PROFILES_ACTIVATE):
      return {
        ...state,
        activateViewStateMap: withDomainResultMap<string, boolean>(
          action.profileId,
          state.activateViewStateMap,
          action.result,
        ),
        viewState: {
          ...state.viewState,
          domainResult: state.viewState.domainResult && {
            ...state.viewState.domainResult,
            profiles: state.viewState.domainResult.profiles.map((profile) => {
              if (profile.id !== action.profileId) return profile
              return {
                ...profile,
                profileStatusType: ProfileStatusType.ACTIVE,
              }
            }),
          },
        },
      }
    case asError(ProfilesActionType.PROFILES_ACTIVATE):
      return {
        ...state,
        activateViewStateMap: withDomainErrorMap<string, boolean>(
          action.profileId,
          state.activateViewStateMap,
          action.result,
        ),
      }
    case asStarted(ProfilesActionType.PROFILES_DEACTIVATE):
      return {
        ...state,
        deactivateViewStateMap: startLoadingMap<string, boolean>(action.profileId, state.deactivateViewStateMap),
      }
    case asSuccess(ProfilesActionType.PROFILES_DEACTIVATE):
      return {
        ...state,
        deactivateViewStateMap: withDomainResultMap<string, boolean>(
          action.profileId,
          state.deactivateViewStateMap,
          action.result,
        ),
        viewState: {
          ...state.viewState,
          domainResult: state.viewState.domainResult && {
            ...state.viewState.domainResult,
            profiles: state.viewState.domainResult.profiles.map((profile) => {
              if (profile.id !== action.profileId) return profile
              return {
                ...profile,
                profileStatusType: ProfileStatusType.BLOCKED,
              }
            }),
          },
        },
      }
    case asError(ProfilesActionType.PROFILES_DEACTIVATE):
      return {
        ...state,
        deactivateViewStateMap: withDomainErrorMap<string, boolean>(
          action.profileId,
          state.deactivateViewStateMap,
          action.result,
        ),
      }
    case LOCATION_CHANGE:
      return {
        ...initialState,
        showDeleteAlert: showAlertForRoute(state.showDeleteAlert, "profiles", action.payload.location.pathname),
      }
    default:
      return {
        ...state,
      }
  }
}
