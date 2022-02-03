import { useTranslation } from "react-i18next"
import { RouteComponentProps } from "react-router-dom"
import { Redirect } from "react-router-dom"
import { PaperBox } from "../../uikit/page/PaperBox"
import { AppRouteParams } from "../App.Routes"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { Formik } from "formik"
import { DividerBox } from "../../uikit/box/DividerBox"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { FormActions } from "../../uikit/form/FormView"
import { SaveIcon } from "../../uikit/Shared.Icon"
import { initialParticipant, ParticipantUpsert } from "../../domain/participant/Participant.Model"
import { ParticipantForm } from "./form/ParticipantForm"
import { validateParticipant } from "./form/ParticipantForm.Validation"
import { ParticipantCreateState } from "./ParticipantCreate.Reducer"
import { VALIDATION_DEPS } from "../Shared.Validation"
import { mapDispatchToProps } from "./ParticipantCreate.Connect"

interface ParticipantCreateComponentProps
  extends ParticipantCreateState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const ParticipantCreateComponent = (props: ParticipantCreateComponentProps) => {
  const { t } = useTranslation("participant")
  const { createViewState, createParticipant, match } = props
  if (createViewState.domainResult)
    return <Redirect to={`/zevs/${match.params.zevId}/participant/${createViewState.domainResult}`} />
  return (
    <PaperBox>
      <>
        <Formik<ParticipantUpsert>
          initialValues={initialParticipant}
          onSubmit={(values) => createParticipant(match.params.zevId, values)}
          validate={(values) => validateParticipant(values, VALIDATION_DEPS, t)}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
            <form onSubmit={handleSubmit}>
              {createViewState.domainError && <ErrorAlert message={createViewState.domainError.message} />}
              <ParticipantForm
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <DividerBox />
              <FormActions>
                <PrimaryButtonLoading
                  disabled={!isValid}
                  label={t("form.action.cta")}
                  type="submit"
                  startIcon={<SaveIcon />}
                  isLoading={createViewState.isLoading}
                />
              </FormActions>
            </form>
          )}
        </Formik>
      </>
    </PaperBox>
  )
}
