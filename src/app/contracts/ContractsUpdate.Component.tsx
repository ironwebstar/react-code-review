import { useTranslation } from "react-i18next"
import { RouteComponentProps } from "react-router-dom"
import { useEffect } from "react"
import { Redirect } from "react-router-dom"
import { firstViewState } from "../Shared.Reducer"
import { PaperBox } from "../../uikit/page/PaperBox"
import { coerce } from "../Shared.View"
import { AppRouteParams } from "../App.Routes"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { ContractsUpdateState } from "./ContractsUpdate.Reducer"
import { Form, Formik } from "formik"
import { DividerBox } from "../../uikit/box/DividerBox"
import { FormView, FormRowCell } from "../../uikit/form/FormView"
import { StatusView } from "../../uikit/label/StatusView"
import { ContractUpsert } from "../../domain/contracts/Contracts.Models"
import { validateContract } from "./ContractsUpdate.Validation"
import { mapDispatchToProps } from "./ContractsUpdate.Connect"
import { FormUpdateActionsView } from "../../uikit/form/FormUpdateActions"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"
import { ContractsForm } from "./form/ContractsForm"

interface ContractsUpdateComponentProps
  extends ContractsUpdateState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const ContractsUpdateComponent = (props: ContractsUpdateComponentProps) => {
  const { t } = useTranslation("contracts")
  const { getViewState, getContractUpsert, updateViewState, updateContract, match, navigateToContract } = props
  useEffect(() => {
    if (firstViewState(getViewState)) {
      getContractUpsert(match.params.contractId)
    }
  }, [getViewState])
  if (getViewState.domainError) return <ErrorAlert message={getViewState.domainError.message} />
  if (updateViewState.domainResult) return <Redirect to={`/contracts/${match.params.contractId}`} />
  if (getViewState.isLoading) return <ProgressIndicator />
  return (
    <>
      {coerce(getViewState.domainResult, (contractUpsert) => (
        <Formik<ContractUpsert>
          initialValues={contractUpsert}
          onSubmit={(values) => updateContract(match.params.contractId, values)}
          validate={(values) => validateContract(values, t)}
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
            dirty,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit}>
              {updateViewState.domainError && <ErrorAlert message={updateViewState.domainError.message} />}
              <PaperBox>
                <FormView>
                  <FormRowCell>
                    <StatusView statusType={contractUpsert.statusType} />
                    <DividerBox />
                  </FormRowCell>
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
              <FormUpdateActionsView
                buttonCtaLabel={t("form.action.cta")}
                isValid={isValid}
                dirty={dirty}
                isLoading={updateViewState.isLoading}
                navigateBack={() => navigateToContract(match.params.contractId)}
                resetForm={resetForm}
              />
            </Form>
          )}
        </Formik>
      ))}
    </>
  )
}
