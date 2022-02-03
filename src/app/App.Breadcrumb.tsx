import { Box, IconButton } from "@mui/material"
import { RouteComponentProps } from "react-router-dom"
import { AlignItemsCenterBox } from "../uikit/box/AlignmentBox"
import { BreadcrumbIcon, HomeIcon } from "../uikit/Shared.Icon"
import { AppRouteParams } from "./App.Routes"
import { ServiceComponentBreadcrumb } from "./service-components/ServiceComponents.Breadcrumb"
import { ZevsBreadcrumb } from "./zevs/Zevs.Breadcrumb"
import { TasksBreadcrumb } from "./taskslist/Tasks.Breadcrumb"
import { ContractsBreadcrumb } from "./contracts/Contracts.Breadcrumb"
import { ProductsBreadcrumb } from "./products/Products.Breadcrumb"
import { BuildingsBreadcrumb } from "./buildings/Buildings.Breadcrumb"
import { BillingsInitialBreadcrumb } from "./billings/initial/BillingsInitialBreadcrumb"
import { BillingsRecurringBreadcrumb } from "./billings/recurring/BillingsRecurringBreadcrumb"
import { ConsumptionPointsBreadcrumb } from "./consumptionpoints/ConsumptionPoints.Breadcrumb"
import { MyProfileBreadcrumb } from "./my-profile/MyProfile.Breadcrumb"
import { ProfilesBreadcrumb } from "./profiles/Profiles.Breadcrumb"
import { SettingsBreadcrumb } from "./settings/Settings.Breadcrumb"

interface AppBreadcrumbProps {
  navigateRoot: () => void
}

export const AppBreadcrumb = (props: AppBreadcrumbProps & RouteComponentProps<AppRouteParams>) => {
  const { navigateRoot } = props
  return (
    <Box>
      <AlignItemsCenterBox>
        <IconButton onClick={navigateRoot}>
          <HomeIcon color="secondary" />
        </IconButton>
        <BreadcrumbIcon color="secondary" fontSize="small" />
        <SettingsBreadcrumb {...props} />
        <ServiceComponentBreadcrumb {...props} />
        <ZevsBreadcrumb {...props} />
        <TasksBreadcrumb />
        <ContractsBreadcrumb {...props} />
        <ProductsBreadcrumb {...props} />
        <BuildingsBreadcrumb {...props} />
        <BillingsInitialBreadcrumb {...props} />
        <BillingsRecurringBreadcrumb {...props} />
        <ConsumptionPointsBreadcrumb {...props} />
        <MyProfileBreadcrumb />
        <ProfilesBreadcrumb {...props} />
      </AlignItemsCenterBox>
    </Box>
  )
}
