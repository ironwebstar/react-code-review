import { FormikHandlers, FormikHelpers, FormikState } from "formik"
import { useTranslation } from "react-i18next"
import { FormRowCell, FormRowColumn, FormSubtitle } from "../../../uikit/form/FormView"
import { ProductIcon } from "../../../uikit/Shared.Icon"
import { validationError } from "../../Shared.Validation"
import { SelectPicker } from "../../../uikit/input/SelectPicker"
import { SingleLineDatePicker } from "../../../uikit/input/SingleLineDatePicker"
import { ContractUpsert } from "../../../domain/contracts/Contracts.Models"

export const ContractsForm = (
  props: Pick<FormikHandlers, "handleChange" | "handleBlur"> &
    Pick<FormikState<ContractUpsert>, "errors" | "values" | "touched"> &
    Pick<FormikHelpers<ContractUpsert>, "setFieldValue">,
) => {
  const { t } = useTranslation("contracts")
  const { values, errors, handleChange, handleBlur, touched, setFieldValue } = props
  return (
    <>
      <FormRowColumn>
        <FormRowCell>
          <SingleLineDatePicker
            required
            name="startDate"
            label={t("form.field.startDate")}
            value={values.startDate}
            helperText={validationError(errors.startDate, touched.startDate)}
            onChange={(value) => setFieldValue("startDate", value)}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineDatePicker
            name="endDate"
            label={t("form.field.endDate")}
            value={values.endDate}
            helperText={validationError(errors.endDate, touched.endDate)}
            onChange={(value) => setFieldValue("endDate", value)}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
      <FormSubtitle icon={<ProductIcon />} label={t("form.subtitle.product")} />
      <FormRowColumn>
        <FormRowCell>
          <SelectPicker
            required
            name="productId"
            type="text"
            label={t("form.field.product")}
            emptyValue="None"
            value={values.productId}
            items={values.products.map((product) => ({
              label: product.name,
              value: product.id,
            }))}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
    </>
  )
}
