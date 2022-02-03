import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { BuildingsZevListComponent } from "./BuildingsZevList.Component"
import { BuildingsActionType } from "./Buildings.Epic"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.buildingsZevList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getZevBuildings: (zevId: string) => {
      dispatch({
        type: BuildingsActionType.BUILDINGS_LIST_GET_BY_ZEV_ID,
        zevId: zevId,
      })
    },
    navigateToBuilding: (zevId: string, buildingId: string) => {
      dispatch(push(`/zevs/${zevId}/buildings/${buildingId}`))
    },
    navigateToCreateBuilding: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}/buildings/create`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingsZevListComponent)
