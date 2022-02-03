import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { ZevsActionType } from "./Zevs.Epic"
import { AppState } from "../App.Reducer"
import { ZevsDetailRecurringBillingsComponent } from "./ZevsDetailRecurringBillings.Component"
import { push } from "connected-react-router"
const mapStateToProps = (state: AppState) => {
  return {
    ...state.zevsDetailRecurringBilling,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getRecurringBillings: (zevId: string) => {
      dispatch({
        type: ZevsActionType.ZEVS_DETAIL_RECURRING_SERVICE_INVOICE,
        zevId: zevId,
      })
    },
    navigateToRecurringBilling: (billingId: string) => {
      dispatch(push(`/billings/initial/details/${billingId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZevsDetailRecurringBillingsComponent)
