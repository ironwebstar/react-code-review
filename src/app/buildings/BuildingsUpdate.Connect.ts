import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { AppState } from "../App.Reducer"
import { BuildingsActionType } from "./Buildings.Epic"
import { BuildingUpsert } from "../../domain/buildings/Buildings.Model"
import { BuildingsUpdateComponent } from "./BuildingsUpdate.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.buildingsUpdate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getBuildingUpsert: (buildingId: string) => {
      dispatch({
        type: BuildingsActionType.BUILDINGS_GET_UPDATE_BY_ID,
        buildingId: buildingId,
      })
    },
    updateBuilding: (buildingId: string, update: BuildingUpsert) => {
      dispatch({
        type: BuildingsActionType.BUILDINGS_UPDATE,
        buildingId: buildingId,
        update: update,
      })
    },
    navigateToBuilding: (zevId: string, buildingId: string) => {
      dispatch(push(`/zevs/${zevId}/buildings/${buildingId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingsUpdateComponent)
