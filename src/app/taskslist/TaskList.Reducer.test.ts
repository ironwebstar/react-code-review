import { StatusType } from "../../domain/Domain.Model"
import { TaskListItem, TaskSyncStatus } from "../../domain/tasks/TaskList.Model"
import { taskListReducer, initialState } from "./TaskList.Reducer"

test("The TASK_COMPLETE success action updates the task list item status to COMPLETED", () => {
  const task: TaskListItem = {
    id: 0,
    statusType: StatusType.CREATED,
    sortableStatusType: "CREATED",
    date: "01-02-2021",
    sortableDate: 0,
    event: "event",
    zevId: "zevId",
    zevName: "zevName",
    participantId: "participantId",
    sync: TaskSyncStatus.SYNCED,
  }
  const taskListState = {
    ...initialState,
    viewState: {
      isLoading: false,
      domainResult: {
        tasks: [
          {
            ...task,
            id: 0,
          },
          {
            ...task,
            id: 1,
          },
          {
            ...task,
            id: 2,
          },
        ],
      },
    },
  }
  const result = taskListReducer(taskListState, {
    type: "TASK_COMPLETE_SUCCESS",
    taskId: 1,
  })
  expect(result).toEqual({
    ...taskListState,
    viewState: {
      ...taskListState.viewState,
      domainResult: {
        tasks: [
          {
            ...task,
            id: 0,
          },
          {
            ...task,
            id: 1,
            statusType: StatusType.DONE,
          },
          {
            ...task,
            id: 2,
          },
        ],
      },
    },
  })
})
