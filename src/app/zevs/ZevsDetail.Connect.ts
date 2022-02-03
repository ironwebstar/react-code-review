import { connect } from "react-redux"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { ZevsActionType } from "./Zevs.Epic"
import { ZevsDetailComponent } from "./ZevsDetail.Component"
import { push } from "connected-react-router"
import { AppContainerActionType } from "../appcontainer/AppContainer.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.zevsDetail,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getZev: (zevId: string) => {
      dispatch({
        type: ZevsActionType.ZEVS_GET_BY_ID,
        zevId: zevId,
      })
    },
    deleteZev: (zevId: string, dialogBody: string, dialogCta: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        dialogBody: dialogBody,
        dialogCta: dialogCta,
        nextAction: {
          type: ZevsActionType.ZEVS_DELETE_BY_ID,
          zevId: zevId,
        },
      })
    },
    activateZev: (zevId: string, billableFromDate?: number) => {
      dispatch({
        type: ZevsActionType.ZEVS_ACTIVATE_BY_ID,
        zevId: zevId,
        billableFromDate: billableFromDate,
      })
    },
    deactivateZev: (zevId: string, billableUntilDate: number) => {
      dispatch({
        type: ZevsActionType.ZEVS_DEACTIVATE_BY_ID,
        zevId: zevId,
        billableUntilDate: billableUntilDate,
      })
    },
    createInvoice: (zevId: string) => {
      dispatch({
        type: ZevsActionType.ZEVS_CREATE_INVOICE,
        zevId: zevId,
      })
    },
    navigateToUpdateZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}/update`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZevsDetailComponent)
