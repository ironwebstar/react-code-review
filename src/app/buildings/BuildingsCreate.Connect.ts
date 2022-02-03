import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { AppState } from "../App.Reducer"
import { BuildingsActionType } from "./Buildings.Epic"
import { BuildingUpsert } from "../../domain/buildings/Buildings.Model"
import { BuildingsCreateComponent } from "./BuildingsCreate.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.buildingsCreate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    createBuilding: (zevId: string, create: BuildingUpsert) => {
      dispatch({
        type: BuildingsActionType.BUILDINGS_CREATE,
        zevId: zevId,
        create: create,
      })
    },
    navigateToBuilding: (zevId: string, buildingId: string) => {
      dispatch(push(`/zevs/${zevId}/buildings/${buildingId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingsCreateComponent)
