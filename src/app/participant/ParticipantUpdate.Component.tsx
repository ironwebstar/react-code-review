import { useTranslation } from "react-i18next"
import { RouteComponentProps } from "react-router-dom"
import { useEffect } from "react"
import { Redirect } from "react-router-dom"
import { firstViewState } from "../Shared.Reducer"
import { PaperBox } from "../../uikit/page/PaperBox"
import { coerce } from "../Shared.View"
import { AppRouteParams } from "../App.Routes"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { Formik } from "formik"
import { DividerBox } from "../../uikit/box/DividerBox"
import { ParticipantUpsert } from "../../domain/participant/Participant.Model"
import { ParticipantUpdateState } from "./ParticipantUpdate.Reducer"
import { ParticipantForm } from "./form/ParticipantForm"
import { validateParticipant } from "./form/ParticipantForm.Validation"
import { VALIDATION_DEPS } from "../Shared.Validation"
import { mapDispatchToProps } from "./ParticipantUpdate.Connect"
import { FormUpdateActionsView } from "../../uikit/form/FormUpdateActions"

interface ParticipantUpdateComponentProps
  extends ParticipantUpdateState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const ParticipantUpdateComponent = (props: ParticipantUpdateComponentProps) => {
  const { t } = useTranslation("participant")
  const { getViewState, getParticipantUpdate, updateViewState, updateParticipant, navigateToParticipant, match } = props
  useEffect(() => {
    if (firstViewState(getViewState)) {
      getParticipantUpdate(match.params.participantId)
    }
  }, [getViewState])
  if (getViewState.domainError) return <ErrorAlert message={getViewState.domainError.message} />
  if (updateViewState.domainResult)
    return <Redirect to={`/zevs/${match.params.zevId}/participant/${match.params.participantId}`} />
  return (
    <PaperBox>
      {coerce(getViewState.domainResult, (participantUpdate) => (
        <>
          <Formik<ParticipantUpsert>
            initialValues={participantUpdate}
            onSubmit={(values) => updateParticipant(match.params.participantId, values)}
            validate={(values) => validateParticipant(values, VALIDATION_DEPS, t)}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, resetForm, dirty }) => (
              <form onSubmit={handleSubmit}>
                {updateViewState.domainError && <ErrorAlert message={updateViewState.domainError.message} />}
                <ParticipantForm
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <DividerBox />
                <FormUpdateActionsView
                  buttonCtaLabel={t("form.cta.save-participant")}
                  isValid={isValid}
                  dirty={dirty}
                  isLoading={updateViewState.isLoading}
                  navigateBack={() => navigateToParticipant(match.params.zevId, match.params.participantId)}
                  resetForm={resetForm}
                />
              </form>
            )}
          </Formik>
        </>
      ))}
    </PaperBox>
  )
}
