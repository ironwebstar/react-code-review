import { useTranslation } from "react-i18next"
import React, { useEffect } from "react"
import { firstViewState } from "../Shared.Reducer"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"
import { PaperBox } from "../../uikit/page/PaperBox"
import { coerce } from "../Shared.View"
import { SpaceBetweenBox, AlignEndBox } from "../../uikit/box/AlignmentBox"
import { SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { StatusView } from "../../uikit/label/StatusView"
import { Typography } from "@mui/material"
import { FormRowCell, FormRowColumn, FormSubtitle } from "../../uikit/form/FormView"
import { AddressIcon, CorrespondenceIcon, EditIcon, MobilePhoneIcon, TelephoneIcon } from "../../uikit/Shared.Icon"
import { DataItemBox } from "../../uikit/box/DataItemBox"
import { Heading2, Heading6 } from "../../uikit/typography/Typography"
import { FlexOneBox } from "../../uikit/box/FlexBox"
import { DividerBox } from "../../uikit/box/DividerBox"
import { MyProfileDetailState } from "./MyProfileDetail.Reducer"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { mapDispatchToProps } from "./MyProfileDetail.Connect"
import { StatusType } from "../../domain/Domain.Model"
import { formatPhone, formatEmail } from "../../uikit/Shared.Formatters"
import { SuccessAlert } from "../../uikit/Shared.Alert"

interface MyProfileDetailComponentProps extends MyProfileDetailState, ReturnType<typeof mapDispatchToProps> {}

export const MyProfileDetailComponent = (props: MyProfileDetailComponentProps) => {
  const { t } = useTranslation("my-profile")
  const { getMyProfileViewState, getMyProfile, navigateToMyProfileUpdate, showUpdateAlert } = props

  useEffect(() => {
    if (firstViewState(getMyProfileViewState)) {
      getMyProfile()
    }
  }, [getMyProfileViewState])

  if (getMyProfileViewState.isLoading) return <ProgressIndicator />
  return (
    <>
      {showUpdateAlert && <SuccessAlert message={t("form.alert.success")} />}
      {coerce(getMyProfileViewState.domainResult, (myProfile) => (
        <>
          <PaperBox>
            <SpaceBetweenBox>
              <SmallPaddedBox>
                <StatusView statusType={StatusType.ACTIVE} />
              </SmallPaddedBox>
            </SpaceBetweenBox>
            <SmallPaddedBox>
              <Heading6>{myProfile.title}</Heading6>
              <Heading2>{myProfile.name}</Heading2>
            </SmallPaddedBox>
            <SmallPaddedBox>
              <Typography variant={"h5"}>{t("form.label.contact")}</Typography>
            </SmallPaddedBox>
            <FormRowColumn>
              <FormRowCell>
                <FormSubtitle label={t("form.subtitle.address")} icon={<AddressIcon />} />
                <FormRowColumn>
                  <FlexOneBox>
                    <DataItemBox title={t("form.field.street")} value={myProfile.address} />
                  </FlexOneBox>
                  <FlexOneBox>
                    <DataItemBox title={t("form.field.city")} value={myProfile.city} />
                  </FlexOneBox>
                </FormRowColumn>
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
            <SpaceBetweenBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.telephone")} value={formatPhone(myProfile.telephone)} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.mobile")} value={formatPhone(myProfile.mobile)} />
              </FlexOneBox>
            </SpaceBetweenBox>
            <FormSubtitle label={t("form.subtitle.correspondence")} icon={<CorrespondenceIcon />} />
            <SpaceBetweenBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.email")} value={formatEmail(myProfile.email)} />
              </FlexOneBox>
            </SpaceBetweenBox>
          </PaperBox>
          <DividerBox />
          <AlignEndBox>
            <PrimaryButtonLoading
              startIcon={<EditIcon fontSize="large" />}
              label={t("form.button.edit-my-profile")}
              isLoading={getMyProfileViewState.isLoading}
              onClick={() => navigateToMyProfileUpdate(myProfile.id)}
            />
          </AlignEndBox>
        </>
      ))}
    </>
  )
}
