import { connect } from "react-redux"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { ZevsActionType } from "./Zevs.Epic"
import { ZevsUpsert } from "../../domain/zevs/ZevsUpsert.Model"
import { ZevsUpdateComponent } from "./ZevsUpdate.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.zevsUpdate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getZevUpdate: (zevId: string) => {
      dispatch({
        type: ZevsActionType.ZEVS_GET_UPDATE_BY_ID,
        zevId: zevId,
      })
    },
    updateZev: (zevId: string, zevUpdate: ZevsUpsert) => {
      dispatch({
        type: ZevsActionType.ZEVS_UPDATE,
        zevId: zevId,
        zevUpdate: zevUpdate,
      })
    },
    navigateToZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZevsUpdateComponent)
