import { FormikHandlers, FormikState } from "formik"
import { useTranslation } from "react-i18next"
import { BuildingUpsert } from "../../../domain/buildings/Buildings.Model"
import { FormView, FormRowCell, FormSubtitle, FormRowColumn, FormMode } from "../../../uikit/form/FormView"
import { SingleLineTextField } from "../../../uikit/input/SingleLineTextField"
import { StatusView } from "../../../uikit/label/StatusView"
import { AddressIcon } from "../../../uikit/Shared.Icon"
import { validationError } from "../../Shared.Validation"

interface BuildingsFormProps {
  mode: FormMode
}

export const BuildingsForm = (
  props: Pick<FormikHandlers, "handleChange" | "handleBlur"> &
    Pick<FormikState<BuildingUpsert>, "errors" | "values" | "touched"> &
    BuildingsFormProps,
) => {
  const { t } = useTranslation("buildings")
  const { handleChange, handleBlur, touched, values, errors, mode } = props
  return (
    <FormView>
      {mode === FormMode.UPDATE && (
        <FormRowCell>
          <StatusView statusType={values.statusType} />
        </FormRowCell>
      )}
      <FormRowCell>
        <SingleLineTextField
          required
          name="buildingObject"
          type="text"
          label={t("form.field.buildingObject")}
          helperText={validationError(errors.buildingObject, touched.buildingObject)}
          value={values.buildingObject}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormRowCell>
      <FormSubtitle icon={<AddressIcon />} label={t("form.subtitle.address")} />
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            required
            name="addressStreet"
            type="text"
            label={t("form.field.addressStreet")}
            helperText={validationError(errors.addressStreet, touched.addressStreet)}
            value={values.addressStreet}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            required
            name="addressHouseNumber"
            type="text"
            label={t("form.field.addressHouseNumber")}
            helperText={validationError(errors.addressHouseNumber, touched.addressHouseNumber)}
            value={values.addressHouseNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            required
            name="addressPostCode"
            inputProps={{ maxLength: 6 }}
            type="text"
            label={t("form.field.addressPostCode")}
            helperText={validationError(errors.addressPostCode, touched.addressPostCode)}
            value={values.addressPostCode}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            required
            name="addressCity"
            type="text"
            label={t("form.field.addressCity")}
            helperText={validationError(errors.addressCity, touched.addressCity)}
            value={values.addressCity}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
    </FormView>
  )
}
