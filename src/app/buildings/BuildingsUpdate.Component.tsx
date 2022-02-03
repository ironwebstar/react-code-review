import { useTranslation } from "react-i18next"
import { RouteComponentProps } from "react-router-dom"
import { useEffect } from "react"
import { Redirect } from "react-router-dom"
import { firstViewState } from "../Shared.Reducer"
import { PaperBox } from "../../uikit/page/PaperBox"
import { coerce } from "../Shared.View"
import { AppRouteParams } from "../App.Routes"
import { BuildingUpsert } from "../../domain/buildings/Buildings.Model"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { BuildingsUpdateState } from "./BuildingsUpdate.Reducer"
import { Form, Formik } from "formik"
import { DividerBox } from "../../uikit/box/DividerBox"
import { FormMode } from "../../uikit/form/FormView"
import { validateBuilding } from "./form/BuildingsForm.Validation"
import { BuildingsForm } from "./form/BuildingsForm"
import { FormUpdateActionsView } from "../../uikit/form/FormUpdateActions"
import { mapDispatchToProps } from "./BuildingsUpdate.Connect"

interface BuildingsUpdateComponentProps
  extends BuildingsUpdateState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const BuildingsUpdateComponent = (props: BuildingsUpdateComponentProps) => {
  const { t } = useTranslation("buildings")
  const { getViewState, getBuildingUpsert, updateViewState, updateBuilding, match, navigateToBuilding } = props
  useEffect(() => {
    if (firstViewState(getViewState)) {
      getBuildingUpsert(match.params.buildingId)
    }
  }, [getViewState])
  if (getViewState.domainError) return <ErrorAlert message={getViewState.domainError.message} />
  if (updateViewState.domainResult)
    return <Redirect to={`/zevs/${match.params.zevId}/buildings/${match.params.buildingId}`} />
  return (
    <>
      {coerce(getViewState.domainResult, (buildingUpsert) => (
        <>
          <Formik<BuildingUpsert>
            initialValues={buildingUpsert}
            onSubmit={(values) => updateBuilding(match.params.buildingId, values)}
            validate={(values) => validateBuilding(values, t)}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, dirty, resetForm }) => (
              <Form onSubmit={handleSubmit}>
                {updateViewState.domainError && <ErrorAlert message={updateViewState.domainError.message} />}
                <PaperBox>
                  <BuildingsForm
                    mode={FormMode.UPDATE}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </PaperBox>
                <DividerBox />
                <FormUpdateActionsView
                  buttonCtaLabel={t("update.form.action.cta")}
                  isValid={isValid}
                  dirty={dirty}
                  isLoading={updateViewState.isLoading}
                  navigateBack={() => navigateToBuilding(match.params.zevId, match.params.buildingId)}
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
