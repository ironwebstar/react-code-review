import { connect } from "react-redux"
import { AuthLoginComponent } from "./AuthLogin.Component"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { push } from "connected-react-router"
import { AuthActionType } from "./Auth.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.authLogin,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    navigateToForgottenPassword: () => {
      dispatch(push("/reset-password"))
    },
    login: (emailAddress: string, password: string) => {
      dispatch({
        type: AuthActionType.AUTH_CREATE_SESSION,
        emailAddress: emailAddress,
        password: password,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoginComponent)
