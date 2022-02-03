import { useTranslation } from "react-i18next"
import { Form, Formik } from "formik"
import { Dialog, DialogContent, DialogActions, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { PrimaryButton } from "../../../uikit/button/PrimaryButton"
import { SecondaryButton } from "../../../uikit/button/SecondaryButton"
import { FormView, FormRowColumn, FormRowCell, FormSubtitle } from "../../../uikit/form/FormView"
import { SingleLineDatePicker } from "../../../uikit/input/SingleLineDatePicker"
import {
  ConsumptionPointMoveOut,
  ConsumptionPointMoveOutType,
  emptyConsumptionPointMoveOut,
} from "../../../domain/consumptionpoints/ConsumptionPoints.Model"
import { PageHeader } from "../../../uikit/typography/Header"
import { validateConsumptionPointMoveOut } from "./ConsumptionPointReportMoveOutForm.Validation"
import { validationError } from "../../Shared.Validation"
import { CreateIcon, AbortIcon } from "../../../uikit/Shared.Icon"
import { SpaceBetweenBox } from "../../../uikit/box/AlignmentBox"
import { TinyPaddedBox } from "../../../uikit/box/PaddedBox"
import { SelectPicker } from "../../../uikit/input/SelectPicker"
import { ConsumptionPointParticipant } from "../../../domain/participant/Participant.Model"

interface ConsumptionPointReportMoveOutFormProps {
  open: boolean
  onClose: () => void
  confirmClick: (consumptionPointMoveOut: ConsumptionPointMoveOut) => void
  participants: ConsumptionPointParticipant[]
  nextMoveOutDate: number
}

export const ConsumptionPointReportMoveOutForm = (props: ConsumptionPointReportMoveOutFormProps) => {
  const { t } = useTranslation("consumptionPointsParticipations")
  const { open, onClose, confirmClick, participants, nextMoveOutDate } = props

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <PageHeader>{t("move.form.title")}</PageHeader>
      <Formik<ConsumptionPointMoveOut>
        initialValues={{ ...emptyConsumptionPointMoveOut, moveOutDate: nextMoveOutDate }}
        onSubmit={(values) => confirmClick(values)}
        validate={(values) => validateConsumptionPointMoveOut(values, t)}
      >
        {({ values, touched, handleChange, handleBlur, handleSubmit, setFieldValue, errors, isValid, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <FormView>
                <FormSubtitle label={t("move.form.subtitle.currentParticipant")} />
                <FormRowColumn>
                  <FormRowCell>
                    <SingleLineDatePicker
                      required
                      name="moveOutDate"
                      label={t("move.form.moveOutDate")}
                      value={values.moveOutDate}
                      helperText={validationError(errors.moveOutDate, touched.moveOutDate)}
                      onChange={(value) => setFieldValue("moveOutDate", value)}
                      onBlur={handleBlur}
                    />
                  </FormRowCell>
                </FormRowColumn>
                <FormSubtitle label={t("move.form.subtitle.newParticipant")} />
                <FormRowColumn>
                  <FormRowCell>
                    <RadioGroup row color="secondary" name="moveOutType">
                      <FormControlLabel
                        value={ConsumptionPointMoveOutType.EXISTING}
                        control={
                          <Radio
                            required
                            onClick={() => setFieldValue("moveOutType", ConsumptionPointMoveOutType.EXISTING)}
                          />
                        }
                        label={`${t("move.form.toggle.participantsKnown")}`}
                      />
                      <FormControlLabel
                        value={ConsumptionPointMoveOutType.VACANCY}
                        control={
                          <Radio
                            required
                            onClick={() => setFieldValue("moveOutType", ConsumptionPointMoveOutType.VACANCY)}
                          />
                        }
                        label={`${t("move.form.toggle.vacancy")}`}
                      />
                    </RadioGroup>
                  </FormRowCell>
                </FormRowColumn>
                {values.moveOutType === ConsumptionPointMoveOutType.EXISTING && (
                  <FormRowColumn>
                    <FormRowCell>
                      <SelectPicker
                        required={values.moveOutType === ConsumptionPointMoveOutType.EXISTING}
                        name="existingParticipantId"
                        type="text"
                        label={t("move.form.existingParticipant")}
                        helperText={validationError(errors.existingParticipantId, touched.existingParticipantId)}
                        value={values.existingParticipantId}
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
                    label={t("move.form.cta")}
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
