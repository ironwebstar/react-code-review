import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { ParticipantZevListComponent } from "./ParticipantZevList.Component"
import { ParticipantActionType } from "./Participant.Epic"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.participantZevList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getZevParticipants: (zevId: string) => {
      dispatch({
        type: ParticipantActionType.PARTICIPANT_LIST_GET_BY_ZEV_ID,
        zevId: zevId,
      })
    },
    navigateToParticipant: (zevId: string, participantId: string) => {
      dispatch(push(`/zevs/${zevId}/participant/${participantId}`))
    },
    navigateToCreateParticipant: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}/participant/create`))
    },
    getAllParticipantZevCsv: (zevId: string) => {
      dispatch({
        type: ParticipantActionType.PARTICIPANT_DOWNLOAD,
        zevId,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantZevListComponent)
