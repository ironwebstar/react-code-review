import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { AppState } from "../App.Reducer"
import { MyProfileActionType } from "./MyProfile.Epic"
import { MyProfileUpdateComponent } from "./MyProfileUpdate.Component"
import { ProfileUpsert } from "../../domain/profiles/Profiles.Model"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.myProfileUpdate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getMyProfile: (profileId: string) => {
      dispatch({
        type: MyProfileActionType.MY_PROFILE_GET_UPDATE,
        profileId: profileId,
      })
    },
    updateMyProfile: (profileId: string, profileUpsert: ProfileUpsert) => {
      dispatch({
        type: MyProfileActionType.MY_PROFILE_UPDATE,
        profileId: profileId,
        profileUpsert: profileUpsert,
      })
    },
    navigateToMyProfile: () => {
      dispatch(push("/my-profile"))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileUpdateComponent)
