import { useTranslation } from "react-i18next"
import { RouteComponentProps } from "react-router-dom"
import { PaperBox } from "../../uikit/page/PaperBox"
import { AppRouteParams } from "../App.Routes"
import { BuildingUpsert, initialBuilding } from "../../domain/buildings/Buildings.Model"
import { ErrorAlert, SuccessAlertLink } from "../../uikit/Shared.Alert"
import { Form, Formik, FormikProps } from "formik"
import { DividerBox } from "../../uikit/box/DividerBox"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { FormActions, FormMode } from "../../uikit/form/FormView"
import { CreateIcon } from "../../uikit/Shared.Icon"
import { validateBuilding } from "./form/BuildingsForm.Validation"
import { BuildingsForm } from "./form/BuildingsForm"
import { BuildingsCreateState } from "./BuildingsCreate.Reducer"
import { mapDispatchToProps } from "./BuildingsCreate.Connect"
import { useRef } from "react"
import { ClearForm } from "../../uikit/form/ClearForm"

interface BuildingsCreateComponentProps
  extends BuildingsCreateState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const BuildingsCreateComponent = (props: BuildingsCreateComponentProps) => {
  const { t } = useTranslation("buildings")
  const { createBuilding, createViewState, match, navigateToBuilding } = props
  const formRef = useRef<FormikProps<BuildingUpsert>>(null)
  return (
    <>
      <ClearForm<BuildingUpsert> viewState={createViewState} formRef={formRef} />
      <Formik<BuildingUpsert>
        initialValues={initialBuilding}
        onSubmit={(values) => createBuilding(match.params.zevId, values)}
        validate={(values) => validateBuilding(values, t)}
        innerRef={formRef}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, dirty }) => (
          <Form onSubmit={handleSubmit}>
            {createViewState.domainResult && (
              <SuccessAlertLink
                message={t("create.alert.success")}
                onClick={() => navigateToBuilding(match.params.zevId, createViewState.domainResult ?? "")}
              />
            )}
            {createViewState.domainError && <ErrorAlert message={createViewState.domainError.message} />}
            <PaperBox>
              <BuildingsForm
                mode={FormMode.CREATE}
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </PaperBox>
            <DividerBox />
            <FormActions>
              <PrimaryButtonLoading
                disabled={!isValid || !dirty}
                label={t("create.form.action.cta")}
                type="submit"
                startIcon={<CreateIcon />}
                isLoading={createViewState.isLoading}
              />
            </FormActions>
          </Form>
        )}
      </Formik>
    </>
  )
}
