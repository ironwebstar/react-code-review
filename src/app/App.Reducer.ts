import { connectRouter, RouterState, routerMiddleware } from "connected-react-router"
import { combineReducers } from "redux"
import { createBrowserHistory } from "history"
import { appContainerReducer, AppContainerState } from "./appcontainer/AppContainer.Reducer"
import { authLoginReducer, AuthState } from "./auth/AuthLogin.Reducer"
import { zevsListReducer, ZevsListState } from "./zevs/ZevsList.Reducer"
import { zevsCreateReducer, ZevsCreateState } from "./zevs/ZevsCreate.Reducer"
import { zevsUpdateReducer, ZevsUpdateState } from "./zevs/ZevsUpdate.Reducer"
import {
  profilesManagerSelectionReducer,
  ProfilesManagerSelectionState,
} from "./profiles/ProfilesManagerSelection.Reducer"
import { zevsDetailReducer, ZevsDetailState } from "./zevs/ZevsDetail.Reducer"
import { taskListReducer, TaskListState } from "./taskslist/TaskList.Reducer"
import { taskDetailReducer, TaskDetailState } from "./taskslist/TaskDetail.Reducer"
import { contractsListReducer, ContractsListState } from "./contracts/ContractsList.Reducer"
import { profilesListReducer, ProfilesListState } from "./profiles/ProfilesList.Reducer"
import { buildingsListReducer, BuildingsListState } from "./buildings/BuildingsList.Reducer"
import { buildingsDetailReducer, BuildingsDetailState } from "./buildings/BuildingsDetail.Reducer"
import { billingsInitialListReducer, BillingsInitialListState } from "./billings/initial/BillingsInitialList.Reducer"
import {
  billingsInitialDetailReducer,
  BillingsInitialDetailState,
} from "./billings/initial/BillingsInitialDetail.Reducer"
import {
  serviceComponentsListReducer,
  ServiceComponentsListState,
} from "./service-components/ServiceComponentsList.Reducer"
import { contractsDetailReducer, ContractsDetailState } from "./contracts/ContractsDetail.Reducer"
import {
  serviceComponentsDetailReducer,
  ServiceComponentsDetailState,
} from "./service-components/ServiceComponentsDetail.Reducer"
import {
  consumptionPointsListReducer,
  ConsumptionPointsListState,
} from "./consumptionpoints/ConsumptionPointsList.Reducer"
import {
  consumptionPointsDetailReducer,
  ConsumptionPointsDetailState,
} from "./consumptionpoints/ConsumptionPointsDetail.Reducer"

import { profilesZevManagerListReducer, ProfilesZevManagerListState } from "./profiles/ProfilesZevManagerList.Reducer"
import { buildingsZevListReducer, BuildingsZevListState } from "./buildings/BuildingsZevList.Reducer"
import { participantZevListReducer, ParticipantZevListState } from "./participant/ParticipantZevList.Reducer"
import { ProductsListState, productsListReducer } from "./products/ProductsList.Reducer"
import { contractsZevListReducer, ContractsZevListState } from "./contracts/ContractsZevList.Reducer"
import {
  serviceComponentsUpdateReducer,
  ServiceComponentsUpdateState,
} from "./service-components/ServiceComponentsUpdate.Reducer"
import { authForgottenPasswordReducer, AuthForgottenPasswordState } from "./auth/AuthForgottenPassword.Reducer"
import { buildingsUpdateReducer, BuildingsUpdateState } from "./buildings/BuildingsUpdate.Reducer"
import { ContractsUpdateState, contractsUpdateReducer } from "./contracts/ContractsUpdate.Reducer"
import { myProfileDetailReducer, MyProfileDetailState } from "./my-profile/MyProfileDetail.Reducer"
import { profilesDetailReducer, ProfilesDetailState } from "./profiles/ProfilesDetail.Reducer"
import {
  BillingsRecurringListState,
  billingsRecurringListReducer,
} from "./billings/recurring/BillingsRecurringList.Reducer"
import {
  billingsRecurringDetailReducer,
  BillingsRecurringDetailState,
} from "./billings/recurring/BillingsRecurringDetail.Reducer"
import {
  billingsRecurringCreateReducer,
  BillingsRecurringCreateState,
} from "./billings/recurring/BillingsRecurringCreate.Reducer"
import {
  meterReadingsIntraDayReducer,
  MeterReadingsIntraDayState,
} from "./meter-readings/MeterReadingsIntraDay.Reducer"
import { meterReadingsZevReducer, MeterReadingsZevState } from "./meter-readings/MeterReadingsZev.Reducer"
import {
  meterReadingsConsumptionPointReducer,
  MeterReadingsConsumptionPointState,
} from "./meter-readings/MeterReadingsConsumptionPoint.Reducer"
import {
  ConsumptionPointsParticipationsReducer,
  ConsumptionPointsParticipationsState,
} from "./consumptionpoints/ConsumptionPointsParticipations.Reducer"
import { buildingsCreateReducer, BuildingsCreateState } from "./buildings/BuildingsCreate.Reducer"
import { profilesUpdateReducer, ProfilesUpdateState } from "./profiles/ProfilesUpdate.Reducer"
import { participantDetailReducer, ParticipantDetailState } from "./participant/ParticipantDetail.Reducer"
import { participantUpdateReducer, ParticipantUpdateState } from "./participant/ParticipantUpdate.Reducer"
import { participantCreateReducer, ParticipantCreateState } from "./participant/ParticipantCreate.Reducer"
import {
  consumptionPointUpdateReducer,
  ConsumptionPointUpdateState,
} from "./consumptionpoints/ConsumptionPointUpdate.Reducer"
import { productsDetailReducer, ProductsDetailState } from "./products/ProductsDetail.Reducer"
import { profilesCreateReducer, ProfilesCreateState } from "./profiles/ProfilesCreate.Reducer"
import { SettingsChangePasswordState, settingsChangePasswordReducer } from "./settings/SettingsChangePassword.Reducer"
import { authNewAccountPasswordReducer, AuthNewAccountPasswordState } from "./auth/AuthNewAccountPassword.Reducer"
import {
  billingsAllPartcipantZevListReducer,
  BillingsAllParticipantZevListState,
} from "./billings/participant/BillingsAllParticipantZevList.Reducer"
import {
  billingsIndividualPartcipantZevListReducer,
  BillingsIndividualParticipantZevListState,
} from "./billings/participant/BillingsIndividualParticipantZevList.Reducer"
import {
  consumptionPointsCreateReducer,
  ConsumptionPointsCreateState,
} from "./consumptionpoints/ConsumptionPointCreate.Reducer"
import {
  billingsPartcipantDetailReducer,
  BillingsParticipantDetailState,
} from "./billings/participant/BillingsParticipantDetail.Reducer"
import {
  billingsPartcipantFinaliseReducer,
  BillingsParticipantFinaliseState,
} from "./billings/participant/BillingsParticipantFinalise.Reducer"
import { myProfileUpdateReducer, MyProfileUpdateState } from "./my-profile/MyProfileUpdate.Reducer"
import {
  serviceComponentsSelectionReducer,
  ServiceComponentsSelectionState,
} from "./service-components/ServiceComponentSelection.Reducer"
import { productsCreateReducer, ProductsCreateState } from "./products/ProductsCreate.Reducer"
import { productsUpdateReducer, ProductsUpdateState } from "./products/ProductsUpdate.Reducer"
import {
  productCreatePriceComponentReducer,
  ProductCreatePriceComponentState,
} from "./products/ProductCreatePriceComponent.Reducer"
import {
  productUpdatePriceComponentReducer,
  ProductUpdatePriceComponentState,
} from "./products/ProductUpdatePriceComponent.Reducer"
import { contractsCreateReducer, ContractsCreateState } from "./contracts/ContractsCreate.Reducer"
import {
  zevsDetailInitialBillingsReducer,
  ZevsDetailInitialBillingsState,
} from "./zevs/ZevsDetailInitialBillings.Reducer"
import {
  zevsDetailRecurringBillingsReducer,
  ZevsDetailRecurringBillingsState,
} from "./zevs/ZevsDetailRecurringBillings.Reducer"

export interface AppState {
  router: RouterState
  appContainer: AppContainerState
  authLogin: AuthState
  authForgottenPassword: AuthForgottenPasswordState
  authNewAccountPassword: AuthNewAccountPasswordState
  zevsList: ZevsListState
  zevsCreate: ZevsCreateState
  zevsDetail: ZevsDetailState
  zevsUpdate: ZevsUpdateState
  zevsDetailInitialBilling: ZevsDetailInitialBillingsState
  zevsDetailRecurringBilling: ZevsDetailRecurringBillingsState
  profilesManagerSelection: ProfilesManagerSelectionState
  profilesManagerList: ProfilesZevManagerListState
  profilesList: ProfilesListState
  profilesDetail: ProfilesDetailState
  profilesUpdate: ProfilesUpdateState
  profilesCreate: ProfilesCreateState
  taskList: TaskListState
  taskDetail: TaskDetailState
  serviceComponentsList: ServiceComponentsListState
  serviceComponentDetail: ServiceComponentsDetailState
  serviceComponentUpdate: ServiceComponentsUpdateState
  serviceComponentsSelection: ServiceComponentsSelectionState
  contractsList: ContractsListState
  contractsDetail: ContractsDetailState
  consumptionPointsDetail: ConsumptionPointsDetailState
  consumptionPointsList: ConsumptionPointsListState
  consumptionPointsCreate: ConsumptionPointsCreateState
  consumptionPointUpdate: ConsumptionPointUpdateState
  consumptionPointsParticipationsData: ConsumptionPointsParticipationsState
  contractsZevList: ContractsZevListState
  contractsUpdate: ContractsUpdateState
  contractsCreate: ContractsCreateState
  buildingsList: BuildingsListState
  buildingsDetail: BuildingsDetailState
  buildingsZevList: BuildingsZevListState
  buildingsUpdate: BuildingsUpdateState
  buildingsCreate: BuildingsCreateState
  billingsInitialList: BillingsInitialListState
  billingsInitialDetail: BillingsInitialDetailState
  billingsRecurringList: BillingsRecurringListState
  billingsRecurringDetail: BillingsRecurringDetailState
  billingsRecurringCreate: BillingsRecurringCreateState
  billingsAllParticipantZevList: BillingsAllParticipantZevListState
  billingsIndividualParticipantZevList: BillingsIndividualParticipantZevListState
  billingsParticipantDetail: BillingsParticipantDetailState
  billingsParticipantFinalise: BillingsParticipantFinaliseState
  participantZevList: ParticipantZevListState
  participantDetail: ParticipantDetailState
  participantUpdate: ParticipantUpdateState
  participantCreate: ParticipantCreateState
  productsList: ProductsListState
  productsDetail: ProductsDetailState
  productsCreate: ProductsCreateState
  productsUpdate: ProductsUpdateState
  productCreatePriceComponent: ProductCreatePriceComponentState
  productUpdatePriceComponent: ProductUpdatePriceComponentState
  meterReadingsIntraDay: MeterReadingsIntraDayState
  meterReadingsZev: MeterReadingsZevState
  meterReadingsConsumptionPoint: MeterReadingsConsumptionPointState
  myProfileDetailView: MyProfileDetailState
  myProfileUpdate: MyProfileUpdateState
  settingsChangePassword: SettingsChangePasswordState
}

export const history = createBrowserHistory()

history.listen(() => window.scrollTo(0, 0))

export const historyMiddleWare = routerMiddleware(history)

export const createAppReducer = combineReducers<AppState>({
  router: connectRouter(history),
  appContainer: appContainerReducer,
  authLogin: authLoginReducer,
  authForgottenPassword: authForgottenPasswordReducer,
  authNewAccountPassword: authNewAccountPasswordReducer,
  zevsList: zevsListReducer,
  zevsCreate: zevsCreateReducer,
  zevsDetail: zevsDetailReducer,
  zevsDetailInitialBilling: zevsDetailInitialBillingsReducer,
  zevsDetailRecurringBilling: zevsDetailRecurringBillingsReducer,
  zevsUpdate: zevsUpdateReducer,
  profilesManagerSelection: profilesManagerSelectionReducer,
  profilesManagerList: profilesZevManagerListReducer,
  profilesList: profilesListReducer,
  profilesUpdate: profilesUpdateReducer,
  profilesCreate: profilesCreateReducer,
  profilesDetail: profilesDetailReducer,
  productsCreate: productsCreateReducer,
  productsUpdate: productsUpdateReducer,
  taskList: taskListReducer,
  taskDetail: taskDetailReducer,
  serviceComponentsList: serviceComponentsListReducer,
  serviceComponentDetail: serviceComponentsDetailReducer,
  serviceComponentUpdate: serviceComponentsUpdateReducer,
  serviceComponentsSelection: serviceComponentsSelectionReducer,
  contractsList: contractsListReducer,
  contractsDetail: contractsDetailReducer,
  consumptionPointsDetail: consumptionPointsDetailReducer,
  consumptionPointsList: consumptionPointsListReducer,
  consumptionPointsCreate: consumptionPointsCreateReducer,
  consumptionPointUpdate: consumptionPointUpdateReducer,
  consumptionPointsParticipationsData: ConsumptionPointsParticipationsReducer,
  contractsZevList: contractsZevListReducer,
  contractsUpdate: contractsUpdateReducer,
  contractsCreate: contractsCreateReducer,
  buildingsList: buildingsListReducer,
  buildingsDetail: buildingsDetailReducer,
  buildingsZevList: buildingsZevListReducer,
  buildingsUpdate: buildingsUpdateReducer,
  buildingsCreate: buildingsCreateReducer,
  billingsInitialList: billingsInitialListReducer,
  billingsInitialDetail: billingsInitialDetailReducer,
  billingsRecurringList: billingsRecurringListReducer,
  billingsRecurringDetail: billingsRecurringDetailReducer,
  billingsRecurringCreate: billingsRecurringCreateReducer,
  billingsAllParticipantZevList: billingsAllPartcipantZevListReducer,
  billingsIndividualParticipantZevList: billingsIndividualPartcipantZevListReducer,
  billingsParticipantDetail: billingsPartcipantDetailReducer,
  billingsParticipantFinalise: billingsPartcipantFinaliseReducer,
  participantZevList: participantZevListReducer,
  participantDetail: participantDetailReducer,
  participantUpdate: participantUpdateReducer,
  participantCreate: participantCreateReducer,
  productsList: productsListReducer,
  productsDetail: productsDetailReducer,
  productCreatePriceComponent: productCreatePriceComponentReducer,
  productUpdatePriceComponent: productUpdatePriceComponentReducer,
  meterReadingsIntraDay: meterReadingsIntraDayReducer,
  meterReadingsZev: meterReadingsZevReducer,
  meterReadingsConsumptionPoint: meterReadingsConsumptionPointReducer,
  myProfileDetailView: myProfileDetailReducer,
  myProfileUpdate: myProfileUpdateReducer,
  settingsChangePassword: settingsChangePasswordReducer,
})
