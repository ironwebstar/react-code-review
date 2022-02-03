import { useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { ZevForm, ZevFormMode } from "./form/ZevsForm"
import { Form, Formik } from "formik"
import { ZevsUpdateState } from "./ZevsUpdate.Reducer"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"
import { firstViewState } from "../Shared.Reducer"
import { coerce } from "../Shared.View"
import { TinyPaddedBox } from "../../uikit/box/PaddedBox"
import { DividerBox } from "../../uikit/box/DividerBox"
import { AppRouteParams } from "../App.Routes"
import { StatusView } from "../../uikit/label/StatusView"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { validateUpdateZev } from "./form/ZevsForm.Validation"
import { VALIDATION_DEPS } from "../Shared.Validation"
import { mapDispatchToProps } from "./ZevsUpdate.Connect"
import { FormUpdateActionsView } from "../../uikit/form/FormUpdateActions"
import { Paper } from "@mui/material"

interface ZevsUpdateComponentProps
  extends ZevsUpdateState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const ZevsUpdateComponent = (props: ZevsUpdateComponentProps) => {
  const { t } = useTranslation("zevs")
  const { match, updateZev, updateZevViewState, getZevUpdate, getZevUpdateViewState, navigateToZev } = props
  const zevId = useMemo(() => match.params.zevId, [match])
  useEffect(() => {
    if (
      firstViewState(getZevUpdateViewState) ||
      (getZevUpdateViewState.domainResult && getZevUpdateViewState.domainResult.id !== zevId)
    ) {
      getZevUpdate(zevId)
    }
  }, [getZevUpdateViewState])
  if (getZevUpdateViewState.isLoading) return <ProgressIndicator />
  if (updateZevViewState.domainResult) return <Redirect to={`/zevs/${zevId}`} />
  return (
    <>
      {getZevUpdateViewState.domainError && <ErrorAlert message={getZevUpdateViewState.domainError.message} />}
      {coerce(getZevUpdateViewState.domainResult, (zevUpdate) => (
        <>
          <TinyPaddedBox>
            <StatusView statusType={zevUpdate.statusType} />
          </TinyPaddedBox>
          <Formik
            initialValues={zevUpdate}
            onSubmit={(values) => {
              updateZev(zevId, values)
            }}
            validate={(values) => validateUpdateZev(values, VALIDATION_DEPS, t)}
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
                {updateZevViewState.domainError && <ErrorAlert message={updateZevViewState.domainError.message} />}
                <Paper>
                  <ZevForm
                    mode={ZevFormMode.UPDATE}
                    values={values}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    errors={errors}
                  />
                </Paper>
                <DividerBox />
                <FormUpdateActionsView
                  buttonCtaLabel={t("update.form.action.cta")}
                  isValid={isValid}
                  dirty={dirty}
                  isLoading={updateZevViewState.isLoading}
                  navigateBack={() => navigateToZev(match.params.zevId)}
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
