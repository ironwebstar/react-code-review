import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { AppState } from "../App.Reducer"
import { MyProfileActionType } from "./MyProfile.Epic"
import { MyProfileDetailComponent } from "./MyProfileDetail.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.myProfileDetailView,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getMyProfile: () => {
      dispatch({
        type: MyProfileActionType.MY_PROFILE_GET,
      })
    },
    navigateToMyProfileUpdate: (myProfileId: string) => {
      dispatch(push(`/my-profile/${myProfileId}/update`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileDetailComponent)
