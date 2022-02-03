import { combineEpics } from "redux-observable"
import { authEpics } from "./auth/Auth.Epic"
import { zevsEpics } from "./zevs/Zevs.Epic"
import { profilesEpics } from "./profiles/Profiles.Epic"
import { taskListEpic } from "./taskslist/TaskList.Epic"
import { appContainerEpics } from "./appcontainer/AppContainer.Epic"
import { buildingsEpic } from "./buildings/Buildings.Epic"
import { contractsEpic } from "./contracts/Contracts.Epic"
import { serviceComponentsEpic } from "./service-components/ServiceComponents.Epic"
import { consumptionPointsEpics } from "./consumptionpoints/ConsumptionPoints.Epic"
import { billingsInitialEpic } from "./billings/initial/BillingsInitial.Epic"
import { participantEpic } from "./participant/Participant.Epic"
import { productsEpic } from "./products/Products.Epic"
import { billingsRecurringEpic } from "./billings/recurring/BillingsRecurring.Epic"
import { meterReadingsEpic } from "./meter-readings/MeterReadings.Epic"
import { myProfileEpic } from "./my-profile/MyProfile.Epic"
import { settingsEpic } from "./settings/Settings.Epic"
import { billingsParticipantEpic } from "./billings/participant/BillingsParticipant.Epic"

export const appEpic = combineEpics(
  ...appContainerEpics,
  ...authEpics,
  ...zevsEpics,
  ...profilesEpics,
  ...taskListEpic,
  ...serviceComponentsEpic,
  ...contractsEpic,
  ...buildingsEpic,
  ...billingsInitialEpic,
  ...billingsParticipantEpic,
  ...consumptionPointsEpics,
  ...billingsInitialEpic,
  ...billingsRecurringEpic,
  ...participantEpic,
  ...meterReadingsEpic,
  ...myProfileEpic,
  ...productsEpic,
  ...settingsEpic,
)
