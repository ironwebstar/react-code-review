import { FormikErrors } from "formik"
import { TFunction } from "i18next"
import {
  ConsumptionPointMoveOut,
  ConsumptionPointMoveOutType,
} from "../../../domain/consumptionpoints/ConsumptionPoints.Model"
import { validationResult, ValidField } from "../../Shared.Validation"

export function validateConsumptionPointMoveOut(
  values: ConsumptionPointMoveOut,
  t: TFunction,
): FormikErrors<ConsumptionPointMoveOut> {
  return validationResult({
    moveOutDate: validateMoveOutDate(values.moveOutDate, t),
    moveOutType: validateConsumptionPointMoveOutType(values.moveOutType, t),
    existingParticipantId: validateExistingParticipantId(values.existingParticipantId, values.moveOutType, t),
  })
}

const validateMoveOutDate = (value: number, t: TFunction) => {
  if (value === -1) {
    return t("shared:validation.mandatory", {
      field: t("move.form.moveOutDate"),
    })
  }
  return ValidField
}

const validateExistingParticipantId = (value: string, moveOutType: ConsumptionPointMoveOutType, t: TFunction) => {
  if (!value && moveOutType && moveOutType === ConsumptionPointMoveOutType.EXISTING) {
    return t("shared:validation.mandatory", {
      field: t("move.form.existingParticipant"),
    })
  }
  return ValidField
}

const validateConsumptionPointMoveOutType = (value: ConsumptionPointMoveOutType, t: TFunction) => {
  if (value === ConsumptionPointMoveOutType.NONE) {
    return t("shared:validation.mandatory", {
      field: t("move.form.subtitle.newParticipant"),
    })
  }
  return ValidField
}
