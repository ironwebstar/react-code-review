import { useTranslation } from "react-i18next"
import { Form, Formik } from "formik"
import { Dialog, DialogContent, DialogActions } from "@mui/material"
import { PrimaryButton } from "../../../uikit/button/PrimaryButton"
import { SecondaryButton } from "../../../uikit/button/SecondaryButton"
import { FormView, FormRowColumn, FormRowCell, FormSubtitle } from "../../../uikit/form/FormView"
import { SingleLineDatePicker } from "../../../uikit/input/SingleLineDatePicker"
import { SingleLineTextField } from "../../../uikit/input/SingleLineTextField"
import {
  ConsumptionPointMoveIn,
  emptyConsumptionPointMoveIn,
} from "../../../domain/consumptionpoints/ConsumptionPoints.Model"
import { PageHeader } from "../../../uikit/typography/Header"
import { validateConsumptionPointMoveIn } from "./ConsumptionPointReportMoveInForm.Validation"
import { validationError } from "../../Shared.Validation"
import { CreateIcon, AbortIcon } from "../../../uikit/Shared.Icon"
import { SpaceBetweenBox } from "../../../uikit/box/AlignmentBox"
import { TinyPaddedBox } from "../../../uikit/box/PaddedBox"
import { SelectPicker } from "../../../uikit/input/SelectPicker"
import { ConsumptionPointParticipant } from "../../../domain/participant/Participant.Model"

interface ConsumptionPointReportMoveInFormProps {
  open: boolean
  onClose: () => void
  confirmClick: (consumptionPointMoveIn: ConsumptionPointMoveIn) => void
  participants: ConsumptionPointParticipant[]
  moveInDate: number
}

export const ConsumptionPointReportMoveInForm = (props: ConsumptionPointReportMoveInFormProps) => {
  const { t } = useTranslation("consumptionPointsParticipations")
  const { open, onClose, confirmClick, participants, moveInDate } = props

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <PageHeader>{t("moveIn.form.title")}</PageHeader>
      <Formik<ConsumptionPointMoveIn>
        initialValues={{ ...emptyConsumptionPointMoveIn, moveInDate: moveInDate }}
        onSubmit={(values) => confirmClick(values)}
        validate={(values) => validateConsumptionPointMoveIn(values, t)}
      >
        {({ values, touched, handleChange, handleBlur, handleSubmit, setFieldValue, errors, isValid, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <FormView>
                <FormSubtitle label={t("moveIn.form.subtitle.participant")} />
                <FormRowColumn>
                  <FormRowCell>
                    <SelectPicker
                      required={true}
                      name="participantId"
                      type="text"
                      label={t("moveIn.form.participant")}
                      helperText={validationError(errors.participantId, touched.participantId)}
                      value={values.participantId}
                      emptyValue="None"
                      items={participants.map((participant) => ({
                        value: participant.id,
                        label: participant.fullName,
                      }))}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormRowCell>
                </FormRowColumn>
                {values.participantId && (
                  <>
                    <FormRowColumn>
                      <FormRowCell>
                        <SingleLineTextField
                          id="participantName"
                          autoFocus={true}
                          name="participantName"
                          type="participantName"
                          label={t("moveIn.form.participantName")}
                          value={
                            participants.filter((participant) => participant.id === values.participantId)[0].fullName
                          }
                          disabled={true}
                        />
                      </FormRowCell>
                    </FormRowColumn>
                    <FormRowColumn>
                      <FormRowCell>
                        <SingleLineDatePicker
                          required
                          name="moveInDate"
                          label={t("moveIn.form.moveInDate")}
                          value={values.moveInDate}
                          helperText={validationError(errors.moveInDate, touched.moveInDate)}
                          onChange={(value) => setFieldValue("moveInDate", value)}
                          onBlur={handleBlur}
                        />
                      </FormRowCell>
                    </FormRowColumn>
                  </>
                )}
              </FormView>
            </DialogContent>
            <DialogActions>
              <SpaceBetweenBox>
                <TinyPaddedBox>
                  <SecondaryButton startIcon={<AbortIcon />} label={t("shared:button.abort")} onClick={onClose} />
                </TinyPaddedBox>
                <TinyPaddedBox>
                  <PrimaryButton
                    startIcon={<CreateIcon />}
                    label={t("moveIn.form.cta")}
                    type="submit"
                    disabled={!isValid || !dirty}
                  />
                </TinyPaddedBox>
              </SpaceBetweenBox>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}
