import { Map } from "immutable"
import { AnyAction } from "redux"
import {
  asSuccess,
  asError,
  asStarted,
  startLoading,
  ViewState,
  withDomainError,
  withDomainResult,
  initialViewState,
} from "../Shared.Reducer"
import { TaskListActionType } from "./TaskList.Epic"
import { TaskList } from "../../domain/tasks/TaskList.Model"
import { StatusType } from "../../domain/Domain.Model"

export interface TaskListState {
  viewState: ViewState<TaskList>
  expandedRows: Map<number, boolean>
}

export const initialState: TaskListState = {
  viewState: initialViewState(),
  expandedRows: Map(),
}

export const taskListReducer = (state: TaskListState = initialState, action: AnyAction): TaskListState => {
  switch (action.type) {
    case asStarted(TaskListActionType.TASK_LIST_GET):
      return {
        ...state,
        viewState: startLoading<TaskList>(state.viewState),
      }
    case asSuccess(TaskListActionType.TASK_LIST_GET):
      return {
        ...state,
        viewState: withDomainResult<TaskList>(state.viewState, action.result),
      }
    case asError(TaskListActionType.TASK_LIST_GET):
      return {
        ...state,
        viewState: withDomainError<TaskList>(state.viewState, action.result),
      }
    case TaskListActionType.TASK_LIST_EXPAND_ROW:
      return {
        ...state,
        expandedRows: state.expandedRows.set(action.taskId, action.expanded),
      }
    case asSuccess(TaskListActionType.TASK_COMPLETE):
      return {
        ...state,
        viewState: updateCompletedTask(action.taskId, state.viewState),
      }
    default:
      return {
        ...state,
      }
  }
}

const updateCompletedTask = (completedId: number, taskListStatus: ViewState<TaskList>): ViewState<TaskList> => {
  const currentTasks = taskListStatus.domainResult?.tasks ?? []
  return {
    ...taskListStatus,
    domainResult: {
      tasks: currentTasks.map((task) => {
        if (task.id === completedId) {
          return {
            ...task,
            statusType: StatusType.DONE,
          }
        } else {
          return task
        }
      }),
    },
  }
}
