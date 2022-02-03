import { FormikHandlers, FormikState } from "formik"
import { useTranslation } from "react-i18next"
import {
  businessPartnerTypeKeys,
  participantAddressCountryKeys,
  ParticipantUpsert,
  salutationKeys,
} from "../../../domain/participant/Participant.Model"
import { FormView, FormRowCell, FormRowColumn, FormSectionTitle } from "../../../uikit/form/FormView"
import { SelectPicker } from "../../../uikit/input/SelectPicker"
import { SingleLineTextField } from "../../../uikit/input/SingleLineTextField"
import { AddressIcon, ContactIcon } from "../../../uikit/Shared.Icon"
import { validationError } from "../../Shared.Validation"

export const ParticipantForm = (
  props: Pick<FormikHandlers, "handleChange" | "handleBlur"> &
    Pick<FormikState<ParticipantUpsert>, "errors" | "values" | "touched">,
) => {
  const { t } = useTranslation("participant")
  const { handleChange, handleBlur, touched, values, errors } = props
  return (
    <FormView>
      <FormSectionTitle label={t("form.subtitle.personaldata")} icon={<ContactIcon fontSize="large" />} />
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            name="businessPartnerName"
            type="text"
            label={t("form.field.businessPartnerName")}
            helperText={validationError(errors.businessPartnerName, touched.businessPartnerName)}
            value={values.businessPartnerName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SelectPicker
            required
            name="businessPartnerType"
            type="text"
            label={t("form.field.businessPartnerType")}
            helperText={validationError(errors.businessPartnerType, touched.businessPartnerType)}
            value={values.businessPartnerType}
            emptyValue="None"
            items={businessPartnerTypeKeys.map((businessPartnerType) => ({
              label: t(`business-partner-type.${businessPartnerType}`),
              value: businessPartnerType,
            }))}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
      <FormRowColumn>
        <FormRowCell>
          <SelectPicker
            required
            name="salutation"
            type="text"
            label={t("form.field.salutation")}
            helperText={validationError(errors.salutation, touched.salutation)}
            value={values.salutation}
            emptyValue="None"
            items={salutationKeys.map((salutation) => ({
              label: t(`shared:salutation.${salutation}`),
              value: salutation,
            }))}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            name="title"
            type="text"
            label={t("form.field.title")}
            helperText={validationError(errors.title, touched.title)}
            value={values.title}
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
            label={t("form.field.firstName")}
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
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            name="firstNameSecondPerson"
            type="text"
            label={t("form.field.firstNameSecondPerson")}
            helperText={validationError(errors.firstNameSecondPerson, touched.firstNameSecondPerson)}
            value={values.firstNameSecondPerson}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            name="lastNameSecondPerson"
            type="text"
            label={t("form.field.lastNameSecondPerson")}
            helperText={validationError(errors.lastNameSecondPerson, touched.lastNameSecondPerson)}
            value={values.lastNameSecondPerson}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            name="contactTelephone"
            type="text"
            label={t("form.field.contactTelephone")}
            helperText={validationError(errors.contactTelephone, touched.contactTelephone)}
            value={values.contactTelephone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            name="contactMobile"
            type="text"
            label={t("form.field.contactMobile")}
            helperText={validationError(errors.contactMobile, touched.contactMobile)}
            value={values.contactMobile}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            name="contactEmail"
            type="text"
            label={t("form.field.contactEmail")}
            helperText={validationError(errors.contactEmail, touched.contactEmail)}
            value={values.contactEmail}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
      <FormSectionTitle label={t("form.subtitle.address")} icon={<AddressIcon fontSize="large" />} />
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            required
            name="addressStreet"
            type="text"
            label={t("form.field.addressStreet")}
            helperText={validationError(errors.addressStreet, touched.addressStreet)}
            value={values.addressStreet}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            required
            name="addressHouseNumber"
            type="text"
            label={t("form.field.addressHouseNumber")}
            helperText={validationError(errors.addressHouseNumber, touched.addressHouseNumber)}
            value={values.addressHouseNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            name="addressCO"
            type="text"
            label={t("form.field.addressCO")}
            helperText={validationError(errors.addressCO, touched.addressCO)}
            value={values.addressCO}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            name="addressPostBox"
            type="text"
            label={t("form.field.addressPostBox")}
            helperText={validationError(errors.addressPostBox, touched.addressPostBox)}
            value={values.addressPostBox}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
      <FormRowColumn>
        <FormRowCell>
          <SingleLineTextField
            required
            name="addressPostCode"
            type="text"
            label={t("form.field.addressPostCode")}
            helperText={validationError(errors.addressPostCode, touched.addressPostCode)}
            value={values.addressPostCode}
            onChange={handleChange}
            onBlur={handleBlur}
            inputProps={{ maxLength: 6 }}
          />
        </FormRowCell>
        <FormRowCell>
          <SingleLineTextField
            required
            name="addressCity"
            type="text"
            label={t("form.field.addressCity")}
            helperText={validationError(errors.addressCity, touched.addressCity)}
            value={values.addressCity}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
        <FormRowCell>
          <SelectPicker
            required
            name="addressCountry"
            type="text"
            label={t("form.field.addressCountry")}
            helperText={validationError(errors.addressCountry, touched.addressCountry)}
            value={values.addressCountry}
            emptyValue="None"
            items={participantAddressCountryKeys.map((participantAddressCountry) => ({
              label: participantAddressCountry,
              value: participantAddressCountry,
            }))}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormRowCell>
      </FormRowColumn>
    </FormView>
  )
}
