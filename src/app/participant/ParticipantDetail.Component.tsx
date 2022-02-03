import { useEffect } from "react"
import { firstViewState } from "../Shared.Reducer"
import { PaperBox } from "../../uikit/page/PaperBox"
import { useTranslation } from "react-i18next"
import { ParticipantDetailState } from "./ParticipantDetail.Reducer"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { AppRouteParams } from "../App.Routes"
import { coerce } from "../Shared.View"
import { ErrorAlert } from "../../uikit/Shared.Alert"
import { SynchronisedIndicatorLabel } from "./views/SynchronisedIndicatorLabel"
import { ImpressionHeader } from "../../uikit/typography/Header"
import { DataItemBox } from "../../uikit/box/DataItemBox"
import { AddressIcon, ContactIcon, RemoveIcon, TickIcon } from "../../uikit/Shared.Icon"
import { FormSectionTitle } from "../../uikit/form/FormView"
import { FlexOneBox } from "../../uikit/box/FlexBox"
import { SpaceBetweenBox, SpaceBetweenMiddleBox, AlignBottomBox, AlignEndBox } from "../../uikit/box/AlignmentBox"
import { PrimaryEditButton } from "../../uikit/button/PrimaryEditButton"
import { SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { DividerBox } from "../../uikit/box/DividerBox"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"
import { mapDispatchToProps } from "./ParticipantDetail.Connect"
import { OpenButton } from "../../uikit/button/OpenButton"
import { formatEmail, formatPhone } from "../../uikit/Shared.Formatters"

interface ParticipantDetailComponentProps
  extends ParticipantDetailState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const ParticipantDetailComponent = (props: ParticipantDetailComponentProps) => {
  const { t } = useTranslation("participant")
  const {
    viewState,
    getParticipant,
    syncViewState,
    syncParticipant,
    match,
    navigateToZev,
    navigateToUpdateParticipant,
    deleteParticipant,
    deleteViewState,
  } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getParticipant(match.params.participantId)
    }
  }, [viewState])

  if (viewState.isLoading) return <ProgressIndicator />
  return (
    <>
      {deleteViewState.domainResult && <Redirect to={`/zevs/${match.params.zevId}`} />}
      {deleteViewState.domainError && <ErrorAlert message={deleteViewState.domainError.message} />}
      {syncViewState.domainError && <ErrorAlert message={syncViewState.domainError.message} />}
      {viewState.domainError && <ErrorAlert message={viewState.domainError.message} />}
      {coerce(viewState.domainResult, (participantDetail) => (
        <>
          <PaperBox>
            <SpaceBetweenBox>
              <SmallPaddedBox>
                <SynchronisedIndicatorLabel synchronised={participantDetail.syncStatus} />
              </SmallPaddedBox>
              <SmallPaddedBox>
                <PrimaryEditButton
                  onClick={() => navigateToUpdateParticipant(participantDetail.zevId, participantDetail.id)}
                />
              </SmallPaddedBox>
            </SpaceBetweenBox>
            <ImpressionHeader>{participantDetail.name}</ImpressionHeader>
            <AlignBottomBox>
              <DataItemBox
                title={t("detail.label.zev")}
                value={<OpenButton label={participantDetail.zevName} open={() => navigateToZev(match.params.zevId)} />}
              />
            </AlignBottomBox>
            <FormSectionTitle label={t("form.subtitle.personaldata")} icon={<ContactIcon fontSize="large" />} />
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.businessPartnerName")}
                  value={participantDetail.businessPartnerName}
                />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.businessPartnerType")}
                  value={t(`business-partner-type.${participantDetail.businessPartnerType}`)}
                />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.salutation")} value={participantDetail.salutation} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.title")} value={participantDetail.title} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.firstName")} value={participantDetail.firstName} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.lastName")} value={participantDetail.lastName} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.firstNameSecondPerson")}
                  value={participantDetail.firstNameSecondPerson}
                />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.lastNameSecondPerson")}
                  value={participantDetail.lastNameSecondPerson}
                />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.contactTelephone")}
                  value={formatPhone(participantDetail.contactTelephone)}
                />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox
                  title={t("form.field.contactMobile")}
                  value={formatPhone(participantDetail.contactMobile)}
                />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.contactEmail")} value={formatEmail(participantDetail.contactEmail)} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <FormSectionTitle label={t("form.subtitle.address")} icon={<AddressIcon fontSize="large" />} />
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.addressStreet")} value={participantDetail.addressStreet} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.addressHouseNumber")} value={participantDetail.addressHouseNumber} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.addressCO")} value={participantDetail.addressCO} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.addressPostBox")} value={participantDetail.addressPostBox} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
            <SpaceBetweenMiddleBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.addressPostCode")} value={participantDetail.addressPostCode} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.addressCity")} value={participantDetail.addressCity} />
              </FlexOneBox>
              <FlexOneBox>
                <DataItemBox title={t("form.field.addressCountry")} value={participantDetail.addressCountry} />
              </FlexOneBox>
            </SpaceBetweenMiddleBox>
          </PaperBox>
          <DividerBox />
          <AlignEndBox>
            <PrimaryButtonLoading
              startIcon={<RemoveIcon />}
              label={t("detail.action.delete")}
              isLoading={deleteViewState.isLoading}
              onClick={() =>
                deleteParticipant(participantDetail.id, t("form.alert.delete.label"), t("form.alert.delete.cta"))
              }
            />
            <DividerBox />
            <PrimaryButtonLoading
              disabled={participantDetail.syncStatus}
              startIcon={<TickIcon />}
              label={t("detail.action.sapSync")}
              isLoading={syncViewState.isLoading}
              onClick={() => syncParticipant(participantDetail.id)}
            />
          </AlignEndBox>
        </>
      ))}
    </>
  )
}
