import { Redirect, RouteComponentProps } from "react-router-dom"
import { AppRouteParams } from "../App.Routes"
import { useTranslation } from "react-i18next"
import { useEffect, useMemo } from "react"
import { firstViewState } from "../Shared.Reducer"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"
import { ProfilesDetailState } from "./ProfilesDetail.Reducer"
import { PaperBox } from "../../uikit/page/PaperBox"
import { coerce } from "../Shared.View"
import { SpaceBetweenBox } from "../../uikit/box/AlignmentBox"
import { SmallPaddedBox, TinyPaddedBox } from "../../uikit/box/PaddedBox"
import { StatusView } from "../../uikit/label/StatusView"
import { Typography } from "@mui/material"
import { FormRowCell, FormRowColumn, FormSubtitle } from "../../uikit/form/FormView"
import {
  AddressIcon,
  ContactIcon,
  CorrespondenceIcon,
  CrossIcon,
  MobilePhoneIcon,
  RemoveIcon,
  ResetIcon,
  TelephoneIcon,
  UserProfileIcon,
  ZevsIcon,
} from "../../uikit/Shared.Icon"
import { DataItemBox } from "../../uikit/box/DataItemBox"
import { Heading2, Heading6 } from "../../uikit/typography/Typography"
import { FlexOneBox } from "../../uikit/box/FlexBox"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { DividerBox, MediumDividerBox } from "../../uikit/box/DividerBox"
import { AlignItemsCenterBox, AlignBottomBox } from "../../uikit/box/AlignmentBox"
import { PrimaryEditButton } from "../../uikit/button/PrimaryEditButton"
import { mapDispatchToProps } from "./ProfilesDetail.Connect"
import { ProfileStatusTypeView } from "./form/ProfileStatusType"
import { ProfileStatusType } from "../../domain/profiles/Profiles.Model"
import { ErrorAlert, SuccessAlert } from "../../uikit/Shared.Alert"
import { PrimaryButton } from "../../uikit/button/PrimaryButton"
import { formatEmail, formatPhone } from "../../uikit/Shared.Formatters"

interface ProfilesDetailComponentProps
  extends ProfilesDetailState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const ProfilesDetailComponent = (props: ProfilesDetailComponentProps) => {
  const { t } = useTranslation("profiles")
  const {
    viewState,
    getProfileById,
    navigateToUpdateProfile,
    deleteProfileViewState,
    deleteProfileById,
    directDeleteProfile,
    createProfileLoginViewState,
    createProfileLogin,
    activateViewState,
    activateProfile,
    deactivateViewState,
    deactivateProfile,
    resetPasswordViewState,
    resetPassword,
    navigateToCreateZev,
    match,
    showUpdateAlert,
  } = props
  const profileId = useMemo(() => match.params.profileId, [match])

  useEffect(() => {
    if (firstViewState(viewState)) {
      getProfileById(match.params.profileId)
    }
  }, [viewState, match])

  if (viewState.isLoading) return <ProgressIndicator />
  if (deleteProfileViewState.domainResult) return <Redirect to="/profiles" />
  if (viewState.domainError)
    return <ErrorAlert message={viewState.domainError.message} retry={() => getProfileById(match.params.profileId)} />
  return (
    <>
      {coerce(viewState.domainResult, (profileDetail) => (
        <>
          {showUpdateAlert && <SuccessAlert message={t("update.alert.success")} />}
          <PaperBox>
            <SpaceBetweenBox>
              <SmallPaddedBox>
                <StatusView id="profile-status" statusType={profileDetail.statusType} />
              </SmallPaddedBox>
              <SmallPaddedBox>
                <PrimaryEditButton id="profile-edit-cta" onClick={() => navigateToUpdateProfile(profileId)} />
              </SmallPaddedBox>
            </SpaceBetweenBox>
            <SmallPaddedBox>
              <Heading6 id="profile-label-title">{profileDetail.userTitle}</Heading6>
              <Heading2 id="profile-label-name">{profileDetail.profileName}</Heading2>
            </SmallPaddedBox>
            <SmallPaddedBox>
              <Typography variant={"h6"}>{t("details.label.contact")}</Typography>
            </SmallPaddedBox>
            <FormRowColumn>
              <FormRowCell>
                <FormSubtitle label={t("form.subtitle.address")} icon={<AddressIcon />} />
                <FormRowColumn>
                  <FlexOneBox>
                    <DataItemBox id="street" title={t("form.field.street")} value={profileDetail.address} />
                  </FlexOneBox>
                  <FlexOneBox>
                    <DataItemBox id="city" title={t("form.field.city")} value={profileDetail.city} />
                  </FlexOneBox>
                </FormRowColumn>
              </FormRowCell>
            </FormRowColumn>
            <TinyPaddedBox>
              <FormRowColumn>
                <FlexOneBox>
                  <FormSubtitle label={t("form.subtitle.telephone")} icon={<TelephoneIcon />} />
                  <DataItemBox
                    id="telephone"
                    title={t("form.field.telephone")}
                    value={formatPhone(profileDetail.telephone)}
                  />
                </FlexOneBox>
                <FlexOneBox>
                  <FormSubtitle label={t("form.subtitle.mobile")} icon={<MobilePhoneIcon />} />
                  <DataItemBox id="mobile" title={t("form.field.mobile")} value={formatPhone(profileDetail.mobile)} />
                </FlexOneBox>
              </FormRowColumn>
            </TinyPaddedBox>
            <TinyPaddedBox>
              <FormSubtitle label={t("form.label.correspondence")} icon={<CorrespondenceIcon />} />
              <FlexOneBox>
                <DataItemBox id="email" title={t("form.field.email")} value={formatEmail(profileDetail.email)} />
              </FlexOneBox>
            </TinyPaddedBox>
            {deleteProfileViewState.domainResult && <Redirect to="/profiles" />}
            {deleteProfileViewState.domainError && (
              <ErrorAlert
                retry={() => directDeleteProfile(profileDetail.id)}
                message={deleteProfileViewState.domainError.message}
              />
            )}
            <SmallPaddedBox>
              <AlignBottomBox>
                <PrimaryButtonLoading
                  id="delete-cta"
                  startIcon={<RemoveIcon fontSize="large" />}
                  label={t("details.button.delete")}
                  isLoading={deleteProfileViewState.isLoading}
                  onClick={() =>
                    deleteProfileById(profileDetail.id, t("form.alert.delete.body"), t("form.alert.delete.cta"))
                  }
                />
                <DividerBox />
                <PrimaryButton
                  id="create-zev-for-profile-cta"
                  startIcon={<ZevsIcon fontSize="large" />}
                  label={t("details.button.create-zev-for-profile")}
                  onClick={() => navigateToCreateZev(match.params.profileId)}
                />
              </AlignBottomBox>
            </SmallPaddedBox>
          </PaperBox>
          <DividerBox />
          <PaperBox>
            <SmallPaddedBox>
              <AlignItemsCenterBox>
                <Typography variant={"h4"}>{t("details.label.account")}</Typography>
                <DividerBox />
                <ProfileStatusTypeView id="profile-status-type" statusType={profileDetail.profileStatusType} />
              </AlignItemsCenterBox>
            </SmallPaddedBox>
            <FormRowColumn>
              <FormRowCell>
                <FormRowColumn>
                  <FlexOneBox>
                    <FormSubtitle label={t("form.label.username")} icon={<ContactIcon />} />
                    <DataItemBox id="username" title={t("form.field.username")} value={profileDetail.username} />
                  </FlexOneBox>
                  <FlexOneBox>
                    <FormSubtitle label={t("form.label.userType")} icon={<ContactIcon />} />
                    <DataItemBox
                      id="userType"
                      title={t("form.field.userType")}
                      value={t(`userType.${profileDetail.type}`)}
                    />
                  </FlexOneBox>
                </FormRowColumn>
              </FormRowCell>
            </FormRowColumn>
            {createProfileLoginViewState.domainError && (
              <ErrorAlert
                retry={() => createProfileLogin(profileDetail.id)}
                message={createProfileLoginViewState.domainError.message}
              />
            )}
            {activateViewState.domainError && (
              <ErrorAlert
                retry={() => activateProfile(profileDetail.id)}
                message={activateViewState.domainError.message}
              />
            )}
            {activateViewState.domainResult && <SuccessAlert message={t("details.alert.success.activate")} />}
            {deactivateViewState.domainError && (
              <ErrorAlert
                retry={() => deactivateProfile(profileDetail.id)}
                message={deactivateViewState.domainError.message}
              />
            )}
            {deactivateViewState.domainResult && <SuccessAlert message={t("details.alert.success.deactivate")} />}
            {resetPasswordViewState.domainResult && (
              <SuccessAlert message={t("details.alert.success.reset-password")} />
            )}
            {resetPasswordViewState.domainError && (
              <ErrorAlert
                retry={() => resetPassword(profileDetail.id)}
                message={resetPasswordViewState.domainError.message}
              />
            )}
            <SmallPaddedBox>
              <AlignBottomBox>
                {profileDetail.profileStatusType === ProfileStatusType.NOT_CREATED && (
                  <>
                    <PrimaryButtonLoading
                      id="create-login-cta"
                      startIcon={<UserProfileIcon fontSize="large" />}
                      label={t("details.button.create-login")}
                      isLoading={createProfileLoginViewState.isLoading}
                      onClick={() => createProfileLogin(profileDetail.id)}
                    />
                    <DividerBox />
                  </>
                )}
                {profileDetail.profileStatusType === ProfileStatusType.BLOCKED && (
                  <>
                    <PrimaryButtonLoading
                      id="activate-cta"
                      startIcon={<UserProfileIcon fontSize="large" />}
                      label={t("details.button.activate")}
                      isLoading={activateViewState.isLoading}
                      onClick={() => activateProfile(profileDetail.id)}
                    />
                    <DividerBox />
                  </>
                )}
                {profileDetail.profileStatusType === ProfileStatusType.ACTIVE && (
                  <>
                    <PrimaryButtonLoading
                      id="deactivate-cta"
                      startIcon={<CrossIcon fontSize="large" />}
                      label={t("details.button.deactivate")}
                      isLoading={deactivateViewState.isLoading}
                      onClick={() => deactivateProfile(profileDetail.id)}
                    />
                    <DividerBox />
                  </>
                )}
                {(profileDetail.profileStatusType === ProfileStatusType.ACTIVE ||
                  profileDetail.profileStatusType === ProfileStatusType.BLOCKED) && (
                  <>
                    <PrimaryButtonLoading
                      id="reset-password-cta"
                      startIcon={<ResetIcon fontSize="large" />}
                      label={t("details.button.reset-password")}
                      isLoading={resetPasswordViewState.isLoading}
                      onClick={() => resetPassword(profileDetail.id)}
                    />
                    <DividerBox />
                  </>
                )}
                <MediumDividerBox />
              </AlignBottomBox>
            </SmallPaddedBox>
          </PaperBox>
        </>
      ))}
    </>
  )
}
