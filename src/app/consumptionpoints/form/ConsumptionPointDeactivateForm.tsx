import { useTranslation } from "react-i18next"
import { Form, Formik } from "formik"
import { Dialog, DialogActions, DialogContent } from "@mui/material"

import { TinyPaddedBox } from "../../../uikit/box/PaddedBox"
import { PrimaryButton } from "../../../uikit/button/PrimaryButton"
import { SecondaryButton } from "../../../uikit/button/SecondaryButton"
import { FormView, FormRowColumn, FormRowCell } from "../../../uikit/form/FormView"
import { SingleLineDatePicker } from "../../../uikit/input/SingleLineDatePicker"

import { validateConsumptionPointDeactivate } from "./ConsumptionPointDeactivateForm.Validation"
import { PageHeader } from "../../../uikit/typography/Header"
import { SpaceBetweenBox } from "../../../uikit/box/AlignmentBox"

interface ConsumptionPointDeactivateFormProps {
  open: boolean
  onClose: () => void
  confirmClick: (deactivateFrom: number) => void
}

export const ConsumptionPointDeactivateForm = (props: ConsumptionPointDeactivateFormProps) => {
  const { t } = useTranslation("consumptionpoints")
  const { open, onClose, confirmClick } = props

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <PageHeader>{t("details.deactivate.dialog.title")}</PageHeader>
      <Formik
        initialValues={{
          deactivateFrom: Date.now(),
        }}
        onSubmit={(values) => confirmClick(values.deactivateFrom)}
      >
        {({ values, touched, handleBlur, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <FormView>
                <FormRowColumn>
                  <FormRowCell>
                    <SingleLineDatePicker
                      required
                      name="deactivateFrom"
                      label={t("form.field.deactivateFrom")}
                      value={values.deactivateFrom}
                      helperText={validateConsumptionPointDeactivate.deactivateFrom(
                        values.deactivateFrom,
                        touched.deactivateFrom,
                        t,
                      )}
                      onChange={(value) => setFieldValue("deactivateFrom", value)}
                      onBlur={handleBlur}
                    />
                  </FormRowCell>
                </FormRowColumn>
              </FormView>
            </DialogContent>
            <DialogActions>
              <SpaceBetweenBox>
                <TinyPaddedBox>
                  <SecondaryButton label={t("shared:button.abort")} onClick={onClose} />
                </TinyPaddedBox>
                <TinyPaddedBox>
                  <PrimaryButton label={t("shared:dialog.confirm.deactivate")} type="submit" />
                </TinyPaddedBox>
              </SpaceBetweenBox>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}
