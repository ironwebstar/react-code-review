import { useTranslation } from "react-i18next"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { PaperBox } from "../../uikit/page/PaperBox"
import { coerce } from "../Shared.View"
import { AppRouteParams } from "../App.Routes"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { ContractsCreateState } from "./ContractsCreate.Reducer"
import { Form, Formik, FormikProps } from "formik"
import { DividerBox } from "../../uikit/box/DividerBox"
import { FormView, FormActions } from "../../uikit/form/FormView"
import { CreateIcon } from "../../uikit/Shared.Icon"
import { ContractUpsert, initialContract } from "../../domain/contracts/Contracts.Models"
import { validateContract } from "./ContractsUpdate.Validation"
import { mapDispatchToProps } from "./ContractsCreate.Connect"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { useEffect, useRef } from "react"
import { firstViewState } from "../Shared.Reducer"
import { ContractsForm } from "./form/ContractsForm"
import { ClearForm } from "../../uikit/form/ClearForm"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"

interface ContractsCreateComponentProps
  extends ContractsCreateState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const ContractsCreateComponent = (props: ContractsCreateComponentProps) => {
  const { t } = useTranslation("contracts")
  const { createViewState, createContract, productsViewState, getContractProducts, match } = props
  const formRef = useRef<FormikProps<ContractUpsert>>(null)
  useEffect(() => {
    if (firstViewState(productsViewState)) {
      getContractProducts()
    }
  }, [productsViewState])
  if (productsViewState.isLoading) return <ProgressIndicator />
  if (productsViewState.domainError) return <ErrorAlert message={productsViewState.domainError.message} />
  return (
    <>
      {createViewState.domainResult && <Redirect to={`/zevs/${match.params.zevId}`} />}
      {coerce(productsViewState.domainResult, (products) => (
        <>
          <ClearForm<ContractUpsert> viewState={createViewState} formRef={formRef} />
          <Formik<ContractUpsert>
            initialValues={{
              ...initialContract,
              products: products,
            }}
            onSubmit={(values) => createContract(match.params.zevId, values)}
            validate={(values) => validateContract(values, t)}
            innerRef={formRef}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, setFieldValue, dirty }) => (
              <Form onSubmit={handleSubmit}>
                {createViewState.domainError && <ErrorAlert message={createViewState.domainError.message} />}
                <PaperBox>
                  <FormView>
                    <ContractsForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                    />
                  </FormView>
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
      ))}
    </>
  )
}
