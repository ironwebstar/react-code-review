import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { push } from "connected-react-router"
import { AppState } from "../App.Reducer"
import { ConsumptionPointsActionType } from "./ConsumptionPoints.Epic"
import { ConsumptionPointsListComponent } from "./ConsumptionPointsList.Component"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.consumptionPointsList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getConsumptionPoints: () => {
      dispatch({
        type: ConsumptionPointsActionType.CONSUMPTION_POINTS_LIST_GET,
      })
    },
    navigateToZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
    navigateToBuilding: (zevId: string, buildingId: string) => {
      dispatch(push(`/zevs/${zevId}/buildings/${buildingId}`))
    },
    navigateToConsumptionPoint: (buildingId: string, consumptionPointId: string) => {
      dispatch(push(`/buildings/${buildingId}/consumptionpoints/${consumptionPointId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsumptionPointsListComponent)
