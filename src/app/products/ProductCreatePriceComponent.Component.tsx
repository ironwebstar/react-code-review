import { Redirect, RouteComponentProps } from "react-router-dom"
import { AppRouteParams } from "../App.Routes"
import { useTranslation } from "react-i18next"
import { PaperBox } from "../../uikit/page/PaperBox"
import { Form, Formik } from "formik"
import { DividerBox } from "../../uikit/box/DividerBox"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { FormActions, FormMode } from "../../uikit/form/FormView"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { CreateIcon } from "../../uikit/Shared.Icon"
import { draftProductPriceComponentUpsert, ProductPriceComponentUpsert } from "../../domain/products/Products.Model"
import { ProductCreatePriceComponentState } from "./ProductCreatePriceComponent.Reducer"
import { mapDispatchToProps } from "./ProductCreatePriceComponent.Connect"
import { PriceComponentForm } from "./form/PriceComponentForm"
import { validatePriceComponentForm } from "./form/PriceComponentForm.Validation"
import { VALIDATION_DEPS } from "../Shared.Validation"

interface ProductCreatePriceComponentProps
  extends ProductCreatePriceComponentState,
    ReturnType<typeof mapDispatchToProps>,
    RouteComponentProps<AppRouteParams> {}

export const ProductCreatePriceComponentComponent = (props: ProductCreatePriceComponentProps) => {
  const { t } = useTranslation("products")
  const { createPriceComponent, createProductPriceComponentViewState, match } = props
  if (createProductPriceComponentViewState.domainResult) return <Redirect to={`/products/${match.params.productId}`} />
  return (
    <>
      <Formik<ProductPriceComponentUpsert>
        initialValues={draftProductPriceComponentUpsert}
        onSubmit={(values) => createPriceComponent(match.params.productId, values)}
        validate={(values) => validatePriceComponentForm(values, VALIDATION_DEPS, t)}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, setFieldValue, dirty }) => (
          <Form onSubmit={handleSubmit}>
            {createProductPriceComponentViewState.domainError && (
              <ErrorAlert message={createProductPriceComponentViewState.domainError.message} />
            )}
            <PaperBox>
              <PriceComponentForm
                mode={FormMode.CREATE}
                values={values}
                errors={errors}
                setFieldValue={setFieldValue}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </PaperBox>
            <DividerBox />
            <FormActions>
              <PrimaryButtonLoading
                disabled={!isValid || !dirty}
                label={t("create.price.form.action.cta")}
                type="submit"
                startIcon={<CreateIcon />}
                isLoading={createProductPriceComponentViewState.isLoading}
              />
            </FormActions>
          </Form>
        )}
      </Formik>
    </>
  )
}
