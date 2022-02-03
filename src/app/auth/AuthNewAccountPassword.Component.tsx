import { Formik } from "formik"
import { useTranslation } from "react-i18next"
import { Redirect, RouteComponentProps } from "react-router"
import { SingleLineTextField } from "../../uikit/input/SingleLineTextField"
import { ImpressionHeader } from "../../uikit/typography/Header"
import { SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { Typography, Box } from "@mui/material"
import { FormActions } from "../../uikit/form/FormView"
import { AuthContainerView } from "./views/AuthContainerView"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { validationError, VALIDATION_DEPS } from "../Shared.Validation"
import { AuthNewAccountPasswordState } from "./AuthNewAccountPassword.Reducer"
import { validateNewAccountPassword } from "./AuthNewAccountPassword.Validation"
import { AppRouteParams } from "../App.Routes"
import { useMemo } from "react"
import { mapDispatchToProps } from "./AuthNewAccountPassword.Connect"

export interface AuthNewAccountPasswordComponentProps
  extends AuthNewAccountPasswordState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export interface AuthNewAccountPasswordValues {
  password: string
  confirmPassword: string
}

export const AuthNewAccountPasswordComponent = (props: AuthNewAccountPasswordComponentProps) => {
  const { t } = useTranslation("auth")
  const { viewState, newAccountPassword, location } = props
  const token = useMemo(() => location.search.split("?token=").pop() ?? "", [location])
  return (
    <AuthContainerView>
      <ImpressionHeader id="new-account-password-title">{t("newAccountPassword.title")}</ImpressionHeader>
      <Box ml={2} mr={2} mb={2}>
        <Typography variant="body1" id="new-account-password-subtitle">
          {t("newAccountPassword.label")}
        </Typography>
      </Box>
      <Formik<AuthNewAccountPasswordValues>
        validateOnBlur
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => newAccountPassword(token, values.password)}
        validate={(values) => validateNewAccountPassword(values, VALIDATION_DEPS, t)}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit, isValid, touched }) => (
          <form onSubmit={handleSubmit}>
            {viewState.domainResult && <Redirect to="/signin" />}
            {viewState.domainError && <ErrorAlert message={viewState.domainError.message} />}
            <SmallPaddedBox>
              <SingleLineTextField
                id="password"
                autoFocus={true}
                name="password"
                type="password"
                label={t("newAccountPassword.field.password")}
                helperText={validationError(errors.password, touched.password)}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </SmallPaddedBox>
            <SmallPaddedBox>
              <SingleLineTextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label={t("newAccountPassword.field.confirmPassword")}
                helperText={validationError(errors.confirmPassword, touched.confirmPassword)}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </SmallPaddedBox>
            <FormActions>
              <SmallPaddedBox>
                <PrimaryButtonLoading
                  id="new-account-password-cta"
                  disabled={!isValid}
                  isLoading={viewState.isLoading}
                  label={t("newAccountPassword.action.cta")}
                  type="submit"
                />
              </SmallPaddedBox>
            </FormActions>
          </form>
        )}
      </Formik>
    </AuthContainerView>
  )
}
