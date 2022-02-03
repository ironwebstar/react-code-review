import { from, map, mergeMap, Observable } from "rxjs"
import { DomainResponse } from "../Domain.Response"
import { apiCall, apiHeaders } from "../Domain.Calls"
import { DomainDependencies } from "../Domain.Dependencies"
import { TaskList } from "./TaskList.Model"
import { taskListCompletedFilter, tasksListMapper } from "./TaskList.Mapper"
import { TaskParticipant } from "./TaskList.Model"

export const getTasks = (showCompleted: boolean, deps: DomainDependencies): Observable<DomainResponse<TaskList>> => {
  return apiCall(
    from(deps.adminTasksApi.getAdminTasks(apiHeaders(deps))).pipe(
      mergeMap((tasksResponse) =>
        from(deps.adminZevApi.adminGetZevs(1, 10000, undefined, apiHeaders(deps))).pipe(
          map((zevsResponse) => ({
            tasks: taskListCompletedFilter(
              tasksListMapper(tasksResponse.data.tasks, zevsResponse.data.elements, deps),
              showCompleted,
            ),
          })),
        ),
      ),
    ),
  )
}

export const getTaskParticipant = (
  participantId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<TaskParticipant>> => {
  return apiCall(
    from(deps.adminParticipantsApi.adminGetParticipantById(participantId, apiHeaders(deps))).pipe(
      map((participant) => ({
        id: participant.data.id,
        fullName: `${participant.data.personalData.firstName} ${participant.data.personalData.lastName}`,
      })),
    ),
  )
}

export const completeTask = (taskId: number, deps: DomainDependencies): Observable<DomainResponse<boolean>> => {
  return apiCall(from(deps.adminTasksApi.completeAdminTaskById(taskId, apiHeaders(deps))).pipe(map(() => true)))
}
