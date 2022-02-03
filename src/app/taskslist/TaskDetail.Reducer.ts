import { AnyAction } from "redux"
import {
  asSuccess,
  asError,
  asStarted,
  ViewStateMap,
  startLoadingMap,
  withDomainResultMap,
  withDomainErrorMap,
  initialViewStateMap,
} from "../Shared.Reducer"
import { TaskListActionType } from "./TaskList.Epic"
import { TaskParticipant } from "../../domain/tasks/TaskList.Model"

export interface TaskDetailState {
  taskParticipantViewState: ViewStateMap<string, TaskParticipant>
  completeTaskViewState: ViewStateMap<number, boolean>
}

const initialState: TaskDetailState = {
  taskParticipantViewState: initialViewStateMap(),
  completeTaskViewState: initialViewStateMap(),
}

export const taskDetailReducer = (state: TaskDetailState = initialState, action: AnyAction): TaskDetailState => {
  switch (action.type) {
    case asStarted(TaskListActionType.TASK_GET_PARTICIPANT):
      return {
        ...state,
        taskParticipantViewState: startLoadingMap<string, TaskParticipant>(
          action.participantId,
          state.taskParticipantViewState,
        ),
      }
    case asSuccess(TaskListActionType.TASK_GET_PARTICIPANT):
      return {
        ...state,
        taskParticipantViewState: withDomainResultMap<string, TaskParticipant>(
          action.participantId,
          state.taskParticipantViewState,
          action.result,
        ),
      }
    case asError(TaskListActionType.TASK_GET_PARTICIPANT):
      return {
        ...state,
        taskParticipantViewState: withDomainErrorMap<string, TaskParticipant>(
          action.participantId,
          state.taskParticipantViewState,
          action.result,
        ),
      }
    case asStarted(TaskListActionType.TASK_COMPLETE):
      return {
        ...state,
        completeTaskViewState: startLoadingMap<number, boolean>(action.taskId, state.completeTaskViewState),
      }
    case asSuccess(TaskListActionType.TASK_COMPLETE):
      return {
        ...state,
        completeTaskViewState: withDomainResultMap<number, boolean>(
          action.taskId,
          state.completeTaskViewState,
          action.result,
        ),
      }
    case asError(TaskListActionType.TASK_COMPLETE):
      return {
        ...state,
        completeTaskViewState: withDomainErrorMap<number, boolean>(
          action.taskId,
          state.completeTaskViewState,
          action.result,
        ),
      }
    default:
      return {
        ...state,
      }
  }
}
