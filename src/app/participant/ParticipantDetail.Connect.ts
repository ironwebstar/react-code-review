import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { ParticipantActionType } from "./Participant.Epic"
import { ParticipantDetailComponent } from "./ParticipantDetail.Component"
import { push } from "connected-react-router"
import { AppContainerActionType } from "../appcontainer/AppContainer.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.participantDetail,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getParticipant: (participantId: string) => {
      dispatch({
        type: ParticipantActionType.PARTICIPANT_GET_BY_ID,
        participantId: participantId,
      })
    },
    syncParticipant: (participantId: string) => {
      dispatch({
        type: ParticipantActionType.PARTICIPANT_SYNC,
        participantId: participantId,
      })
    },
    deleteParticipant: (participantId: string, dialogBody: string, dialogCta: string) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        dialogBody: dialogBody,
        dialogCta: dialogCta,
        nextAction: {
          type: ParticipantActionType.PARTICIPANT_DELETE,
          participantId: participantId,
        },
      })
    },
    navigateToZev: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
    navigateToUpdateParticipant: (zevId: string, participantId: string) => {
      dispatch(push(`/zevs/${zevId}/participant/${participantId}/update`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantDetailComponent)
