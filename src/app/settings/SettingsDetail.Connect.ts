import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { push } from "connected-react-router"
import { SettingsDetailComponent } from "./SettingsDetail.Component"

const mapStateToProps = (state: AppState) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    navigateToChangePassword: () => {
      dispatch(push("/settings/reset-password"))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDetailComponent)
