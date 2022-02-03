import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { AppState } from "../App.Reducer"
import { ProfilesActionType } from "./Profiles.Epic"
import { ProfileUpsert } from "../../domain/profiles/Profiles.Model"
import { ProfilesUpdateComponent } from "./ProfilesUpdate.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.profilesUpdate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getProfileUpdateById: (profileId: string) => {
      dispatch({
        type: ProfilesActionType.PROFILES_GET_UPDATE_BY_ID,
        profileId: profileId,
      })
    },
    updateProfile: (profileId: string, profileUpdate: ProfileUpsert) => {
      dispatch({
        type: ProfilesActionType.PROFILES_UPDATE,
        profileId: profileId,
        profileUpdate: profileUpdate,
      })
    },
    navigateToProfile: (profileId: string) => {
      dispatch(push(`/profiles/${profileId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesUpdateComponent)
