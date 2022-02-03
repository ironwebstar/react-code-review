import { RouteComponentProps } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AppRouteParams } from "../App.Routes"
import { ErrorAlert, SuccessAlertLink } from "../../uikit/Shared.Alert"
import { FormActions } from "../../uikit/form/FormView"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { CreateIcon } from "../../uikit/Shared.Icon"
import { mapDispatchToProps } from "./ProductsCreate.Connect"
import { ProductsCreateState } from "./ProductsCreate.Reducer"
import { Form, Formik, FormikProps } from "formik"
import { emptyProductUpsert, ProductUpsert } from "../../domain/products/Products.Model"
import { validateProduct } from "./form/ProductsForm.Validation"
import { ProductsForm } from "./form/ProductsForm"
import { PaperBox } from "../../uikit/page/PaperBox"
import { useRef } from "react"
import { DividerBox } from "../../uikit/box/DividerBox"
import { ClearForm } from "../../uikit/form/ClearForm"

interface ProductsCreateComponentProps
  extends ProductsCreateState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const ProductsCreateComponent = (props: ProductsCreateComponentProps) => {
  const { t } = useTranslation("products")
  const { createViewState, createProduct, navigateToProduct } = props
  const formRef = useRef<FormikProps<ProductUpsert>>(null)
  return (
    <>
      <ClearForm<ProductUpsert> viewState={createViewState} formRef={formRef} />
      <Formik
        validateOnBlur
        initialValues={emptyProductUpsert}
        onSubmit={(values) => createProduct(values)}
        validate={(values) => validateProduct(values, t)}
        innerRef={formRef}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isValid, dirty }) => (
          <Form onSubmit={handleSubmit}>
            {createViewState.domainResult && (
              <SuccessAlertLink
                message={t("create.alert.success")}
                onClick={() => navigateToProduct(createViewState.domainResult ?? "")}
              />
            )}
            {createViewState.domainError && (
              <ErrorAlert scrollOnDisplay message={createViewState.domainError.message} />
            )}
            {createViewState.domainError && <ErrorAlert message={createViewState.domainError.message} />}
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
            <FormActions>
              <PrimaryButtonLoading
                startIcon={<CreateIcon />}
                isLoading={createViewState.isLoading}
                label={t("create.form.action.cta")}
                type="submit"
                disabled={!isValid || !dirty}
              />
            </FormActions>
          </Form>
        )}
      </Formik>
    </>
  )
}
