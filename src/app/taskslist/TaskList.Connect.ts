import { connect } from "react-redux"
import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { TaskListActionType } from "./TaskList.Epic"
import { TaskListComponent } from "./TaskList.Component"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.taskList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getTasks: () => {
      dispatch({
        type: TaskListActionType.TASK_LIST_GET,
        showCompleted: true,
      })
    },
    getPendingTasks: () => {
      dispatch({
        type: TaskListActionType.TASK_LIST_GET,
        showCompleted: false,
      })
    },
    expandTaskRow: (taskId: number, expanded: boolean) => {
      dispatch({
        type: TaskListActionType.TASK_LIST_EXPAND_ROW,
        taskId: taskId,
        expanded: expanded,
      })
    },
    zevSelected: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListComponent)
