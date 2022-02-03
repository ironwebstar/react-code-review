import { FormikErrors } from "formik"
import { TFunction } from "i18next"
import { ConsumptionPointMoveIn } from "../../../domain/consumptionpoints/ConsumptionPoints.Model"
import { validationResult, ValidField } from "../../Shared.Validation"

export function validateConsumptionPointMoveIn(
  values: ConsumptionPointMoveIn,
  t: TFunction,
): FormikErrors<ConsumptionPointMoveIn> {
  return validationResult({
    moveInDate: validateMoveInDate(values.moveInDate, t),
    participantId: validateParticipantId(values.participantId, t),
  })
}

const validateMoveInDate = (value: number, t: TFunction) => {
  if (value === -1) {
    return t("shared:validation.mandatory", {
      field: t("moveIn.form.moveInDate"),
    })
  }
  return ValidField
}

const validateParticipantId = (value: string, t: TFunction) => {
  if (!value) {
    return t("shared:validation.mandatory", {
      field: t("moveIn.form.participant"),
    })
  }
  return ValidField
}
