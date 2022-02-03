import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { push } from "connected-react-router"
import { AppState } from "../App.Reducer"
import { BuildingsListComponent } from "./BuildingsList.Component"
import { BuildingsActionType } from "./Buildings.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.buildingsList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getBuildings: () => {
      dispatch({
        type: BuildingsActionType.BUILDINGS_LIST_GET,
      })
    },
    navigateToBuilding: (zevId: string, buildingId: string) => {
      dispatch(push(`/zevs/${zevId}/buildings/${buildingId}`))
    },
    navigateToZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingsListComponent)
