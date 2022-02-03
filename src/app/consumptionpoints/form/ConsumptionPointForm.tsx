import { FormikHandlers, FormikState, FormikHelpers } from "formik"
import { useTranslation } from "react-i18next"

import {
  ConsumptionPointUpsert,
  consumptionPointTypeValues,
  consumptionPointPowerMeterTypeValues,
  ConsumptionPointUpsertPricePackageOption,
} from "../../../domain/consumptionpoints/ConsumptionPoints.Model"

import { FormView, FormRowCell, FormRowColumn, FormMode } from "../../../uikit/form/FormView"
import { SelectPicker } from "../../../uikit/input/SelectPicker"
import { SingleLineDatePicker } from "../../../uikit/input/SingleLineDatePicker"
import { SingleLineTextField } from "../../../uikit/input/SingleLineTextField"
import { validationError } from "../../Shared.Validation"

interface ConsumptionPointFormProps {
  mode: FormMode
  pricePackageOptions: ConsumptionPointUpsertPricePackageOption[]
}

export const ConsumptionPointForm = (
  props: ConsumptionPointFormProps &
    Pick<FormikHandlers, "handleChange" | "handleBlur"> &
    Pick<FormikState<ConsumptionPointUpsert>, "errors" | "values" | "touched"> &
    Pick<FormikHelpers<ConsumptionPointUpsert>, "setFieldValue">,
) => {
  const { t } = useTranslation("consumptionpoints")
  const { mode, handleChange, handleBlur, touched, values, errors, setFieldValue, pricePackageOptions } = props
  return (
    <FormView>
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            name="name"
            type="text"
            label={t("form.field.name")}
            helperText={validationError(errors.name, touched.name)}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SelectPicker
            required
            name="type"
            type="text"
            label={t("form.field.type")}
            helperText={validationError(errors.type, touched.type)}
            value={values.type}
            emptyValue="None"
            items={consumptionPointTypeValues.map((type) => ({
              label: t(`type.${type}`),
              value: type,
            }))}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
      {mode === FormMode.UPDATE && (
        <FormRowColumn>
          <FormRowCell>
            <SingleLineDatePicker
              required
              name="billableFrom"
              label={t("form.field.billableFrom")}
              value={values.billableFrom}
              helperText={validationError(errors.billableFrom, touched.billableFrom)}
              onChange={(value) => setFieldValue("billableFrom", value)}
              onBlur={handleBlur}
            />
          </FormRowCell>
          <FormRowCell>
            <SingleLineDatePicker
              disabled
              name="billableTo"
              label={t("form.field.billableTo")}
              value={values.billableTo}
              onChange={(value) => setFieldValue("billableTo", value)}
              onBlur={handleBlur}
            />
          </FormRowCell>
        </FormRowColumn>
      )}
      <FormRowColumn>
        <FormRowCell>
          <SelectPicker
            required
            name="powerMeterType"
            type="text"
            label={t("form.field.powerMeterType")}
            helperText={validationError(errors.powerMeterType, touched.powerMeterType)}
            value={values.powerMeterType}
            emptyValue="None"
            items={consumptionPointPowerMeterTypeValues.map((powerMeterType) => ({
              label: t(`powerMeterType.${powerMeterType}`),
              value: powerMeterType,
            }))}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SelectPicker
            required
            name="pricePackageId"
            type="text"
            label={t("form.field.pricePackageId")}
            helperText={validationError(errors.pricePackageId, touched.pricePackageId)}
            value={values.pricePackageId}
            emptyValue="None"
            items={pricePackageOptions.map((pricePackage) => ({
              label: pricePackage.name,
              value: pricePackage.id,
            }))}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            name="meteringCode"
            type="text"
            label={t("form.field.meteringCode")}
            helperText={validationError(errors.meteringCode, touched.meteringCode)}
            value={values.meteringCode}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={t("form.field.meteringCode.placeholder")}
          />
        </FormRowCell>
      </FormRowColumn>
    </FormView>
  )
}
