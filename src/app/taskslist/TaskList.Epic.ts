import { completeTask, getTaskParticipant, getTasks } from "../../domain/tasks/Tasks.Repository"
import { DOMAIN_DEPENDENCIES } from "../App.Config"
import { createEpic } from "../Shared.Epic"
import { TaskList } from "../../domain/tasks/TaskList.Model"
import { TaskParticipant } from "../../domain/tasks/TaskList.Model"

export enum TaskListActionType {
  TASK_LIST_GET = "TASK_LIST_GET",
  TASK_LIST_EXPAND_ROW = "TASK_LIST_EXPAND_ROW",
  TASK_GET_PARTICIPANT = "TASK_GET_PARTICIPANT",
  TASK_COMPLETE = "TASK_COMPLETE",
}

export const taskListEpic = [
  createEpic<TaskList>(TaskListActionType.TASK_LIST_GET, (action) =>
    getTasks(action.showCompleted, DOMAIN_DEPENDENCIES),
  ),
  createEpic<TaskParticipant>(TaskListActionType.TASK_GET_PARTICIPANT, (action) =>
    getTaskParticipant(action.participantId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(TaskListActionType.TASK_COMPLETE, (action) => completeTask(action.taskId, DOMAIN_DEPENDENCIES)),
]
