import { TableCell, TableRow } from "@mui/material"
import { useState } from "react"
import { TaskListItem } from "../../../domain/tasks/TaskList.Model"
import { AlignEndBox } from "../../../uikit/box/AlignmentBox"
import { OpenButton } from "../../../uikit/button/OpenButton"
import { StatusView } from "../../../uikit/label/StatusView"
import { TableRowClickable } from "../../../uikit/table/Table.RowView"
import TaskDetailConnect from "../TaskDetail.Connect"
import { TaskListSyncIndicator } from "./TaskListSyncIndicator"

interface TaskListRowViewProps {
  taskListItem: TaskListItem
  taskExpanded: boolean
  rowClick: (item: TaskListItem) => void
  zevSelected: (zevId: string) => void
}

export const TaskListRowView = (props: TaskListRowViewProps) => {
  const { taskListItem, taskExpanded, rowClick, zevSelected } = props
  const [cellExpanded, setCellExpanded] = useState(taskExpanded)
  return (
    <>
      <TableRowClickable
        rowData={taskListItem}
        rowClick={(item) => {
          setCellExpanded(!cellExpanded)
          rowClick(item)
        }}
      >
        <TableCell align="left">{taskListItem.id}</TableCell>
        <TableCell align="left">
          <StatusView statusType={taskListItem.statusType} />
        </TableCell>
        <TableCell align="left">{taskListItem.date}</TableCell>
        <TableCell align="left">{taskListItem.event}</TableCell>
        <TableCell align="left">
          <OpenButton label={taskListItem.zevName} open={() => zevSelected(taskListItem.zevId)} />
        </TableCell>
        <TableCell align="left">
          <TaskListSyncIndicator sync={taskListItem.sync} />
        </TableCell>
      </TableRowClickable>
      {cellExpanded && (
        <TableRow>
          <TableCell colSpan={4}></TableCell>
          <TableCell colSpan={2}>
            <AlignEndBox>
              <TaskDetailConnect taskListItem={taskListItem} />
            </AlignEndBox>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
