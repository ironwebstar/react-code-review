import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { ConsumptionPointsActionType } from "./ConsumptionPoints.Epic"
import { ConsumptionPointUpdateComponent } from "./ConsumptionPointUpdate.Component"
import { ConsumptionPointUpsert } from "../../domain/consumptionpoints/ConsumptionPoints.Model"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.consumptionPointUpdate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getConsumptionPointUpdate: (consumptionPointId: string) => {
      dispatch({
        type: ConsumptionPointsActionType.CONSUMPTION_POINT_GET_UPDATE_BY_ID,
        consumptionPointId,
      })
    },
    updateConsumptionPoint: (consumptionPointId: string, update: ConsumptionPointUpsert) => {
      dispatch({
        type: ConsumptionPointsActionType.CONSUMPTION_POINT_UPDATE,
        consumptionPointId,
        update,
      })
    },
    getConsumptionPointFormOptions: (buildingId: string) => {
      dispatch({
        type: ConsumptionPointsActionType.CONSUMPTION_POINT_GET_FORM_OPTIONS,
        buildingId,
      })
    },
    navigateToConsumptionPoint: (buildingId: string, consumptionPointId: string) => {
      dispatch(push(`/buildings/${buildingId}/consumptionpoints/${consumptionPointId}`))
    },
  }
}

export const ConsumptionPointUpdateConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConsumptionPointUpdateComponent)
