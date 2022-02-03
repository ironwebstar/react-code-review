import { Redirect, RouteComponentProps } from "react-router-dom"
import { AppRouteParams } from "../App.Routes"
import { useTranslation } from "react-i18next"
import { PaperBox } from "../../uikit/page/PaperBox"
import { Form, Formik } from "formik"
import { DividerBox } from "../../uikit/box/DividerBox"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { useEffect } from "react"
import { ProductPriceComponentUpsert } from "../../domain/products/Products.Model"
import { PriceComponentForm } from "./form/PriceComponentForm"
import { validatePriceComponentForm } from "./form/PriceComponentForm.Validation"
import { ProductUpdatePriceComponentState } from "./ProductUpdatePriceComponent.Reducer"
import { mapDispatchToProps } from "./ProductUpdatePriceComponent.Connect"
import { firstViewState } from "../Shared.Reducer"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"
import { coerce } from "../Shared.View"
import { VALIDATION_DEPS } from "../Shared.Validation"
import { FormUpdateActionsView } from "../../uikit/form/FormUpdateActions"
import { FormMode } from "../../uikit/form/FormView"

interface ProductUpdatePriceComponentProps
  extends ProductUpdatePriceComponentState,
    ReturnType<typeof mapDispatchToProps>,
    RouteComponentProps<AppRouteParams> {}

export const ProductUpdatePriceComponentComponent = (props: ProductUpdatePriceComponentProps) => {
  const { t } = useTranslation("products")
  const {
    getProductPriceComponentUpdateById,
    getProductPriceComponentViewState,
    updatePriceComponent,
    updateProductPriceComponentViewState,
    match,
    navigateToProduct,
  } = props
  useEffect(() => {
    if (firstViewState(getProductPriceComponentViewState)) {
      getProductPriceComponentUpdateById(match.params.productId, match.params.priceId)
    }
  }, [getProductPriceComponentViewState])
  if (updateProductPriceComponentViewState.domainResult) return <Redirect to={`/products/${match.params.productId}`} />
  if (getProductPriceComponentViewState.isLoading) return <ProgressIndicator />
  return (
    <>
      {coerce(getProductPriceComponentViewState.domainResult, (priceComponentUpsert) => (
        <Formik<ProductPriceComponentUpsert>
          initialValues={priceComponentUpsert}
          onSubmit={(values) => updatePriceComponent(match.params.productId, match.params.priceId, values)}
          validate={(values) => validatePriceComponentForm(values, VALIDATION_DEPS, t)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            setFieldValue,
            resetForm,
            dirty,
          }) => (
            <Form onSubmit={handleSubmit}>
              {updateProductPriceComponentViewState.domainError && (
                <ErrorAlert message={updateProductPriceComponentViewState.domainError.message} />
              )}
              <PaperBox>
                <PriceComponentForm
                  mode={FormMode.UPDATE}
                  values={values}
                  errors={errors}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </PaperBox>
              <DividerBox />
              <FormUpdateActionsView
                buttonCtaLabel={t("update.price.form.action.cta")}
                isValid={isValid}
                dirty={dirty}
                isLoading={updateProductPriceComponentViewState.isLoading}
                navigateBack={() => navigateToProduct(match.params.productId)}
                resetForm={resetForm}
              />
            </Form>
          )}
        </Formik>
      ))}
    </>
  )
}
