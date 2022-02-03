import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { ZevsActionType } from "./Zevs.Epic"
import { AppState } from "../App.Reducer"
import { ZevsDetailInitialBillingsComponent } from "./ZevsDetailInitialBillings.Component"
import { push } from "connected-react-router"
const mapStateToProps = (state: AppState) => {
  return {
    ...state.zevsDetailInitialBilling,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getInitialBillings: (zevId: string) => {
      dispatch({
        type: ZevsActionType.ZEVS_DETAIL_INITIAL_SERVICE_INVOICE,
        zevId: zevId,
      })
    },
    navigateToInitialBilling: (billingId: string) => {
      dispatch(push(`/billings/initial/details/${billingId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZevsDetailInitialBillingsComponent)
