import { connect } from "react-redux"
import { ServiceComponentSelectionComponent } from "./ServiceComponentSelection.Component"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { ServiceComponentsActionType } from "./ServiceComponents.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.serviceComponentsSelection,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getServiceComponents: () => {
      dispatch({
        type: ServiceComponentsActionType.SERVICE_COMPONENTS_GET,
        page: 1,
        limit: 100,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceComponentSelectionComponent)
