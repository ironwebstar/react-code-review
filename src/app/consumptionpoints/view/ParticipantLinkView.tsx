import { ConsumptionPointParticipant } from "../../../domain/participant/Participant.Model"
import { AlignItemsCenterBox } from "../../../uikit/box/AlignmentBox"
import { DividerBox } from "../../../uikit/box/DividerBox"
import { OpenButton } from "../../../uikit/button/OpenButton"
import { AddressIcon } from "../../../uikit/Shared.Icon"

interface ParticipantLinkViewProps {
  zevId: string
  currentParticipant: ConsumptionPointParticipant
  navigateToParticipant: (zevId: string, participantId: string) => void
}

export const ParticipantLinkView = (props: ParticipantLinkViewProps) => {
  const { zevId, currentParticipant, navigateToParticipant } = props
  return (
    <AlignItemsCenterBox>
      <AddressIcon color="primary" />
      <DividerBox />
      <OpenButton
        label={currentParticipant.fullName}
        open={() => navigateToParticipant(zevId, currentParticipant.id)}
      />
    </AlignItemsCenterBox>
  )
}
