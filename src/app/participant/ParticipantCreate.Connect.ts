import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { ParticipantActionType } from "./Participant.Epic"
import { ParticipantUpsert } from "../../domain/participant/Participant.Model"
import { ParticipantCreateComponent } from "./ParticipantCreate.Component"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.participantCreate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    createParticipant: (zevId: string, create: ParticipantUpsert) => {
      dispatch({
        type: ParticipantActionType.PARTICIPANT_CREATE,
        zevId: zevId,
        create: create,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantCreateComponent)
