import { AppState } from "../../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { BillingsInitialListComponent } from "./BillingsInitialList.Component"
import { BillingsInitialActionType } from "./BillingsInitial.Epic"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.billingsInitialList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getInitialBillings: () => {
      dispatch({
        type: BillingsInitialActionType.BILLINGS_INITIAL_LIST_GET,
      })
    },
    navigateToInitialBilling: (billingId: string) => {
      dispatch(push(`/billings/initial/details/${billingId}`))
    },
    navigateToZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingsInitialListComponent)
