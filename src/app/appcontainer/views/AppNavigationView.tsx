import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import { Subtitle1Header } from "../../../uikit/typography/Header"
import {
  ServiceComponentsIcon,
  ProductIcon,
  ProfileIcon,
  ZevsIcon,
  ConnectionObjectsIcon,
  ConsumptionPointsIcon,
  ContractsIcon,
  BillingIcon,
  TodoListIcon,
} from "../../../uikit/Shared.Icon"
import { NavigationButton } from "../../../uikit/button/NavigationButton"
import { useTranslation } from "react-i18next"
import { RouteComponentProps } from "react-router"
import { AppRouteParams } from "../../App.Routes"
import { useMemo } from "react"

export interface AppNavigationViewProps {
  navigateServiceComponents: () => void
  navigateProduct: () => void
  navigateProfile: () => void
  navigateZevs: () => void
  navigateConnectionObjects: () => void
  navigateConsumptionPoints: () => void
  navigateContracts: () => void
  navigateBillingInitial: () => void
  navigateBillingRecurring: () => void
  navigateTodoList: () => void
}

export const AppNavigationView = (props: AppNavigationViewProps & RouteComponentProps<AppRouteParams>) => {
  const { t } = useTranslation()
  const {
    navigateServiceComponents,
    navigateProduct,
    navigateProfile,
    navigateZevs,
    navigateConnectionObjects,
    navigateConsumptionPoints,
    navigateContracts,
    navigateBillingInitial,
    navigateBillingRecurring,
    navigateTodoList,
    location,
  } = props
  const selectedNavigation = useMemo(() => determineSelectedNavigation(location.pathname), [location])
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
      }}
    >
      <Stack width={280}>
        <Subtitle1Header>{t("appContainer:navigation.title.product")}</Subtitle1Header>
        <NavigationButton
          label={t("appContainer:navigation.service-components")}
          icon={<ServiceComponentsIcon fontSize="medium" />}
          selected={selectedNavigation === SelectedNavigation.SERVICE_COMPONENT}
          onClick={navigateServiceComponents}
        />
        <NavigationButton
          label={t("appContainer:navigation.products")}
          icon={<ProductIcon fontSize="medium" />}
          selected={selectedNavigation === SelectedNavigation.PRODUCTS}
          onClick={navigateProduct}
        />
        <AppNavigationSpacer />

        <Subtitle1Header>{t("appContainer:navigation.title.profile")}</Subtitle1Header>
        <NavigationButton
          label={t("appContainer:navigation.profiles")}
          icon={<ProfileIcon fontSize="medium" />}
          selected={selectedNavigation === SelectedNavigation.PROFILES}
          onClick={navigateProfile}
        />
        <AppNavigationSpacer />

        <Subtitle1Header>{t("appContainer:navigation.title.zevtopology")}</Subtitle1Header>
        <NavigationButton
          label={t("appContainer:navigation.zevs")}
          icon={<ZevsIcon fontSize="medium" />}
          selected={selectedNavigation === SelectedNavigation.ZEVS}
          onClick={navigateZevs}
        />
        <NavigationButton
          label={t("appContainer:navigation.buildings")}
          icon={<ConnectionObjectsIcon fontSize="medium" />}
          selected={selectedNavigation === SelectedNavigation.BUILDINGS}
          onClick={navigateConnectionObjects}
        />
        <NavigationButton
          label={t("appContainer:navigation.consumptionpoints")}
          icon={<ConsumptionPointsIcon fontSize="medium" />}
          selected={selectedNavigation === SelectedNavigation.CONSUMPTION_POINTS}
          onClick={navigateConsumptionPoints}
        />
        <NavigationButton
          label={t("appContainer:navigation.contracts")}
          icon={<ContractsIcon fontSize="medium" />}
          selected={selectedNavigation === SelectedNavigation.CONTRACTS}
          onClick={navigateContracts}
        />
        <AppNavigationSpacer />

        <Subtitle1Header>{t("appContainer:navigation.title.billing")}</Subtitle1Header>
        <NavigationButton
          label={t("appContainer:navigation.billingsInitial")}
          icon={<BillingIcon fontSize="medium" />}
          selected={selectedNavigation === SelectedNavigation.BILLING_INITIAL}
          onClick={navigateBillingInitial}
        />
        <NavigationButton
          label={t("appContainer:navigation.billingsRecurring")}
          icon={<BillingIcon fontSize="medium" />}
          selected={selectedNavigation === SelectedNavigation.BILLING_RECURRING}
          onClick={navigateBillingRecurring}
        />
        <AppNavigationSpacer />

        <Subtitle1Header>{t("appContainer:navigation.title.tasks")}</Subtitle1Header>
        <NavigationButton
          label={t("appContainer:navigation.tasklist")}
          icon={<TodoListIcon fontSize="medium" />}
          selected={selectedNavigation === SelectedNavigation.TASK_LIST}
          onClick={navigateTodoList}
        />
        <AppNavigationSpacer />
      </Stack>
    </Box>
  )
}

const AppNavigationSpacer = () => <Box mt={1} />

enum SelectedNavigation {
  SERVICE_COMPONENT = "SERVICE_COMPONENT",
  PRODUCTS = "PRODUCT",
  PROFILES = "PROFILES",
  ZEVS = "ZEVS",
  BUILDINGS = "BUILDINGS",
  CONSUMPTION_POINTS = "CONSUMPTION_POINTS",
  CONTRACTS = "CONTRACTS",
  BILLING_INITIAL = "BILLING_INITIAL",
  BILLING_RECURRING = "BILLING_RECURRING",
  TASK_LIST = "TASK_LIST",
  UNKNOWN = "UNKNOWN",
}

export const determineSelectedNavigation = (pathname: string): SelectedNavigation => {
  if (pathname.includes("consumptionpoints")) {
    return SelectedNavigation.CONSUMPTION_POINTS
  } else if (pathname.includes("buildings")) {
    return SelectedNavigation.BUILDINGS
  } else if (pathname.startsWith("/service-components")) {
    return SelectedNavigation.SERVICE_COMPONENT
  } else if (pathname.startsWith("/products")) {
    return SelectedNavigation.PRODUCTS
  } else if (pathname.startsWith("/profiles")) {
    return SelectedNavigation.PROFILES
  } else if (pathname.startsWith("/zevs")) {
    return SelectedNavigation.ZEVS
  } else if (pathname.startsWith("/contracts")) {
    return SelectedNavigation.CONTRACTS
  } else if (pathname.startsWith("/billings/initial")) {
    return SelectedNavigation.BILLING_INITIAL
  } else if (pathname.startsWith("/billings/recurring")) {
    return SelectedNavigation.BILLING_RECURRING
  } else if (pathname.startsWith("/tasklist")) {
    return SelectedNavigation.TASK_LIST
  } else {
    return SelectedNavigation.UNKNOWN
  }
}
