import { Task, ZevAdminResponse } from "../../data/generated-sources/openapi"
import { TaskListItem, TaskSyncStatus } from "./TaskList.Model"
import { apiFormattedDateToTimestamp, appFormattedDate } from "../Domain.Formatters"
import { DomainDependencies } from "../Domain.Dependencies"
import { StatusType } from "../Domain.Model"

export const tasksListMapper = (tasks: Task[], zevs: ZevAdminResponse[], deps: DomainDependencies): TaskListItem[] =>
  tasks.map((task) => {
    const zev = zevs.find((zev) => task.zevId === zev.id)
    return {
      id: task.id,
      statusType: StatusType[task.status],
      sortableStatusType: task.status.toString(),
      date: appFormattedDate(task.createdAt, deps),
      sortableDate: apiFormattedDateToTimestamp(task.createdAt),
      event: task.type,
      participantId: task.reference,
      zevId: zev?.id ?? "",
      zevName: zev ? zev.name : "",
      sync: syncStatus(task.participantSapSyncStatus),
    }
  })

export const syncStatus = (participantSapSyncStatus?: boolean) => {
  if (participantSapSyncStatus === undefined) return TaskSyncStatus.UNKNOWN
  if (participantSapSyncStatus) return TaskSyncStatus.SYNCED
  return TaskSyncStatus.NOT_SYNCED
}

export const taskListCompletedFilter = (tasks: TaskListItem[], showCompleted: boolean): TaskListItem[] => {
  if (showCompleted) return tasks
  return tasks.filter((task) => task.statusType === StatusType.CREATED)
}
