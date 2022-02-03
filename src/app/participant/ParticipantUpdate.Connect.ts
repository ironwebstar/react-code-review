import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { ParticipantActionType } from "./Participant.Epic"
import { ParticipantUpdateComponent } from "./ParticipantUpdate.Component"
import { ParticipantUpsert } from "../../domain/participant/Participant.Model"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.participantUpdate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getParticipantUpdate: (participantId: string) => {
      dispatch({
        type: ParticipantActionType.PARTICIPANT_GET_UPDATE_BY_ID,
        participantId: participantId,
      })
    },
    updateParticipant: (participantId: string, update: ParticipantUpsert) => {
      dispatch({
        type: ParticipantActionType.PARTICIPANT_UPDATE,
        participantId: participantId,
        update: update,
      })
    },
    navigateToParticipant: (zevId: string, participantId: string) => {
      dispatch(push(`/zevs/${zevId}/participant/${participantId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantUpdateComponent)
