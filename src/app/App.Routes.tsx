import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom"
import BuildingsDetailConnect from "./buildings/BuildingsDetail.Connect"
import BuildingsListConnect from "./buildings/BuildingsList.Connect"
import ContractsListConnect from "./contracts/ContractsList.Connect"
import ProfilesListConnect from "./profiles/ProfilesList.Connect"
import ServiceComponentsDetailConnect from "./service-components/ServiceComponentsDetail.Connect"
import ServiceComponentsConnect from "./service-components/ServiceComponentsList.Connect"
import ConsumptionPointsListConnect from "./consumptionpoints/ConsumptionPointsList.Connect"
import ConsumptionPointsDetailConnect from "./consumptionpoints/ConsumptionPointsDetail.Connect"
import { ConsumptionPointCreateConnect } from "./consumptionpoints/ConsumptionPointCreate.Connect"
import { ConsumptionPointUpdateConnect } from "./consumptionpoints/ConsumptionPointUpdate.Connect"
import TaskListConnect from "./taskslist/TaskList.Connect"
import ZevsCreateConnect from "./zevs/ZevsCreate.Connect"
import ZevsDetailConnect from "./zevs/ZevsDetail.Connect"
import ZevsListConnect from "./zevs/ZevsList.Connect"
import ZevsUpdateConnect from "./zevs/ZevsUpdate.Connect"
import BillingsInitialListConnect from "./billings/initial/BillingsInitialList.Connect"
import BillingsInitialDetailConnect from "./billings/initial/BillingsInitialDetail.Connect"
import BillingsRecurringListConnect from "./billings/recurring/BillingsRecurringList.Connect"
import BillingsRecurringDetailConnect from "./billings/recurring/BillingsRecurringDetail.Connect"
import BillingsRecurringCreateConnect from "./billings/recurring/BillingsRecurringCreate.Connect"
import ContractsDetailConnect from "./contracts/ContractsDetail.Connect"
import ContractsUpdateConnect from "./contracts/ContractsUpdate.Connect"
import ProductListConnect from "./products/ProductsList.Connect"
import ServiceComponentsUpdateConnect from "./service-components/ServiceComponentsUpdate.Connect"
import ProfilesDetailConnect from "./profiles/ProfilesDetail.Connect"
import BuildingsUpdateConnect from "./buildings/BuildingsUpdate.Connect"
import MyProfileConnect from "./my-profile/MyProfileDetail.Connect"
import BuildingsCreateConnect from "./buildings/BuildingsCreate.Connect"
import ProfilesUpdateConnect from "./profiles/ProfilesUpdate.Connect"
import ParticipantDetailConnect from "./participant/ParticipantDetail.Connect"
import ParticipantUpdateConnect from "./participant/ParticipantUpdate.Connect"
import ParticipantCreateConnect from "./participant/ParticipantCreate.Connect"
import ProfilesCreateConnect from "./profiles/ProfilesCreate.Connect"
import SettingsDetailConnect from "./settings/SettingsDetail.Connect"
import SettingsChangePasswordConnect from "./settings/SettingsChangePassword.Connect"
import BillingsParticipantDetailConnect from "./billings/participant/BillingsParticipantDetail.Connect"
import { BillingParticipantType } from "../domain/billings/participant/BillingsParticipant.Model"
import BillingsParticipantFinaliseConnect from "./billings/participant/BillingsParticipantFinalise.Connect"
import { TextButton } from "../uikit/button/TextButton"
import ProductsDetailConnect from "./products/ProductsDetail.Connect"
import MyProfileUpdateConnect from "./my-profile/MyProfileUpdate.Connect"
import ProductsCreateConnect from "./products/ProductsCreate.Connect"
import ProductsUpdateConnect from "./products/ProductsUpdate.Connect"
import ProductCreatePriceComponentConnect from "./products/ProductCreatePriceComponent.Connect"
import ProductUpdatePriceComponentConnect from "./products/ProductUpdatePriceComponent.Connect"
import ContractsCreateConnect from "./contracts/ContractsCreate.Connect"

export interface AppRouteParams {
  zevId: string
  buildingId: string
  serviceComponentId: string
  billingId: string
  contractId: string
  profileId: string
  consumptionPointId: string
  participantId: string
  productId: string
  priceId: string
}

export const AppRoutes = () => (
  <Switch>
    <Route path="/service-components/:serviceComponentId/update" component={ServiceComponentsUpdateConnect} />
    <Route path="/service-components/:serviceComponentId" component={ServiceComponentsDetailConnect} />
    <Route path="/service-components" component={ServiceComponentsConnect} />
    <Route path="/products/create" component={ProductsCreateConnect} />
    <Route path="/products/:productId/update" component={ProductsUpdateConnect} />
    <Route path="/products/:productId/price/create" component={ProductCreatePriceComponentConnect} />
    <Route path="/products/:productId/price/:priceId/update" component={ProductUpdatePriceComponentConnect} />
    <Route path="/products/:productId" component={ProductsDetailConnect} />
    <Route path="/products" component={ProductListConnect} />
    <Route path="/profiles/create" component={ProfilesCreateConnect} />
    <Route path="/profiles/:profileId/update" component={ProfilesUpdateConnect} />
    <Route path="/profiles/:profileId" component={ProfilesDetailConnect} />
    <Route path="/profiles" component={ProfilesListConnect} />
    <Route path="/my-profile/:profileId/update" component={MyProfileUpdateConnect} />
    <Route path="/my-profile" component={MyProfileConnect} />
    <Route path="/zevs/create/forprofile/:profileId" component={ZevsCreateConnect} />
    <Route path="/zevs/create" component={ZevsCreateConnect} />
    <Route path="/zevs/:zevId/contract/create" component={ContractsCreateConnect} />
    <Route path="/zevs/:zevId/billings/all/:billingId/edit">
      <BillingsParticipantDetailConnect billingParticipantType={BillingParticipantType.ALL} />
    </Route>
    <Route path="/zevs/:zevId/billings/individual/:billingId/edit">
      <BillingsParticipantDetailConnect billingParticipantType={BillingParticipantType.INDIVIDUAL} />
    </Route>
    <Route path="/zevs/:zevId/billings/all/:billingId/finalize">
      <BillingsParticipantFinaliseConnect billingParticipantType={BillingParticipantType.ALL} />
    </Route>
    <Route path="/zevs/:zevId/billings/individual/:billingId/finalize">
      <BillingsParticipantFinaliseConnect billingParticipantType={BillingParticipantType.INDIVIDUAL} />
    </Route>
    <Route path="/zevs/:zevId/participant/create" component={ParticipantCreateConnect} />
    <Route path="/zevs/:zevId/participant/:participantId/update" component={ParticipantUpdateConnect} />
    <Route path="/zevs/:zevId/participant/:participantId" component={ParticipantDetailConnect} />
    <Route path="/zevs/:zevId/buildings/create" component={BuildingsCreateConnect} />
    <Route path="/zevs/:zevId/buildings/:buildingId/update" component={BuildingsUpdateConnect} />
    <Route path="/zevs/:zevId/buildings/:buildingId" component={BuildingsDetailConnect} />
    <Route path="/zevs/:zevId/update" component={ZevsUpdateConnect} />
    <Route path="/zevs/:zevId" component={ZevsDetailConnect} />
    <Route path="/zevs/" component={ZevsListConnect} />
    <Route path="/buildings/:buildingId/consumptionpoint/create" component={ConsumptionPointCreateConnect} />
    <Route
      path="/buildings/:buildingId/consumptionpoints/:consumptionPointId/update"
      component={ConsumptionPointUpdateConnect}
    />
    <Route
      path="/buildings/:buildingId/consumptionpoints/:consumptionPointId"
      component={ConsumptionPointsDetailConnect}
    />
    <Route path="/buildings" component={BuildingsListConnect} />
    <Route path="/consumptionpoints" component={ConsumptionPointsListConnect} />
    <Route path="/billings/initial/details/:billingId" component={BillingsInitialDetailConnect} />
    <Route path="/billings/initial" component={BillingsInitialListConnect} />
    <Route path="/billings/recurring/create" component={BillingsRecurringCreateConnect} />
    <Route path="/billings/recurring/details/:billingId" component={BillingsRecurringDetailConnect} />
    <Route path="/billings/recurring" component={BillingsRecurringListConnect} />
    <Route path="/tasklist" component={TaskListConnect} />
    <Route path="/contracts/:contractId/update" component={ContractsUpdateConnect} />
    <Route path="/contracts/:contractId" component={ContractsDetailConnect} />
    <Route path="/contracts" component={ContractsListConnect} />
    <Route path="/settings/reset-password" component={SettingsChangePasswordConnect} />
    <Route path="/settings" component={SettingsDetailConnect} />
    <Route path="/">
      <Redirect to="/zevs/" />
    </Route>
  </Switch>
)

interface AppRouteButtonProps {
  id?: string
  label: string
  resolvePath: (params: AppRouteParams) => string
}

export const AppRouteButton = withRouter((props: AppRouteButtonProps & RouteComponentProps<AppRouteParams>) => {
  const { id, label, match, history, resolvePath } = props
  return <TextButton id={id} label={label} onClick={() => history.push(resolvePath(match.params))} />
})
