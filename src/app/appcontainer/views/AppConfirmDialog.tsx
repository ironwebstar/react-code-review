import { AnyAction } from "redux"
import { Dialog, DialogActions, DialogContent, DialogContentText, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { SmallPaddedBox } from "../../../uikit/box/PaddedBox"
import { PrimaryButton } from "../../../uikit/button/PrimaryButton"
import { SecondaryButton } from "../../../uikit/button/SecondaryButton"

export interface AppConfirmDialogState {
  dialogBody?: string
  dialogCta?: string
  nextAction: AnyAction
}

interface AppConfirmDialogProps {
  appConfirmDialog?: AppConfirmDialogState
  dialogAbortClick: () => void
  dialogConfirmClick: () => void
}

export const AppConfirmDialog = (props: AppConfirmDialogProps) => {
  const { t } = useTranslation("shared")
  const { appConfirmDialog, dialogAbortClick, dialogConfirmClick } = props
  return (
    <Dialog open={appConfirmDialog !== undefined} onClose={dialogAbortClick} fullWidth maxWidth="xs">
      <SmallPaddedBox>
        <Typography id="app-dialog-title" variant="h3">
          {t("dialog.confirm.title")}
        </Typography>
      </SmallPaddedBox>
      {appConfirmDialog?.dialogBody && (
        <DialogContent>
          <DialogContentText id="app-dialog-body">{appConfirmDialog.dialogBody}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <SecondaryButton id="app-dialog-abort" label={t("button.abort")} onClick={dialogAbortClick} />
        <PrimaryButton
          id="app-dialog-cta"
          label={appConfirmDialog?.dialogCta ? appConfirmDialog.dialogCta : t("dialog.confirm.cta")}
          onClick={dialogConfirmClick}
          autoFocus
        />
      </DialogActions>
    </Dialog>
  )
}
