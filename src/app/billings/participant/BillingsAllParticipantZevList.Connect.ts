import { AppState } from "../../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { BillingsAllParticipantZevListComponent } from "./BillingsAllParticipantZevList.Component"
import { push } from "connected-react-router"
import { BillingsParticipantActionType } from "./BillingsParticipant.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.billingsAllParticipantZevList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getAllParticipantBillings: (zevId: string) => {
      dispatch({
        type: BillingsParticipantActionType.BILLINGS_ZEV_ALL_PARTICIPANT_LIST_GET,
        zevId: zevId,
      })
    },
    navigateToAllParticipantBilling: (zevId: string, billingId: string) => {
      dispatch(push(`/zevs/${zevId}/billings/all/${billingId}/edit`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingsAllParticipantZevListComponent)
