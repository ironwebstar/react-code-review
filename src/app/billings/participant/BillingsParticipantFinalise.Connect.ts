import { AppState } from "../../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { BillingsParticipantActionType } from "./BillingsParticipant.Epic"
import { BillingParticipantType } from "../../../domain/billings/participant/BillingsParticipant.Model"
import { BillingsParticipantFinaliseComponent } from "./BillingsParticipantFinalise.Component"
import { AppContainerActionType } from "../../appcontainer/AppContainer.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.billingsParticipantFinalise,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    sapSendWithConfirm: (
      billingId: string,
      billingParticipantType: BillingParticipantType,
      dialogBody: string,
      dialogCta: string,
    ) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        dialogBody: dialogBody,
        dialogCta: dialogCta,
        nextAction: {
          type: BillingsParticipantActionType.BILLINGS_PARTICIPANT_SAP_SEND,
          billingId: billingId,
          billingParticipantType: billingParticipantType,
        },
      })
    },
    sapSendWithOutConfirm: (billingId: string, billingParticipantType: BillingParticipantType) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_PARTICIPANT_SAP_SEND,
        billingId: billingId,
        billingParticipantType: billingParticipantType,
      })
    },
    getZevServiceComponentFeatures: (zevId: string) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_PARTICIPANT_GET_SERVICE_COMPONENT_FEATURES,
        zevId,
      })
    },
    getParticipantBillingFinalise: (billingId: string, billingParticipantType: BillingParticipantType) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_PARTICIPANT_FINALISE_GET,
        billingId: billingId,
        billingParticipantType: billingParticipantType,
      })
    },
    reopenParticipantBilling: (billingId: string, billingParticipantType: BillingParticipantType) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_PARTICIPANT_REOPEN,
        billingId: billingId,
        billingParticipantType: billingParticipantType,
      })
    },
    downloadAllParticipantsPdf: (billingId: string) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_PDF_GET,
        billingId: billingId,
      })
    },
    downloadAllParticipantsCsv: (billingId: string) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_CSV_GET,
        billingId: billingId,
      })
    },
    downloadBillPdf: (billId: string) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_BILL_PDF_GET,
        billId: billId,
      })
    },
    billPaid: (billId: string) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_BILL_PAID,
        billId: billId,
        paid: true,
      })
    },
    billUnpaid: (billId: string) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_BILL_PAID,
        billId: billId,
        paid: false,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingsParticipantFinaliseComponent)
