import { Grid, Box } from "@mui/material"
import { useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { StatusType } from "../../domain/Domain.Model"
import { TaskListItem } from "../../domain/tasks/TaskList.Model"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { TextButton } from "../../uikit/button/TextButton"
import { SkeletonWithChildren } from "../../uikit/progress/SkeletonWithChildren"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { Subtitle1 } from "../../uikit/typography/Typography"
import { firstViewStateMap } from "../Shared.Reducer"
import { coerce } from "../Shared.View"
import { mapDispatchToProps } from "./TaskDetail.Connect"
import { TaskDetailState } from "./TaskDetail.Reducer"

export interface TaskDetailComponentProps extends TaskDetailState, ReturnType<typeof mapDispatchToProps> {
  taskListItem: TaskListItem
}

export const TaskDetailComponent = (props: TaskDetailComponentProps) => {
  const { t } = useTranslation("tasklist")
  const {
    taskListItem,
    getTaskParticipant,
    taskParticipantViewState,
    navigateToParticipant,
    completeTask,
    completeTaskViewState,
  } = props
  useEffect(() => {
    if (firstViewStateMap(taskListItem.participantId, taskParticipantViewState)) {
      getTaskParticipant(taskListItem.participantId)
    }
  }, [taskParticipantViewState, getTaskParticipant])
  const completeTaskError = useMemo(
    () => completeTaskViewState.domainError.get(taskListItem.id),
    [completeTaskViewState],
  )
  const completeTaskSuccess = useMemo(
    () => completeTaskViewState.domainResult.get(taskListItem.id),
    [completeTaskViewState],
  )
  return (
    <>
      {completeTaskError && (
        <Box mb={1}>
          <ErrorAlert message={completeTaskError.message} />
        </Box>
      )}
      <Grid container justifyContent="space-between">
        <Box
          sx={{
            flex: 1,
          }}
        >
          {taskParticipantViewState.isLoading.get(taskListItem.participantId) && (
            <Box>
              <SkeletonWithChildren>
                <Subtitle1>{t("details.label.participants")}</Subtitle1>
              </SkeletonWithChildren>
              <SkeletonWithChildren>
                <TextButton noMarginLeft label={t("details.label.participants")} onClick={() => void 0} />
              </SkeletonWithChildren>
            </Box>
          )}
          {coerce(taskParticipantViewState.domainResult?.get(taskListItem.participantId), (participant) => (
            <Box>
              <Subtitle1 sx={{ fontWeight: "bold" }}>{t("details.label.participants")}</Subtitle1>
              <TextButton
                noMarginLeft
                label={participant.fullName}
                onClick={() => navigateToParticipant(participant.id, taskListItem.zevId)}
              />
            </Box>
          ))}
        </Box>
        <Box>
          {taskListItem.statusType === StatusType.CREATED && !completeTaskSuccess ? (
            <PrimaryButtonLoading
              isLoading={completeTaskViewState.isLoading.get(taskListItem.id) ?? false}
              label={t("details.action.cta")}
              onClick={() => completeTask(taskListItem.id)}
            />
          ) : (
            <></>
          )}
        </Box>
      </Grid>
    </>
  )
}
