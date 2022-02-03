import { Dialog, Typography, DialogContent, DialogActions } from "@mui/material"
import { Formik } from "formik"
import { useTranslation } from "react-i18next"
import { SmallPaddedBox } from "../../../uikit/box/PaddedBox"
import { PrimaryButton } from "../../../uikit/button/PrimaryButton"
import { SecondaryButton } from "../../../uikit/button/SecondaryButton"
import { FormView, FormRowColumn, FormRowCell } from "../../../uikit/form/FormView"
import { SingleLineDatePicker } from "../../../uikit/input/SingleLineDatePicker"
import { validateZevActivate } from "./ZevActivateForm.Validation"

interface ZevActivateFormProps {
  open: boolean
  onClose: () => void
  confirmClick: (billableFromDate: number) => void
}

export const ZevActivateForm = (props: ZevActivateFormProps) => {
  const { t } = useTranslation("zevs")
  const { open, onClose, confirmClick } = props
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <SmallPaddedBox>
        <Typography variant="h3">{t("details.activate.dialog.title")}</Typography>
      </SmallPaddedBox>
      <Formik
        initialValues={{
          billableFromDate: new Date().getTime(),
        }}
        onSubmit={(values) => confirmClick(values.billableFromDate)}
      >
        {({ values, touched, handleBlur, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <FormView>
                <FormRowColumn>
                  <FormRowCell>
                    <SingleLineDatePicker
                      required
                      name="billableFromDate"
                      label={t("form.field.billableFromDate")}
                      value={values.billableFromDate}
                      helperText={validateZevActivate.billableFromDate(
                        values.billableFromDate,
                        touched.billableFromDate,
                        t,
                      )}
                      onChange={(value) => setFieldValue("billableFromDate", value)}
                      onBlur={handleBlur}
                    />
                  </FormRowCell>
                </FormRowColumn>
              </FormView>
            </DialogContent>
            <DialogActions>
              <SecondaryButton label={t("shared:button.abort")} onClick={onClose} />
              <PrimaryButton label={t("details.activate.dialog.cta")} type="submit" />
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  )
}
