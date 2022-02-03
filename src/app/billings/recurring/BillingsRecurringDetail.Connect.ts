import { AppState } from "../../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { push } from "connected-react-router"
import { connect } from "react-redux"
import { BillingsRecurringDetailComponent } from "./BillingsRecurringDetail.Component"
import { BillingsRecurringActionType } from "./BillingsRecurring.Epic"
import { AppContainerActionType } from "../../appcontainer/AppContainer.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.billingsRecurringDetail,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getRecurringBilling: (billingId: string) => {
      dispatch({
        type: BillingsRecurringActionType.BILLINGS_RECURRING_GET_BY_ID,
        billingId,
      })
    },
    expandBillingServiceRow: (serviceBillingId: string, expanded: boolean) => {
      dispatch({
        type: BillingsRecurringActionType.BILLINGS_SERVICES_EXPAND_ROW,
        serviceBillingId,
        expanded,
      })
    },
    deleteBillingsRecurringById: (billingId: string, dialogBody: string, dialogCta: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        dialogBody: dialogBody,
        dialogCta: dialogCta,
        nextAction: {
          type: BillingsRecurringActionType.BILLINGS_RECURRING_DELETE_BY_ID,
          billingId,
        },
      })
    },
    approveServiceBillingsRunById: (billingId: string) => {
      dispatch({
        type: BillingsRecurringActionType.BILLINGS_RECURRING_APPROVE_BY_ID,
        billingId,
      })
    },
    sapSendAllServiceBillings: (billingId: string) => {
      dispatch({
        type: BillingsRecurringActionType.BILLINGS_RECURRING_SAP_SEND_ALL,
        billingId,
      })
    },
    sapSendServiceBillingsById: (serviceBillingId: string) => {
      dispatch({
        type: BillingsRecurringActionType.BILLINGS_RECURRING_SAP_SEND_BY_ID,
        serviceBillingId,
      })
    },
    recalculateServiceBillingsById: (serviceBillingId: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        nextAction: {
          type: BillingsRecurringActionType.BILLINGS_RECURRING_RECALCULATE_BY_ID,
          serviceBillingId,
        },
      })
    },
    cancelServiceBillingsById: (serviceBillingId: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        nextAction: {
          type: BillingsRecurringActionType.BILLINGS_RECURRING_CANCEL_BY_ID,
          serviceBillingId,
        },
      })
    },
    removeServiceBillingRunZevById: (serviceBillingId: string, zevId: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        nextAction: {
          type: BillingsRecurringActionType.BILLINGS_RECURRING_RUN_REMOVE_BY_ID,
          serviceBillingId,
          zevId,
        },
      })
    },
    navigateToZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingsRecurringDetailComponent)
