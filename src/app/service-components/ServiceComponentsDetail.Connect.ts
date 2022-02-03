import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { ServiceComponentsActionType } from "./ServiceComponents.Epic"
import { ServiceComponentsDetailComponent } from "./ServiceComponentsDetail.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.serviceComponentDetail,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getServiceComponent: (serviceComponentId: string) => {
      dispatch({
        type: ServiceComponentsActionType.SERVICE_COMPONENT_GET_BY_ID,
        serviceComponentId: serviceComponentId,
      })
    },
    navigateToServiceComponentUpdate: (serviceComponentId: string) => {
      dispatch(push(`/service-components/${serviceComponentId}/update`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceComponentsDetailComponent)
