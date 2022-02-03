import { FormikHandlers, FormikHelpers, FormikState } from "formik"
import { useTranslation } from "react-i18next"
import { FormMode, FormRowCell, FormRowColumn, FormView } from "../../../uikit/form/FormView"
import { SingleLineTextField } from "../../../uikit/input/SingleLineTextField"
import { SmallPaddedBox } from "../../../uikit/box/PaddedBox"
import { Typography } from "@mui/material"
import { validationError } from "../../Shared.Validation"
import { SelectPicker } from "../../../uikit/input/SelectPicker"
import {
  BillingType,
  billingTypeKeys,
  powermeterTypeKeys,
  ProductPriceComponentUpsert,
} from "../../../domain/products/Products.Model"
import { DatePickerMonthDay, SingleLineDatePicker } from "../../../uikit/input/SingleLineDatePicker"

interface PriceComponentFormProps {
  mode: FormMode
}

export const PriceComponentForm = (
  props: PriceComponentFormProps &
    Pick<FormikHandlers, "handleChange" | "handleBlur"> &
    Pick<FormikState<ProductPriceComponentUpsert>, "errors" | "values" | "touched"> &
    Pick<FormikHelpers<ProductPriceComponentUpsert>, "setFieldValue">,
) => {
  const { t } = useTranslation("products")
  const { mode, values, setFieldValue, errors, handleChange, handleBlur, touched } = props
  return (
    <FormView>
      <>
        <FormRowColumn>
          <SmallPaddedBox>
            {mode === FormMode.CREATE && (
              <Typography variant="h4">{t("price.form.title.createPriceComponent")}</Typography>
            )}
            {mode === FormMode.UPDATE && (
              <Typography variant="h4">{t("price.form.title.updatePriceComponent")}</Typography>
            )}
          </SmallPaddedBox>
        </FormRowColumn>
        <FormRowColumn>
          <FormRowCell>
            <SingleLineTextField
              required
              name="name"
              type="text"
              label={t("price.form.field.name")}
              helperText={validationError(errors.name, touched.name)}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormRowCell>
        </FormRowColumn>
        <FormRowColumn>
          <FormRowCell>
            <SingleLineTextField
              required
              name="externalReferenceNumber"
              type="text"
              label={t("price.form.field.externalRef")}
              helperText={validationError(errors.externalReferenceNumber, touched.externalReferenceNumber)}
              value={values.externalReferenceNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormRowCell>
        </FormRowColumn>
        <FormRowColumn>
          <FormRowCell>
            <SelectPicker
              required
              name="billingType"
              type="text"
              label={t("price.form.field.billingType")}
              emptyValue="None"
              value={values.billingType}
              helperText={validationError(errors.billingType, touched.billingType)}
              items={billingTypeKeys.map((billingType) => ({
                label: t(`billingType.${billingType}`),
                value: billingType,
              }))}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormRowCell>
        </FormRowColumn>
        {values.billingType === BillingType.MONTHLY_SPECIFIC_FEE_PER_CONSUMPTION_POINT && (
          <FormRowColumn>
            <FormRowCell>
              <SelectPicker
                required
                name="powermeterType"
                type="text"
                label={t("price.form.field.powermeterType")}
                emptyValue="None"
                value={values.powermeterType}
                helperText={validationError(errors.powermeterType, touched.powermeterType)}
                items={powermeterTypeKeys.map((powermeterType) => ({
                  label: t(`powermeterType.${powermeterType}`),
                  value: powermeterType,
                }))}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
          </FormRowColumn>
        )}
        <FormRowColumn>
          <FormRowCell>
            <SingleLineTextField
              required
              name="priceWithoutVat"
              type="text"
              label={t("price.form.field.priceWithoutVat")}
              helperText={validationError(errors.priceWithoutVat, touched.priceWithoutVat)}
              value={values.priceWithoutVat}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormRowCell>
        </FormRowColumn>
        <FormRowColumn>
          <FormRowCell>
            <SingleLineDatePicker
              required
              name="validFrom"
              label={t("price.form.field.validFrom")}
              helperText={validationError(errors.validFrom, touched.validFrom)}
              value={values.validFrom}
              onChange={(value) => setFieldValue("validFrom", value)}
              onBlur={handleBlur}
              views={["month", "year"]}
              range={DatePickerMonthDay.BEGIN}
            />
          </FormRowCell>
          <FormRowCell>
            <SingleLineDatePicker
              name="validUntil"
              label={t("price.form.field.validUntil")}
              helperText={validationError(errors.validUntil, touched.validUntil)}
              value={values.validUntil}
              onChange={(value) => setFieldValue("validUntil", value)}
              onBlur={handleBlur}
              views={["month", "year"]}
              range={DatePickerMonthDay.END}
            />
          </FormRowCell>
        </FormRowColumn>
      </>
    </FormView>
  )
}
