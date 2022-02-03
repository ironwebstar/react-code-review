import { AppState } from "../../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { BillingsParticipantActionType } from "./BillingsParticipant.Epic"
import { BillingsParticipantDetailComponent } from "./BillingsParticipantDetail.Component"
import { push } from "connected-react-router"
import { PricePackageUpsert } from "../../../domain/prices/Prices.Model"
import { BillingParticipantType } from "../../../domain/billings/participant/BillingsParticipant.Model"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.billingsParticipantDetail,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getParticipantBilling: (billingId: string, billingParticipantType: BillingParticipantType) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_PARTICIPANT_GET,
        billingParticipantType: billingParticipantType,
        billingId: billingId,
      })
    },
    suspendParticipantBilling: (billingId: string, billingParticipantType: BillingParticipantType) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_PARTICIPANT_SUSPEND,
        billingParticipantType: billingParticipantType,
        billingId: billingId,
      })
    },
    unsuspendParticipantBilling: (billingId: string, billingParticipantType: BillingParticipantType) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_PARTICIPANT_UNSUSPEND,
        billingParticipantType: billingParticipantType,
        billingId: billingId,
      })
    },
    approveParticipantBilling: (billingId: string, billingParticipantType: BillingParticipantType) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_PARTICIPANT_APPROVE,
        billingParticipantType: billingParticipantType,
        billingId: billingId,
      })
    },
    updateParticipantPrices: (billingId: string, pricesUpsert: PricePackageUpsert) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_ALL_PARTICIPANT_UPDATE_PRICES,
        billingId: billingId,
        pricesUpsert: pricesUpsert,
      })
    },
    navigateToConsumptionPoint: (buildingId: string, consumptionPointId: string) => {
      dispatch(push(`/buildings/${buildingId}/consumptionpoints/${consumptionPointId}`))
    },
    navigateToUpdateZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}/update`))
    },
    downloadBillPdf: (billId: string) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_BILL_PDF_GET,
        billId: billId,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingsParticipantDetailComponent)
