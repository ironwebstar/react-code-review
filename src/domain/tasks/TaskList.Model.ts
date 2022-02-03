import { StatusType } from "../Domain.Model"

export interface TaskList {
  tasks: TaskListItem[]
}

export interface TaskListItem {
  id: number
  statusType: StatusType
  sortableStatusType: string
  date: string
  sortableDate: number
  event: string
  zevId: string
  zevName: string
  participantId: string
  sync: TaskSyncStatus
}

export interface TaskParticipant {
  id: string
  fullName: string
}

export enum TaskSyncStatus {
  SYNCED = 0,
  NOT_SYNCED = 1,
  UNKNOWN = 2,
}
