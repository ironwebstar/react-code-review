import { testDomainDependencies } from "../Domain.TestUtils"
import { StatusType } from "../Domain.Model"

import {
  managerNamesMapper,
  profileListItemMapper,
  profileDetailMapper,
  profileStatusTypeMapper,
  profileUpdateMapper,
} from "./Profiles.Mapper"
import { testConfig, profileStub, profileUpsert } from "./Profiles.Stub"
import { ProfileStatusType } from "./Profiles.Model"

const domainDependencies = testDomainDependencies()
const depsStub = {
  ...domainDependencies,
  config: testConfig,
}

test("Manager names mapper", async () => {
  const result = managerNamesMapper(
    {
      elements: [profileStub],
      page: {
        limit: 10,
        currentPage: 1,
        totalElements: 10,
        totalPages: 1,
      },
    },
    depsStub,
  )

  expect(result).toEqual([
    {
      id: profileStub.id,
      fullNameAddress: "Person Herr Max Friberg, street No.1",
    },
  ])
})

test("Profile list item mapper", async () => {
  const result = profileListItemMapper(profileStub, depsStub)

  expect(result).toEqual({
    id: profileStub.id,
    statusType: StatusType[profileStub.currentState],
    profileName: "Person Herr Max Friberg",
    userName: profileStub.username,
    type: profileStub.userType,
    profileStatusType: ProfileStatusType.ACTIVE,
  })
})

test("Profile detail mapper", async () => {
  const result = profileDetailMapper(profileStub, depsStub)

  expect(result).toEqual({
    id: profileStub.id,
    statusType: StatusType[profileStub.currentState],
    username: profileStub.username,
    profileName: `${profileStub.personal.firstName} ${profileStub.personal.lastName}`,
    userTitle: "Person Herr",
    address: `${profileStub.address.street} ${profileStub.address.houseNumber}`,
    city: `${profileStub.address.postalCode} ${profileStub.address.city}`,
    telephone: profileStub.contact.telephone ?? "",
    mobile: profileStub.contact.mobile ?? "",
    email: profileStub.contact.email ?? "",
    type: profileStub.userType,
    profileStatusType: ProfileStatusType.ACTIVE,
  })
})

test("Profile status mapper", async () => {
  const result1 = profileStatusTypeMapper(profileStub.username, profileStub.isBlocked)
  const result2 = profileStatusTypeMapper("unavailable", profileStub.isBlocked)
  const result3 = profileStatusTypeMapper(profileStub.username, !profileStub.isBlocked)

  expect(result1).toEqual(ProfileStatusType.ACTIVE)
  expect(result2).toEqual(ProfileStatusType.NOT_CREATED)
  expect(result3).toEqual(ProfileStatusType.BLOCKED)
})

test("Profile update mapper", async () => {
  const result = profileUpdateMapper(profileStub)

  expect(result).toEqual(profileUpsert)
})
