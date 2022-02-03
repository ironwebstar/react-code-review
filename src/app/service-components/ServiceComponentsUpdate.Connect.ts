import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { ServiceComponentsActionType } from "./ServiceComponents.Epic"
import { ServiceComponentsUpdateComponent } from "./ServiceComponentsUpdate.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.serviceComponentUpdate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getServiceComponentById: (serviceComponentId: string) => {
      dispatch({
        type: ServiceComponentsActionType.SERVICE_COMPONENT_GET_BY_ID,
        serviceComponentId: serviceComponentId,
      })
    },
    updateServiceComponent: (serviceComponentId: string, name: string) => {
      dispatch({
        type: ServiceComponentsActionType.SERVICE_COMPONENT_UPDATE,
        serviceComponentId: serviceComponentId,
        name: name,
      })
    },
    navigateToServiceComponentUpdate: (serviceComponentId: string) => {
      dispatch(push(`/service-components/${serviceComponentId}/update`))
    },
    navigateToServiceComponent: (serviceComponentId: string) => {
      dispatch(push(`/service-components/${serviceComponentId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceComponentsUpdateComponent)
