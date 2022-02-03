import { FormikHandlers, FormikState, FormikHelpers } from "formik"
import { useTranslation } from "react-i18next"

import { ProductUpsert } from "../../../domain/products/Products.Model"

import { FormView, FormRowCell, FormRowColumn } from "../../../uikit/form/FormView"
import { SingleLineTextField } from "../../../uikit/input/SingleLineTextField"
import { ORDERED_STRING_COMPARATOR } from "../../../domain/Domain.Comparators"
import ServiceComponentSelectionConnect from "../../service-components/ServiceComponentSelection.Connect"

import { validationError } from "../../Shared.Validation"

export const ProductsForm = (
  props: Pick<FormikHandlers, "handleChange" | "handleBlur"> &
    Pick<FormikState<ProductUpsert>, "errors" | "values" | "touched"> &
    Pick<FormikHelpers<ProductUpsert>, "setFieldValue">,
) => {
  const { t } = useTranslation("products")
  const { handleChange, handleBlur, touched, values, errors, setFieldValue } = props
  return (
    <FormView>
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            required
            name="name"
            type="text"
            label={t("form.field.name")}
            helperText={validationError(errors.name, touched.name)}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
      <FormRowColumn>
        <ServiceComponentSelectionConnect
          selectedItems={values.serviceComponents}
          onSelectionChanged={(serviceComponents) =>
            setFieldValue(
              "serviceComponents",
              serviceComponents.sort((a, b) => ORDERED_STRING_COMPARATOR(a, b, "asc")),
            )
          }
        />
      </FormRowColumn>
    </FormView>
  )
}
