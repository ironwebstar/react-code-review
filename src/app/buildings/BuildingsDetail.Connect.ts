import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { BuildingsDetailComponent } from "./BuildingsDetail.Component"
import { BuildingsActionType } from "./Buildings.Epic"
import { push } from "connected-react-router"
import { AppContainerActionType } from "../appcontainer/AppContainer.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.buildingsDetail,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getBuilding: (zevId: string, buildingId: string) => {
      dispatch({
        type: BuildingsActionType.BUILDINGS_GET_BY_ID,
        zevId,
        buildingId,
      })
    },
    deactivateBuilding: (buildingId: string, fromDate: number) => {
      dispatch({
        type: BuildingsActionType.BUILDINGS_DEACTIVATE,
        buildingId,
        fromDate,
      })
    },
    deleteBuilding: (buildingId: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        nextAction: {
          type: BuildingsActionType.BUILDINGS_DELETE,
          buildingId,
        },
      })
    },
    navigateToZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
    navigateToConsumptionPoint: (buildingId: string, consumptionPointId: string) => {
      dispatch(push(`/buildings/${buildingId}/consumptionpoints/${consumptionPointId}`))
    },
    navigateToUpdateBuilding: (zevId: string, buildingId: string) => {
      dispatch(push(`/zevs/${zevId}/buildings/${buildingId}/update`))
    },
    navigateToCreateConsumptionPoint: (buildingId: string) => {
      dispatch(push(`/buildings/${buildingId}/consumptionpoint/create`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingsDetailComponent)
