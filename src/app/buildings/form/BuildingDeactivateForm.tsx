import { Dialog, Typography, DialogContent, DialogActions } from "@mui/material"
import { Formik } from "formik"
import { useTranslation } from "react-i18next"
import { SmallPaddedBox } from "../../../uikit/box/PaddedBox"
import { PrimaryButton } from "../../../uikit/button/PrimaryButton"
import { SecondaryButton } from "../../../uikit/button/SecondaryButton"
import { FormView, FormRowColumn, FormRowCell } from "../../../uikit/form/FormView"
import { SingleLineDatePicker } from "../../../uikit/input/SingleLineDatePicker"
import { validateZevDeactivate } from "../../zevs/form/ZevDeactivateForm.Validation"

interface BuildingDeactivateFormProps {
  open: boolean
  onClose: () => void
  confirmClick: (billingFromDate: number) => void
}

export const BuildingDeactivateForm = (props: BuildingDeactivateFormProps) => {
  const { t } = useTranslation("buildings")
  const { open, onClose, confirmClick } = props
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <SmallPaddedBox>
        <Typography variant="h3">{t("details.deactivate.dialog.title")}</Typography>
      </SmallPaddedBox>
      <Formik
        initialValues={{
          billableUntilDate: new Date().getTime(),
        }}
        onSubmit={(values) => confirmClick(values.billableUntilDate)}
      >
        {({ values, touched, handleBlur, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <FormView>
                <FormRowColumn>
                  <FormRowCell>
                    <SingleLineDatePicker
                      required
                      name="billableUntilDate"
                      label={t("form.field.billableUntilDate")}
                      value={values.billableUntilDate}
                      helperText={validateZevDeactivate.billableUntilDate(
                        values.billableUntilDate,
                        touched.billableUntilDate,
                        t,
                      )}
                      onChange={(value) => setFieldValue("billableUntilDate", value)}
                      onBlur={handleBlur}
                    />
                  </FormRowCell>
                </FormRowColumn>
              </FormView>
            </DialogContent>
            <DialogActions>
              <SecondaryButton label={t("shared:button.abort")} onClick={onClose} />
              <PrimaryButton label={t("shared:dialog.confirm.deactivate")} type="submit" />
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  )
}
