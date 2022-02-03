import { connect } from "react-redux"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { TaskListActionType } from "./TaskList.Epic"
import { TaskDetailComponent } from "./TaskDetail.Component"
import { push } from "connected-react-router"
import { AppContainerActionType } from "../appcontainer/AppContainer.Epic"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.taskDetail,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getTaskParticipant: (participantId: string) => {
      dispatch({
        type: TaskListActionType.TASK_GET_PARTICIPANT,
        participantId: participantId,
      })
    },
    navigateToParticipant: (participantId: string, zevId: string) => {
      dispatch(push(`/zevs/${zevId}/participant/${participantId}`))
    },
    completeTask: (taskId: number) => {
      dispatch({
        type: AppContainerActionType.APP_CONTAINER_CONFIRM_DIALOG_SHOW,
        nextAction: {
          type: TaskListActionType.TASK_COMPLETE,
          taskId: taskId,
        },
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailComponent)
