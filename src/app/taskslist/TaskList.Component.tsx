import { TaskListState } from "./TaskList.Reducer"
import { useTranslation } from "react-i18next"
import { useEffect, useMemo, useState } from "react"
import { firstViewState } from "../Shared.Reducer"
import { PaperBox } from "../../uikit/page/PaperBox"
import TableContainer from "@mui/material/TableContainer"
import { TableColumnSort, TableHeaderView } from "../../uikit/table/Table.HeaderView"
import { TableRowView } from "../../uikit/table/Table.RowView"
import { ORDERED_NUMBER_COMPARATOR, ORDERED_STRING_COMPARATOR } from "../../domain/Domain.Comparators"
import { PageRowSlice, TablePaginationView } from "../../uikit/table/Table.PaginationView"
import { TaskListItem } from "../../domain/tasks/TaskList.Model"
import { TableRowErrorAlert } from "../../uikit/Shared.Alert"
import { SwitchToggleView } from "../../uikit/toggle/SwitchToggleView"
import { SmallPaddedHorizontalBox } from "../../uikit/box/PaddedBox"
import { TaskListRowView } from "./views/TaskListRowView"
import { TableFixed } from "../../uikit/table/Table.Fixed"
import { DEFAULT_ROWS_PER_PAGE } from "../../uikit/Shared.Consts"
import { mapDispatchToProps } from "./TaskList.Connect"
import { PageHeaderBox } from "../../uikit/page/PageHeaderBox"
import { PageHeader } from "../../uikit/typography/Header"

interface TaskListComponentProps extends TaskListState, ReturnType<typeof mapDispatchToProps> {}

enum TaskListColumns {
  ID = "ID",
  STATUS_TYPE = "STATUS_TYPE",
  DATE = "DATE",
  EVENT = "EVENT",
  ZEV = "ZEV",
  SYNC = "SYNC",
}

export const TaskListComponent = (props: TaskListComponentProps) => {
  const { t } = useTranslation("tasklist")
  const { viewState, getTasks, getPendingTasks, expandTaskRow, expandedRows, zevSelected } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getTasks()
    }
  }, [viewState])

  const taskList = useMemo(
    () =>
      viewState.domainResult?.tasks?.map((task) => ({
        ...task,
        sortableStatusType: `status.${task.statusType}`,
        event: t(`state.${task.event}`),
      })) ?? [],
    [viewState],
  )

  const [orderBy, setOrderBy] = useState<TableColumnSort<TaskListColumns>>({
    column: TaskListColumns.ID,
    direction: "asc",
  })

  const [pageRowSlice, setPageRowSlice] = useState<PageRowSlice>({
    start: 0,
    end: DEFAULT_ROWS_PER_PAGE,
  })

  const headers = [
    {
      column: TaskListColumns.ID,
      label: t("list.label.id"),
      width: "5%",
    },
    {
      column: TaskListColumns.STATUS_TYPE,
      label: t("list.label.status"),
      width: "15%",
    },
    {
      column: TaskListColumns.DATE,
      label: t("list.label.date"),
      width: "10%",
    },
    {
      column: TaskListColumns.EVENT,
      label: t("list.label.event"),
      width: "20%",
    },
    {
      column: TaskListColumns.ZEV,
      label: t("field.label.zev"),
      width: "45%",
    },
    {
      column: TaskListColumns.SYNC,
      label: t("list.label.sync"),
      width: "5%",
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case TaskListColumns.ID:
        return (a: TaskListItem, b: TaskListItem) => ORDERED_NUMBER_COMPARATOR(a.id, b.id, orderBy.direction)
      case TaskListColumns.STATUS_TYPE:
        return (a: TaskListItem, b: TaskListItem) =>
          ORDERED_STRING_COMPARATOR(a.statusType, b.statusType, orderBy.direction)
      case TaskListColumns.DATE:
        return (a: TaskListItem, b: TaskListItem) =>
          ORDERED_NUMBER_COMPARATOR(a.sortableDate, b.sortableDate, orderBy.direction)
      case TaskListColumns.EVENT:
        return (a: TaskListItem, b: TaskListItem) => ORDERED_STRING_COMPARATOR(a.event, b.event, orderBy.direction)
      case TaskListColumns.ZEV:
        return (a: TaskListItem, b: TaskListItem) => ORDERED_STRING_COMPARATOR(a.zevName, b.zevName, orderBy.direction)
      case TaskListColumns.SYNC:
        return (a: TaskListItem, b: TaskListItem) => ORDERED_NUMBER_COMPARATOR(a.sync, b.sync, orderBy.direction)
    }
  }

  return (
    <PaperBox>
      <PageHeaderBox>
        <PageHeader id="list-title">{t("list.title")}</PageHeader>
      </PageHeaderBox>
      <SmallPaddedHorizontalBox>
        <SwitchToggleView
          label={t("list.toggle.showcompleted")}
          onChange={(checked) => (checked ? getTasks() : getPendingTasks())}
        />
      </SmallPaddedHorizontalBox>
      <TableContainer>
        <TableFixed>
          <TableHeaderView<TaskListColumns>
            isLoading={viewState.isLoading}
            headers={headers}
            orderBy={orderBy}
            orderByChanged={(orderBy) => setOrderBy(orderBy)}
          />
          {viewState.domainError && (
            <TableRowErrorAlert colSpan={6} retry={() => getTasks()} message={viewState.domainError.message} />
          )}
          <TableRowView<TaskListItem>
            colSpan={6}
            rows={taskList}
            pageRowSlice={pageRowSlice}
            comparator={columnComparator}
            render={(taskListItem) => (
              <TaskListRowView
                key={taskListItem.id}
                taskListItem={taskListItem}
                taskExpanded={expandedRows.get(taskListItem.id) === true}
                rowClick={(taskListItem) =>
                  expandTaskRow(taskListItem.id, !(expandedRows.get(taskListItem.id) === true))
                }
                zevSelected={zevSelected}
              />
            )}
          />
        </TableFixed>
        <TablePaginationView rowCount={taskList.length} onPageRowSliceChanged={setPageRowSlice} />
      </TableContainer>
    </PaperBox>
  )
}
