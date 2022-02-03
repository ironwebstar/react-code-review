import { ProfileAdminResponse } from "../../data/generated-sources/openapi"
import { DomainDependencies } from "../Domain.Dependencies"
import { MyProfileModel } from "./MyProfile.Model"
import { formatTitleSalutation } from "../profiles/Profiles.Formatters"
import { StatusType } from "../Domain.Model"

export const myProfileMapper = (
  adminProfileResponse: ProfileAdminResponse,
  deps: DomainDependencies,
): MyProfileModel => {
  return {
    id: adminProfileResponse.id,
    title: `${formatTitleSalutation(
      adminProfileResponse.personal.title,
      adminProfileResponse.personal.salutation,
      deps,
    )} `,
    name: `${adminProfileResponse.personal.firstName} ${adminProfileResponse.personal.lastName}`,
    email: adminProfileResponse.contact.email ?? "",
    telephone: adminProfileResponse.contact.telephone ?? "",
    mobile: adminProfileResponse.contact.mobile ?? "",
    address: `${adminProfileResponse.address.street} ${adminProfileResponse.address.houseNumber}`,
    city: `${adminProfileResponse.address.postalCode}  ${adminProfileResponse.address.city}`,
    isBlocked: adminProfileResponse.isBlocked,
    currentState: StatusType[adminProfileResponse.currentState],
  }
}
