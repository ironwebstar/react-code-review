import { connect } from "react-redux"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { AuthActionType } from "./Auth.Epic"
import { AuthNewAccountPasswordComponent } from "./AuthNewAccountPassword.Component"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.authNewAccountPassword,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    newAccountPassword: (token: string, newPassword: string) => {
      dispatch({
        type: AuthActionType.AUTH_NEW_ACCOUNT_PASSWORD,
        token: token,
        newPassword: newPassword,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthNewAccountPasswordComponent)
