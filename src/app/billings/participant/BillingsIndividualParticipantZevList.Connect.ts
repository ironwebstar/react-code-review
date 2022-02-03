import { AppState } from "../../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { push } from "connected-react-router"
import { BillingsParticipantActionType } from "./BillingsParticipant.Epic"
import { BillingsIndividualParticipantZevListComponent } from "./BillingsIndividualParticipantZevList.Component"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.billingsIndividualParticipantZevList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getIndividualParticipantBillings: (zevId: string) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_ZEV_INDIVIDUAL_PARTICIPANT_LIST_GET,
        zevId: zevId,
      })
    },
    navigateToIndividualParticipantBilling: (zevId: string, billingId: string) => {
      dispatch(push(`/zevs/${zevId}/billings/individual/${billingId}/edit`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingsIndividualParticipantZevListComponent)
