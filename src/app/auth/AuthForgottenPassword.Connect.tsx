import { connect } from "react-redux"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { push } from "connected-react-router"
import { AuthActionType } from "./Auth.Epic"
import { AuthForgottenPasswordComponent } from "./AuthForgottenPassword.Component"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.authForgottenPassword,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    navigateToLogin: () => {
      dispatch(push("/signin"))
    },
    forgottenPassword: (emailAddress: string) => {
      dispatch({
        type: AuthActionType.AUTH_FORGOTTEN_PASSWORD,
        emailAddress: emailAddress,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForgottenPasswordComponent)
