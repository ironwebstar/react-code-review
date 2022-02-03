import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"

import { ConsumptionPointUpsert } from "../../domain/consumptionpoints/ConsumptionPoints.Model"

import { ConsumptionPointsActionType } from "./ConsumptionPoints.Epic"
import { ConsumptionPointCreateComponent } from "./ConsumptionPointCreate.Component"

const consumptionPointCreateMapStateToProps = (state: AppState) => {
  return {
    ...state.consumptionPointsCreate,
  }
}

export const consumptionPointCreateMapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    createConsumptionPoint: (buildingId: string, consumptionPoint: ConsumptionPointUpsert) => {
      dispatch({
        type: ConsumptionPointsActionType.CONSUMPTION_POINT_CREATE,
        buildingId,
        consumptionPoint,
      })
    },
    getConsumptionPointFormOptions: (buildingId: string) => {
      dispatch({
        type: ConsumptionPointsActionType.CONSUMPTION_POINT_GET_FORM_OPTIONS,
        buildingId,
      })
    },
  }
}

export const ConsumptionPointCreateConnect = connect(
  consumptionPointCreateMapStateToProps,
  consumptionPointCreateMapDispatchToProps,
)(ConsumptionPointCreateComponent)
