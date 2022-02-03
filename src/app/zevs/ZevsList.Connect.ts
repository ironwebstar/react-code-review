import { connect } from "react-redux"
import { ZevsListComponent } from "./ZevsList.Component"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { push } from "connected-react-router"
import { ZevsActionType } from "./Zevs.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.zevsList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getZevs: () => {
      dispatch({
        type: ZevsActionType.ZEVS_GET_LIST,
      })
    },
    navigateToCreateZev: () => {
      dispatch(push("/zevs/create"))
    },
    navigateToZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZevsListComponent)
