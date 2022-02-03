import { createEpic } from "../Shared.Epic"
import { DOMAIN_DEPENDENCIES } from "../App.Config"
import {
  ServiceComponentsDetailItem,
  ServiceComponentsList,
} from "../../domain/service-components/ServiceComponents.Model"
import {
  getServiceComponentById,
  getServiceComponents,
  updateServiceComponent,
} from "../../domain/service-components/ServiceComponents.Repository"

export enum ServiceComponentsActionType {
  SERVICE_COMPONENTS_GET = "SERVICE_COMPONENTS_GET",
  SERVICE_COMPONENT_GET_BY_ID = "SERVICE_COMPONENT_GET_BY_ID",
  SERVICE_COMPONENT_UPDATE = "SERVICE_COMPONENT_UPDATE",
}

export const serviceComponentsEpic = [
  createEpic<ServiceComponentsList>(ServiceComponentsActionType.SERVICE_COMPONENTS_GET, () =>
    getServiceComponents(DOMAIN_DEPENDENCIES),
  ),
  createEpic<ServiceComponentsDetailItem>(ServiceComponentsActionType.SERVICE_COMPONENT_GET_BY_ID, (action) =>
    getServiceComponentById(action.serviceComponentId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ServiceComponentsActionType.SERVICE_COMPONENT_UPDATE, (action) =>
    updateServiceComponent(action.serviceComponentId, action.name, DOMAIN_DEPENDENCIES),
  ),
]
