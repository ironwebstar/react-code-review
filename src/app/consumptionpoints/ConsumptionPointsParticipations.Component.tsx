import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { DataItemBox } from "../../uikit/box/DataItemBox"
import { FormSectionTitle, FormSubtitle } from "../../uikit/form/FormView"
import { PaperBox } from "../../uikit/page/PaperBox"
import { ErrorAlert, SuccessAlert } from "../../uikit/Shared.Alert"
import { AddressIcon } from "../../uikit/Shared.Icon"
import { firstViewState } from "../Shared.Reducer"
import { ConsumptionPointsParticipationsState } from "./ConsumptionPointsParticipations.Reducer"
import { mapDispatchToProps } from "./ConsumptionPointsParticipations.Connect"
import { DividerBox } from "../../uikit/box/DividerBox"
import { coerce } from "../Shared.View"
import { ConsumptionPointParticipationsTable } from "./view/ConsumptionPointParticipationsTable"
import { ParticipantLinkView } from "./view/ParticipantLinkView"
import { ConsumptionPointReportMoveOutForm } from "./form/ConsumptionPointReportMoveOutForm"
import { ConsumptionPointReportMoveInForm } from "./form/ConsumptionPointReportMoveInForm"
import { ConsumptionPointParticipant } from "../../domain/participant/Participant.Model"
import { AlignItemsCenterBox } from "../../uikit/box/AlignmentBox"

interface ConsumptionPointsParticipationsProps
  extends ConsumptionPointsParticipationsState,
    ReturnType<typeof mapDispatchToProps> {
  consumptionPointId: string
  zevId: string
  buildingId: string
  participants: ConsumptionPointParticipant[]
}

export const ParticipationsComponent = (props: ConsumptionPointsParticipationsProps) => {
  const { t } = useTranslation("consumptionPointsParticipations")
  const {
    viewState,
    navigateToParticipant,
    getParticipations,
    consumptionPointId,
    zevId,
    buildingId,
    deleteViewStateMap,
    deleteParticipation,
    prevDeleteId,
    participationMoveOut,
    participantMoveIn,
    participants,
    moveOutViewStateMap,
    moveInViewStateMap,
  } = props
  useEffect(() => {
    if (firstViewState(viewState)) {
      getParticipations(consumptionPointId)
    }
  }, [viewState])
  const [reportMoveOutDialog, setReportMoveOutDialogParticipationId] = useState<
    { participantionId: string; nextMoveOutDate: number } | undefined
  >(undefined)
  const [reportMoveInDialog, setReportMoveInDialogParticipationId] = useState<
    { participantionId: string; moveInDate: number } | undefined
  >(undefined)
  return (
    <>
      {viewState.domainError && (
        <ErrorAlert retry={() => getParticipations(consumptionPointId)} message={viewState.domainError.message} />
      )}
      {deleteViewStateMap.domainResult.get(prevDeleteId ?? "") && <SuccessAlert message={t("delete.alert.success")} />}
      {coerce(viewState.domainResult, (consumptionPointParticipation) => {
        const participation = consumptionPointParticipation?.currentParticipation
        const currentParticipant = participation?.participant
        return (
          <PaperBox>
            <FormSectionTitle label={t("list.title")} />
            <FormSubtitle label={t("list.currentParticipant")} icon={<AddressIcon />} />
            {currentParticipant && (
              <>
                <DividerBox />
                <AlignItemsCenterBox>
                  <DataItemBox
                    title={t("list.name")}
                    value={
                      <ParticipantLinkView
                        zevId={zevId}
                        currentParticipant={currentParticipant}
                        navigateToParticipant={navigateToParticipant}
                      />
                    }
                  />
                  {currentParticipant && participation && participation.moveOutDate && (
                    <>
                      <DividerBox />
                      <DataItemBox title={t("list.label.moveOutDate")} value={participation.moveOutDate} />
                    </>
                  )}
                </AlignItemsCenterBox>
              </>
            )}
            <ConsumptionPointParticipationsTable
              participations={consumptionPointParticipation.participations}
              isLoading={viewState.isLoading}
              zevId={zevId}
              buildingId={buildingId}
              consumptionPointId={consumptionPointId}
              navigateToParticipant={navigateToParticipant}
              deleteViewState={deleteViewStateMap}
              deleteParticipation={(participationId) =>
                deleteParticipation(consumptionPointId, participationId, t("delete.dialog.body"))
              }
              moveOutParticipation={(participantionId, nextMoveOutDate) =>
                setReportMoveOutDialogParticipationId({ participantionId, nextMoveOutDate })
              }
              moveInParticipation={(participantionId, moveInDate) =>
                setReportMoveInDialogParticipationId({ participantionId, moveInDate })
              }
              moveOutViewState={moveOutViewStateMap}
              moveInViewState={moveInViewStateMap}
            />
          </PaperBox>
        )
      })}
      {reportMoveOutDialog && (
        <ConsumptionPointReportMoveOutForm
          open={reportMoveOutDialog !== undefined}
          onClose={() => setReportMoveOutDialogParticipationId(undefined)}
          confirmClick={(consumptionPointMoveOut) => {
            setReportMoveOutDialogParticipationId(undefined)
            participationMoveOut(consumptionPointId, reportMoveOutDialog.participantionId, consumptionPointMoveOut)
          }}
          participants={participants}
          nextMoveOutDate={reportMoveOutDialog.nextMoveOutDate ?? -1}
        />
      )}
      {reportMoveInDialog && (
        <ConsumptionPointReportMoveInForm
          open={reportMoveInDialog !== undefined}
          onClose={() => setReportMoveInDialogParticipationId(undefined)}
          confirmClick={(consumptionPointMoveIn) => {
            setReportMoveInDialogParticipationId(undefined)
            participantMoveIn(consumptionPointId, reportMoveInDialog.participantionId, consumptionPointMoveIn)
          }}
          participants={participants}
          moveInDate={reportMoveInDialog.moveInDate ?? -1}
        />
      )}
    </>
  )
}
