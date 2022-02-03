import { connect } from "react-redux"
import { ZevsCreateComponent } from "./ZevsCreate.Component"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { ZevsUpsert } from "../../domain/zevs/ZevsUpsert.Model"
import { ZevsActionType } from "./Zevs.Epic"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.zevsCreate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getZevProfilePrefill: (profileId?: string) => {
      dispatch({
        type: ZevsActionType.ZEVS_GET_PROFILE_PREFILL,
        profileId: profileId,
      })
    },
    createZev: (zevCreate: ZevsUpsert) => {
      dispatch({
        type: ZevsActionType.ZEVS_CREATE,
        zevCreate: zevCreate,
      })
    },
    navigateToZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZevsCreateComponent)
