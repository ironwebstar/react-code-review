import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"

import { AppState } from "../App.Reducer"
import { ProfilesActionType } from "./Profiles.Epic"
import { ProfilesListComponent } from "./ProfilesList.Component"
import { push } from "connected-react-router"
import { AppContainerActionType } from "../appcontainer/AppContainer.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.profilesList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getProfiles: () => {
      dispatch({
        type: ProfilesActionType.PROFILES_LIST_GET,
      })
    },
    activateProfile: (profileId: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        nextAction: {
          type: ProfilesActionType.PROFILES_ACTIVATE,
          profileId: profileId,
        },
      })
    },
    directActivateProfile: (profileId: string) => {
      dispatch({
        type: ProfilesActionType.PROFILES_ACTIVATE,
        profileId: profileId,
      })
    },
    deactivateProfile: (profileId: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        nextAction: {
          type: ProfilesActionType.PROFILES_DEACTIVATE,
          profileId: profileId,
        },
      })
    },
    directDeactivateProfile: (profileId: string) => {
      dispatch({
        type: ProfilesActionType.PROFILES_DEACTIVATE,
        profileId: profileId,
      })
    },
    navigateToProfileDetail: (profileId: string) => {
      dispatch(push(`/profiles/${profileId}`))
    },
    navigateToCreateProfile: () => {
      dispatch(push("/profiles/create"))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesListComponent)
