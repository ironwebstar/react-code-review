import { TaskSyncStatus } from "../../../domain/tasks/TaskList.Model"
import { StatusIndicator } from "../../../uikit/indicator/StatusIndicator"

interface TaskListSyncIndicatorProps {
  sync: TaskSyncStatus
}

export const TaskListSyncIndicator = (props: TaskListSyncIndicatorProps) => {
  const { sync } = props
  switch (sync) {
    case TaskSyncStatus.NOT_SYNCED:
      return <StatusIndicator color={"red"} />
    case TaskSyncStatus.SYNCED:
      return <StatusIndicator color={"green"} />
    case TaskSyncStatus.UNKNOWN:
    default:
      return <StatusIndicator color={"grey"} />
  }
}
