import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { ServiceComponentsActionType } from "./ServiceComponents.Epic"
import { ServiceComponentsListComponent } from "./ServiceComponentsList.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.serviceComponentsList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getServiceComponents: () => {
      dispatch({
        type: ServiceComponentsActionType.SERVICE_COMPONENTS_GET,
      })
    },
    navigateToServiceComponent: (serviceComponentId: string) => {
      dispatch(push(`/service-components/${serviceComponentId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceComponentsListComponent)
