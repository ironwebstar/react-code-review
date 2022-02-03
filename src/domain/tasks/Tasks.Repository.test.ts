import { lastValueFrom } from "rxjs"
import { parseISO } from "date-fns"
import * as sinon from "sinon"
import { AdminTasksApi, AdminZevApi, AdminParticipantsApi } from "../../data/generated-sources/openapi/api"
import { ajaxSuccess, testDomainDependencies } from "../Domain.TestUtils"
import { getTasks, getTaskParticipant, completeTask } from "./Tasks.Repository"
import { pageStub, tasksStub, zevStub, participantStub } from "./Tasks.Stub"
import { StatusType } from "../Domain.Model"
import { TaskSyncStatus } from "./TaskList.Model"
import { syncStatus } from "./TaskList.Mapper"

const domainDependencies = testDomainDependencies()

test("getTasks", async () => {
  // given
  const adminTasksApiStub = sinon.createStubInstance(AdminTasksApi)
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminTasksApiStub.getAdminTasks.returns(
    ajaxSuccess({
      id: "task",
      tasks: tasksStub,
    }),
  )
  adminZevApiStub.adminGetZevs.withArgs(1, 10000, undefined).returns(
    ajaxSuccess({
      page: pageStub,
      elements: [zevStub],
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminTasksApi: adminTasksApiStub,
    adminZevApi: adminZevApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result1 = getTasks(false, depsStub)
  const result2 = getTasks(true, depsStub)

  await expect(lastValueFrom(result1)).resolves.toEqual({
    result: {
      tasks: [
        {
          id: tasksStub[0].id,
          statusType: StatusType[tasksStub[0].status],
          sortableStatusType: tasksStub[0].status.toString(),
          date: "23. Dec 2021",
          sortableDate: parseISO(tasksStub[0].createdAt).getTime(),
          event: tasksStub[0].type,
          participantId: tasksStub[0].reference,
          zevId: zevStub.id,
          zevName: zevStub.name,
          sync: TaskSyncStatus.SYNCED,
        },
      ],
    },
    type: "ok",
  })

  await expect(lastValueFrom(result2)).resolves.toEqual({
    result: {
      tasks: tasksStub.map((task) => {
        return {
          id: task.id,
          statusType: StatusType[task.status],
          sortableStatusType: task.status.toString(),
          date: "23. Dec 2021",
          sortableDate: parseISO(task.createdAt).getTime(),
          event: task.type,
          participantId: task.reference,
          zevId: zevStub.id,
          zevName: zevStub.name,
          sync: syncStatus(task.participantSapSyncStatus),
        }
      }),
    },
    type: "ok",
  })
})

test("getTaskParticipant", async () => {
  // given
  const adminParticipantsApiStub = sinon.createStubInstance(AdminParticipantsApi)
  adminParticipantsApiStub.adminGetParticipantById.withArgs(participantStub.id).returns(ajaxSuccess(participantStub))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminParticipantsApi: adminParticipantsApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = getTaskParticipant(participantStub.id, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    result: {
      id: participantStub.id,
      fullName: `${participantStub.personalData.firstName} ${participantStub.personalData.lastName}`,
    },
    type: "ok",
  })
})

test("completeTask", async () => {
  // given
  const adminTasksApiStub = sinon.createStubInstance(AdminTasksApi)
  adminTasksApiStub.completeAdminTaskById.withArgs(tasksStub[0].id).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminTasksApi: adminTasksApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
  }

  // when
  const result = completeTask(tasksStub[0].id, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    result: true,
    type: "ok",
  })
})
