import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { push } from "connected-react-router"

import { AppState } from "../App.Reducer"
import { ConsumptionPointsActionType } from "./ConsumptionPoints.Epic"

import { ParticipationsComponent } from "./ConsumptionPointsParticipations.Component"
import { AppContainerActionType } from "../appcontainer/AppContainer.Epic"
import { ConsumptionPointMoveIn, ConsumptionPointMoveOut } from "../../domain/consumptionpoints/ConsumptionPoints.Model"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.consumptionPointsParticipationsData,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getParticipations: (consumptionPointId: string) => {
      dispatch({
        type: ConsumptionPointsActionType.CONSUMPTION_POINTS_GET_PARTICIPATIONS,
        consumptionPointId,
      })
    },
    deleteParticipation: (consumptionPointId: string, participationId: string, dialogBody: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        dialogBody: dialogBody,
        nextAction: {
          type: ConsumptionPointsActionType.CONSUMPTION_POINTS_DELETE_PARTICIPATION_BY_ID,
          consumptionPointId,
          participationId,
        },
      })
    },
    participationMoveOut: (
      consumptionPointId: string,
      participationId: string,
      consumptionPointMoveOut: ConsumptionPointMoveOut,
    ) => {
      dispatch({
        type: ConsumptionPointsActionType.CONSUMPTION_POINT_PARTICIPATION_MOVE_OUT,
        consumptionPointMoveOut: consumptionPointMoveOut,
        consumptionPointId,
        participationId,
      })
    },
    participantMoveIn: (
      consumptionPointId: string,
      participationId: string,
      consumptionPointMoveIn: ConsumptionPointMoveIn,
    ) => {
      dispatch({
        type: ConsumptionPointsActionType.CONSUMPTION_POINT_PARTICIPATION_MOVE_IN,
        consumptionPointMoveIn,
        consumptionPointId,
        participationId,
      })
    },
    navigateToParticipant: (zevId: string, participantId: string) => {
      dispatch(push(`/zevs/${zevId}/participant/${participantId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipationsComponent)
