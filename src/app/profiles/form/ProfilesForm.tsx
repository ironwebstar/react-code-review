import { FormikHandlers, FormikState } from "formik"
import { ProfileUpsert, salutationKeys, userTypeKeys } from "../../../domain/profiles/Profiles.Model"
import { useTranslation } from "react-i18next"
import {
  FormMode,
  FormRowCell,
  FormRowColumn,
  FormSectionTitle,
  FormSubtitle,
  FormView,
} from "../../../uikit/form/FormView"
import { SingleLineTextField } from "../../../uikit/input/SingleLineTextField"
import { SmallPaddedBox } from "../../../uikit/box/PaddedBox"
import {
  AddressIcon,
  CorrespondenceIcon,
  MobilePhoneIcon,
  ProfileIcon,
  TelephoneIcon,
} from "../../../uikit/Shared.Icon"
import { validationError } from "../../Shared.Validation"
import { SelectPicker } from "../../../uikit/input/SelectPicker"
import { SpaceBetweenBox } from "../../../uikit/box/AlignmentBox"
import { StatusView } from "../../../uikit/label/StatusView"

interface ProfileFormModeFormProps {
  mode: FormMode
}

export const ProfilesForm = (
  props: ProfileFormModeFormProps &
    Pick<FormikHandlers, "handleChange" | "handleBlur"> &
    Pick<FormikState<ProfileUpsert>, "errors" | "values" | "touched">,
) => {
  const { t } = useTranslation("profiles")
  const { mode, values, errors, handleChange, handleBlur, touched } = props
  return (
    <FormView>
      {mode === FormMode.CREATE && (
        <>
          <FormRowColumn>
            <FormRowCell>
              <FormSubtitle label={t("form.field.userType")} icon={<ProfileIcon />} />
            </FormRowCell>
          </FormRowColumn>
          <FormRowColumn>
            <FormRowCell>
              <SelectPicker
                required
                name="userType"
                type="text"
                label={t("form.field.userType")}
                helperText={validationError(errors.userType, touched.userType)}
                emptyValue="None"
                value={values.userType}
                items={userTypeKeys.map((userType) => ({
                  label: t(`userType.${userType}`),
                  value: userType,
                }))}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
          </FormRowColumn>
        </>
      )}
      {mode === FormMode.UPDATE && (
        <>
          <SpaceBetweenBox>
            <SmallPaddedBox>
              <StatusView statusType={values.statusType} />
            </SmallPaddedBox>
          </SpaceBetweenBox>
        </>
      )}
      <FormSectionTitle label={t("form.subtitle.personal-details")} />
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            name="title"
            type="text"
            label={t("form.user.title")}
            helperText={validationError(errors.title, touched.title)}
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SelectPicker
            required
            name="salutation"
            type="text"
            label={t("form.user.salutation")}
            emptyValue="None"
            value={values.salutation}
            helperText={validationError(errors.salutation, touched.salutation)}
            items={salutationKeys.map((salutation) => ({
              label: t(`shared:salutation.${salutation}`),
              value: salutation,
            }))}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            required
            name="firstName"
            type="text"
            label={t("form.field.first-name")}
            helperText={validationError(errors.firstName, touched.firstName)}
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            required
            name="lastName"
            type="text"
            label={t("form.field.lastName")}
            helperText={validationError(errors.lastName, touched.lastName)}
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
      <FormSectionTitle label={t("details.subtitle.contact")} />
      <FormSubtitle label={t("form.subtitle.address")} icon={<AddressIcon />} />
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            required
            name="street"
            type="text"
            label={t("form.field.street")}
            helperText={validationError(errors.street, touched.street)}
            value={values.street}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            required
            name="houseNumber"
            type="text"
            label={t("form.field.house-number")}
            helperText={validationError(errors.houseNumber, touched.houseNumber)}
            value={values.houseNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            required
            name="postalCode"
            type="text"
            inputProps={{ maxLength: 6 }}
            label={t("form.field.postalCode")}
            helperText={validationError(errors.postalCode, touched.postalCode)}
            value={values.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            required
            name="city"
            type="text"
            label={t("form.field.city")}
            helperText={validationError(errors.city, touched.city)}
            value={values.city ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
      <FormRowColumn>
        <FormRowCell>
          <FormSubtitle label={t("form.subtitle.telephone")} icon={<TelephoneIcon />} />
        </FormRowCell>
        <FormRowCell>
          <FormSubtitle label={t("form.subtitle.mobile")} icon={<MobilePhoneIcon />} />
        </FormRowCell>
      </FormRowColumn>
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            name="telephone"
            type="tel"
            label={t("form.field.telephone")}
            helperText={validationError(errors.telephone, touched.telephone)}
            value={values.telephone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            name="mobile"
            type="tel"
            label={t("form.field.mobile")}
            helperText={validationError(errors.mobile, touched.mobile)}
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
      <FormSubtitle label={t("form.subtitle.correspondence")} icon={<CorrespondenceIcon />} />
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            name="email"
            type="email"
            label={t("form.field.email")}
            helperText={validationError(errors.email, touched.email)}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
    </FormView>
  )
}
