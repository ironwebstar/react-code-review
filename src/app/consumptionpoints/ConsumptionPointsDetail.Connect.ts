import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { push } from "connected-react-router"
import { AppState } from "../App.Reducer"
import { ConsumptionPointsActionType } from "./ConsumptionPoints.Epic"
import { ConsumptionPointsDetailComponent } from "./ConsumptionPointsDetail.Component"
import { AppContainerActionType } from "../appcontainer/AppContainer.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.consumptionPointsDetail,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getConsumptionPoint: (buildingId: string, consumptionPointId: string) => {
      dispatch({
        type: ConsumptionPointsActionType.CONSUMPTION_POINTS_GET_BY_ID,
        buildingId,
        consumptionPointId,
      })
    },
    deactivateConsumptionPoint: (consumptionPointId: string, fromDate: number) => {
      dispatch({
        type: ConsumptionPointsActionType.CONSUMPTION_POINT_DEACTIVATE_BY_ID,
        consumptionPointId,
        fromDate,
      })
    },
    deleteConsumptionPoint: (consumptionPointId: string, dialogBody: string, dialogCta: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        dialogBody: dialogBody,
        dialogCta: dialogCta,
        nextAction: {
          type: ConsumptionPointsActionType.CONSUMPTION_POINT_DELETE_BY_ID,
          consumptionPointId,
        },
      })
    },
    navigateToBuilding: (zevId: string, buildingId: string) => {
      dispatch(push(`/zevs/${zevId}/buildings/${buildingId}`))
    },
    navigateToParticipant: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
    navigateToUpdateConsumptionPoint: (buildingId: string, consumptionPointId: string) => {
      dispatch(push(`/buildings/${buildingId}/consumptionpoints/${consumptionPointId}/update`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsumptionPointsDetailComponent)
