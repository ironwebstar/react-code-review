import localeDateDE from "date-fns/locale/de"
import { parseISO } from "date-fns"
import { testDomainDependencies } from "../Domain.TestUtils"
import { tasksListMapper, taskListCompletedFilter, syncStatus } from "./TaskList.Mapper"
import { testConfig, tasksStub, zevStub } from "./Tasks.Stub"
import { StatusType } from "../Domain.Model"

const domainDependencies = testDomainDependencies()
const depsStub = {
  ...domainDependencies,
  config: { ...testConfig, locale: localeDateDE },
}
const taskItemListStub = tasksStub.map((task) => ({
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
}))

test("tasksListMapper", () => {
  const result = tasksListMapper(tasksStub, [zevStub], depsStub)
  expect(result).toEqual(taskItemListStub)
})

test("taskListCompletedFilter", () => {
  const result1 = taskListCompletedFilter(taskItemListStub, true)
  const result2 = taskListCompletedFilter(taskItemListStub, false)

  expect(result1).toEqual(taskItemListStub)
  expect(result2).toEqual(taskItemListStub.filter((task) => task.statusType === StatusType.CREATED))
})
