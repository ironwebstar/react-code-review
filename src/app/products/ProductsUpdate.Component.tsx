import { Redirect, RouteComponentProps } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AppRouteParams } from "../App.Routes"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { mapDispatchToProps } from "./ProductsUpdate.Connect"
import { ProductsUpdateState } from "./ProductsUpdate.Reducer"
import { Form, Formik } from "formik"
import { validateProduct } from "./form/ProductsForm.Validation"
import { ProductsForm } from "./form/ProductsForm"
import { PaperBox } from "../../uikit/page/PaperBox"
import { useEffect } from "react"
import { firstViewState } from "../Shared.Reducer"
import { coerce } from "../Shared.View"
import { DividerBox } from "../../uikit/box/DividerBox"
import { FormUpdateActionsView } from "../../uikit/form/FormUpdateActions"

interface ProductsUpdateComponentProps
  extends ProductsUpdateState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const ProductsUpdateComponent = (props: ProductsUpdateComponentProps) => {
  const { t } = useTranslation("products")
  const { getProductUpdate, updateByIdViewState, updateViewState, updateProduct, match, navigateToProduct } = props
  useEffect(() => {
    if (firstViewState(updateByIdViewState)) {
      getProductUpdate(match.params.productId)
    }
  }, [getProductUpdate, updateByIdViewState, match])
  return (
    <>
      {updateByIdViewState.domainError && (
        <ErrorAlert
          retry={() => getProductUpdate(match.params.productId)}
          message={updateByIdViewState.domainError.message}
        />
      )}
      {updateViewState.domainResult && <Redirect to={`/products/${match.params.productId}`} />}
      {updateViewState.domainError && <ErrorAlert scrollOnDisplay message={updateViewState.domainError.message} />}
      {coerce(updateByIdViewState.domainResult, (productUpdate) => (
        <>
          <Formik
            validateOnBlur
            initialValues={productUpdate}
            onSubmit={(values) => updateProduct(match.params.productId, values)}
            validate={(values) => validateProduct(values, t)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isValid,
              dirty,
              resetForm,
            }) => (
              <Form onSubmit={handleSubmit}>
                {updateViewState.domainError && <ErrorAlert message={updateViewState.domainError.message} />}
                <PaperBox>
                  <ProductsForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                  />
                </PaperBox>
                <DividerBox />
                <FormUpdateActionsView
                  buttonCtaLabel={t("update.form.action.cta")}
                  isValid={isValid}
                  dirty={dirty}
                  isLoading={updateViewState.isLoading}
                  navigateBack={() => navigateToProduct(match.params.productId)}
                  resetForm={resetForm}
                />
              </Form>
            )}
          </Formik>
        </>
      ))}
    </>
  )
}
