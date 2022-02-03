import { FormikHandlers, FormikHelpers, FormikState } from "formik"
import { useTranslation } from "react-i18next"
import { billingFrequencyKeys, municipalityKeys, ZevsUpsert } from "../../../domain/zevs/ZevsUpsert.Model"
import { DividerBox } from "../../../uikit/box/DividerBox"
import { PaperBox } from "../../../uikit/page/PaperBox"
import {
  FormReadOnlyCell,
  FormRowCell,
  FormRowColumn,
  FormSectionTitle,
  FormSubtitle,
  FormView,
} from "../../../uikit/form/FormView"
import { SelectPicker } from "../../../uikit/input/SelectPicker"
import { SingleLineDatePicker } from "../../../uikit/input/SingleLineDatePicker"
import { SingleLineTextField } from "../../../uikit/input/SingleLineTextField"
import {
  MeasurementIcon,
  ContactIcon,
  TelephoneIcon,
  MobilePhoneIcon,
  CorrespondenceIcon,
  AddressIcon,
  MainContactIcon,
  PaymentInformationIcon,
} from "../../../uikit/Shared.Icon"
import ProfilesManagerSelectionConnect from "../../profiles/ProfilesManagerSelection.Connect"
import { PricesForm } from "../../prices/form/PricesForm"
import { validationError } from "../../Shared.Validation"
import { SwitchToggleView } from "../../../uikit/toggle/SwitchToggleView"
import { SmallPaddedHorizontalBox } from "../../../uikit/box/PaddedBox"
import { useState } from "react"

export enum ZevFormMode {
  CREATE,
  UPDATE,
}

interface ZevFormProps {
  mode: ZevFormMode
}

export function ZevForm(
  props: ZevFormProps &
    Pick<FormikHandlers, "handleChange" | "handleBlur"> &
    Pick<FormikState<ZevsUpsert>, "errors" | "values" | "touched"> &
    Pick<FormikHelpers<ZevsUpsert>, "setFieldValue">,
) {
  const { t } = useTranslation("zevs")
  const { mode, handleChange, handleBlur, touched, setFieldValue, values, errors } = props
  const [useZevAsAddress, setUseZevAsAddress] = useState(false)
  return (
    <>
      <PaperBox>
        <FormView>
          <FormRowCell>
            <SingleLineTextField
              required
              autoFocus
              id="name"
              name="name"
              type="text"
              label={t("form.field.name")}
              helperText={validationError(errors.name, touched.name)}
              value={values.name}
              onChange={(event) => {
                setFieldValue("name", event.target.value)
                setFieldValue("addressLineOne", event.target.value)
              }}
              onBlur={handleBlur}
            />
          </FormRowCell>
          <FormRowColumn>
            <FormRowCell>
              <SingleLineDatePicker
                required
                id="serviceStartDate"
                name="serviceStartDate"
                label={t("form.field.serviceStartDate")}
                value={values.serviceStartDate}
                helperText={validationError(errors.serviceStartDate, touched.serviceStartDate)}
                onChange={(value) => setFieldValue("serviceStartDate", value)}
                onBlur={handleBlur}
              />
            </FormRowCell>
            <FormRowCell>
              <SingleLineDatePicker
                disabled
                id="serviceEndDate"
                name="serviceEndDate"
                label={t("form.field.serviceEndDate")}
                value={values.serviceEndDate}
                onChange={(value) => setFieldValue("serviceEndDate", value)}
                onBlur={handleBlur}
              />
            </FormRowCell>
          </FormRowColumn>
          {mode === ZevFormMode.UPDATE && (
            <FormRowCell>
              <SingleLineDatePicker
                required
                id="nextBillingDate"
                name="nextBillingDate"
                label={t("form.field.nextBillingDate")}
                helperText={validationError(errors.nextBillingDate, touched.nextBillingDate)}
                value={values.nextBillingDate}
                onChange={(value) => setFieldValue("nextBillingDate", value)}
                onBlur={handleBlur}
              />
            </FormRowCell>
          )}
          {mode === ZevFormMode.UPDATE && (
            <FormRowColumn>
              <FormReadOnlyCell title={t("form.field.billingFrequency")} value={values.billingFrequency} />
              <FormRowCell>
                <SelectPicker
                  id="nextBillingFrequency"
                  name="nextBillingFrequency"
                  type="text"
                  label={t("form.field.nextBillingFrequency")}
                  emptyValue="None"
                  value={values.nextBillingFrequency ?? ""}
                  items={billingFrequencyKeys.map((billingFrequency) => ({
                    label: billingFrequency,
                    value: billingFrequency,
                  }))}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormRowCell>
            </FormRowColumn>
          )}
          {mode === ZevFormMode.CREATE && (
            <FormRowCell>
              <SelectPicker
                required
                id="billingFrequency"
                name="billingFrequency"
                type="text"
                label={t("form.field.nextBillingFrequency")}
                emptyValue="None"
                value={values.billingFrequency}
                items={billingFrequencyKeys.map((billingFrequency) => ({
                  label: billingFrequency,
                  value: billingFrequency,
                }))}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
          )}
          {mode === ZevFormMode.UPDATE && (
            <FormRowCell>
              <SingleLineDatePicker
                required
                id="zevStartDate"
                name="zevStartDate"
                label={t("form.field.zevStartDate")}
                helperText={validationError(errors.zevStartDate, touched.zevStartDate)}
                value={values.zevStartDate}
                onChange={(value) => setFieldValue("zevStartDate", value)}
                onBlur={handleBlur}
              />
            </FormRowCell>
          )}
          <FormRowCell>
            <SingleLineTextField
              required
              id="externalReferenceNumber"
              name="externalReferenceNumber"
              type="externalReferenceNumber"
              label={t("form.field.externalReferenceNumber")}
              helperText={validationError(errors.externalReferenceNumber, touched.externalReferenceNumber)}
              value={values.externalReferenceNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormRowCell>
          <FormSectionTitle label={t("form.subtitle.measurement")} icon={<MeasurementIcon fontSize="large" />} />
          <FormRowColumn>
            <FormRowCell>
              <SingleLineTextField
                required
                id="incomingMeteringCode"
                name="incomingMeteringCode"
                type="text"
                label={t("form.field.incomingMeteringCode")}
                helperText={validationError(errors.incomingMeteringCode, touched.incomingMeteringCode)}
                value={values.incomingMeteringCode}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ maxLength: 33 }}
                placeholder={t("form.field.MeteringCodePlaceholder")}
              />
            </FormRowCell>
            <FormRowCell>
              <SingleLineTextField
                required
                id="outgoingMeteringCode"
                name="outgoingMeteringCode"
                type="text"
                label={t("form.field.outgoingMeteringCode")}
                helperText={validationError(errors.outgoingMeteringCode, touched.outgoingMeteringCode)}
                value={values.outgoingMeteringCode}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ maxLength: 33 }}
                placeholder={t("form.field.MeteringCodePlaceholder")}
              />
            </FormRowCell>
          </FormRowColumn>
          <FormSectionTitle label={t("form.subtitle.contact")} icon={<ContactIcon fontSize="large" />} />
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
                id="contactTelephoneNumber"
                name="contactTelephoneNumber"
                type="text"
                label={t("form.field.contactTelephoneNumber")}
                helperText={validationError(errors.contactTelephoneNumber, touched.contactTelephoneNumber)}
                value={values.contactTelephoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
            <FormRowCell>
              <SingleLineTextField
                id="contactMobileNumber"
                name="contactMobileNumber"
                type="text"
                label={t("form.field.contactMobileNumber")}
                helperText={validationError(errors.contactMobileNumber, touched.contactMobileNumber)}
                value={values.contactMobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
          </FormRowColumn>
          <FormSubtitle label={t("form.subtitle.correspondance")} icon={<CorrespondenceIcon />} />
          <FormRowCell>
            <SingleLineTextField
              id="contactEmail"
              name="contactEmail"
              type="email"
              label={t("form.field.contactEmail")}
              helperText={validationError(errors.contactEmail, touched.contactEmail)}
              value={values.contactEmail}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormRowCell>
          <FormSectionTitle label={t("form.subtitle.address")} icon={<AddressIcon fontSize="large" />} />
          <SmallPaddedHorizontalBox>
            <SwitchToggleView
              label={t("form.toggle.accept-zev-name")}
              onChange={(checked) => {
                if (!checked) setFieldValue("addressLineOne", values.name)
                setUseZevAsAddress(!checked)
              }}
            />
          </SmallPaddedHorizontalBox>
          <FormRowCell>
            <SingleLineTextField
              required
              id="addressLineOne"
              name="addressLineOne"
              type="text"
              label={t("form.field.addressLineOne")}
              helperText={validationError(errors.addressLineOne, touched.addressLineOne)}
              value={!useZevAsAddress ? values.name : values.addressLineOne}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!useZevAsAddress}
            />
          </FormRowCell>
          <FormRowCell>
            <SingleLineTextField
              id="addressLineTwo"
              name="addressLineTwo"
              type="text"
              label={t("form.field.addressLineTwo")}
              value={values.addressLineTwo}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormRowCell>
          <FormRowColumn>
            <FormRowCell>
              <SingleLineTextField
                required
                id="addressStreet"
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
                id="addressHouseNumber"
                name="addressHouseNumber"
                type="text"
                label={t("form.field.addressHouseNumber")}
                helperText={validationError(errors.addressHouseNumber, touched.addressHouseNumber)}
                value={values.addressHouseNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
            <FormRowCell>
              <SingleLineTextField
                required
                id="addressPostalCode"
                name="addressPostalCode"
                type="text"
                label={t("form.field.addressPostalCode")}
                inputProps={{ maxLength: 6 }}
                helperText={validationError(errors.addressPostalCode, touched.addressPostalCode)}
                value={values.addressPostalCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
            <FormRowCell>
              <SingleLineTextField
                required
                id="addressCity"
                name="addressCity"
                type="text"
                label={t("form.field.addressCity")}
                helperText={validationError(errors.addressCity, touched.addressCity)}
                value={values.addressCity}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
          </FormRowColumn>
          <FormRowCell>
            <SelectPicker
              required
              id="municipality"
              name="municipality"
              type="text"
              label={t("form.field.municipality")}
              helperText={validationError(errors.municipality, touched.municipality)}
              value={values.municipality}
              emptyValue="None"
              items={municipalityKeys.map((municipality) => ({
                label: municipality,
                value: municipality,
              }))}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormRowCell>
          <FormSectionTitle label={t("form.subtitle.mainContact")} icon={<MainContactIcon fontSize="large" />} />
          <FormRowCell>
            <SingleLineTextField
              required
              id="mainContactName"
              name="mainContactName"
              type="text"
              label={t("form.field.mainContactName")}
              helperText={validationError(errors.mainContactName, touched.mainContactName)}
              value={values.mainContactName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormRowCell>
          <FormRowColumn>
            <FormRowCell>
              <SingleLineTextField
                id="mainContactTelephoneNumber"
                name="mainContactTelephoneNumber"
                type="text"
                label={t("form.field.mainContactTelephoneNumber")}
                value={values.mainContactTelephoneNumber}
                helperText={validationError(errors.contactTelephoneNumber, touched.contactTelephoneNumber)}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
            <FormRowCell>
              <SingleLineTextField
                id="mainContactMobileNumber"
                name="mainContactMobileNumber"
                type="text"
                label={t("form.field.mainContactMobileNumber")}
                value={values.mainContactMobileNumber}
                helperText={validationError(errors.contactMobileNumber, touched.contactMobileNumber)}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
          </FormRowColumn>
          <FormRowCell>
            <SingleLineTextField
              id="mainContactEmail"
              name="mainContactEmail"
              type="text"
              label={t("form.field.mainContactEmail")}
              value={values.mainContactEmail}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormRowCell>
          <FormSectionTitle
            label={t("form.subtitle.paymentInformation")}
            icon={<PaymentInformationIcon fontSize="large" />}
          />
          <FormRowColumn>
            <FormRowCell>
              <SingleLineTextField
                required
                id="paymentInformationPayee"
                name="paymentInformationPayee"
                type="text"
                label={t("form.field.paymentInformationPayee")}
                helperText={validationError(errors.paymentInformationPayee, touched.paymentInformationPayee)}
                value={values.paymentInformationPayee}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
            <FormRowCell>
              <SingleLineTextField
                required
                id="paymentInformationAccountNumber"
                name="paymentInformationAccountNumber"
                type="text"
                label={t("form.field.paymentInformationAccountNumber")}
                helperText={validationError(
                  errors.paymentInformationAccountNumber,
                  touched.paymentInformationAccountNumber,
                )}
                value={values.paymentInformationAccountNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
          </FormRowColumn>
          <FormRowColumn>
            <FormRowCell>
              <SingleLineTextField
                required
                id="paymentInformationIban"
                name="paymentInformationIban"
                type="text"
                label={t("form.field.paymentInformationIban")}
                helperText={validationError(errors.paymentInformationIban, touched.paymentInformationIban)}
                value={values.paymentInformationIban}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
            <FormRowCell>
              <SingleLineTextField
                id="paymentInformationVatNumber"
                name="paymentInformationVatNumber"
                type="text"
                label={t("form.field.paymentInformationVatNumber")}
                value={values.paymentInformationVatNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
          </FormRowColumn>
          <FormRowColumn>
            <FormRowCell>
              <SingleLineTextField
                required
                id="paymentInformationAddressStreet"
                name="paymentInformationAddressStreet"
                type="text"
                label={t("form.field.paymentInformationAddressStreet")}
                helperText={validationError(
                  errors.paymentInformationAddressStreet,
                  touched.paymentInformationAddressStreet,
                )}
                value={values.paymentInformationAddressStreet}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
            <FormRowCell>
              <SingleLineTextField
                required
                id="paymentInformationAddressHouseNumber"
                name="paymentInformationAddressHouseNumber"
                type="text"
                label={t("form.field.paymentInformationAddressHouseNumber")}
                helperText={validationError(
                  errors.paymentInformationAddressHouseNumber,
                  touched.paymentInformationAddressHouseNumber,
                )}
                value={values.paymentInformationAddressHouseNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
            <FormRowCell>
              <SingleLineTextField
                required
                id="paymentInformationAddressPostalCode"
                name="paymentInformationAddressPostalCode"
                type="text"
                label={t("form.field.paymentInformationAddressPostalCode")}
                helperText={validationError(
                  errors.paymentInformationAddressPostalCode,
                  touched.paymentInformationAddressPostalCode,
                )}
                value={values.paymentInformationAddressPostalCode}
                inputProps={{ maxLength: 6 }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
            <FormRowCell>
              <SingleLineTextField
                required
                id="paymentInformationAddressCity"
                name="paymentInformationAddressCity"
                type="text"
                label={t("form.field.paymentInformationAddressCity")}
                helperText={validationError(
                  errors.paymentInformationAddressCity,
                  touched.paymentInformationAddressCity,
                )}
                value={values.paymentInformationAddressCity}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormRowCell>
          </FormRowColumn>
        </FormView>
      </PaperBox>
      <DividerBox />
      {mode === ZevFormMode.UPDATE && (
        <>
          <PaperBox>
            <FormSectionTitle label={t("prices.title")} />
            <PricesForm
              pricePackages={values.pricePackages}
              pricePackagesChanged={(pricePackages) => setFieldValue("pricePackages", pricePackages)}
            />
          </PaperBox>
          <DividerBox />
        </>
      )}
      <ProfilesManagerSelectionConnect
        selectedItems={values.managers}
        onSelectionChanged={(managers) => setFieldValue("managers", managers)}
      />
    </>
  )
}
