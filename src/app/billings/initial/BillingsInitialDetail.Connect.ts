import { AppState } from "../../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { BillingsInitialDetailComponent } from "./BillingsInitialDetail.Component"
import { push } from "connected-react-router"
import { BillingsInitialActionType } from "./BillingsInitial.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.billingsInitialDetail,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getInitialBilling: (billingId: string) => {
      dispatch({
        type: BillingsInitialActionType.BILLINGS_INITIAL_GET_BY_ID,
        billingId: billingId,
      })
    },
    navigateToZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
    recalculateInitialBillingById: (billingId: string) => {
      dispatch({
        type: BillingsInitialActionType.BILLINGS_INITIAL_RECALCULATE,
        billingId: billingId,
      })
    },
    approveInitialBillingById: (billingId: string) => {
      dispatch({
        type: BillingsInitialActionType.BILLINGS_INITIAL_APPROVE_BY_ID,
        billingId: billingId,
      })
    },
    cancelInitialBillingById: (billingId: string) => {
      dispatch({
        type: BillingsInitialActionType.BILLINGS_INITIAL_CANCEL_BY_ID,
        billingId: billingId,
      })
    },
    submitInitialBillingToSAP: (billingId: string) => {
      dispatch({
        type: BillingsInitialActionType.BILLINGS_INITIAL_SUBMIT_TO_SAP,
        billingId: billingId,
      })
    },
    deleteInitialBillingById: (billingId: string) => {
      dispatch({
        type: BillingsInitialActionType.BILLINGS_INITIAL_DELETE_BY_ID,
        billingId: billingId,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingsInitialDetailComponent)
