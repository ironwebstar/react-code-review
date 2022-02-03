import { lastValueFrom } from "rxjs"
import * as sinon from "sinon"
import {
  AdminProfileApi,
  AdminZevApi,
  PersonalDataSalutationEnum,
  UserType,
} from "../../data/generated-sources/openapi/api"

import { StatusType } from "../Domain.Model"
import { santiseEmptyValues } from "../Domain.Mapper"
import { ajaxSuccess, testDomainDependencies } from "../Domain.TestUtils"

import {
  getProfiles,
  getProfileById,
  getProfileUpdateById,
  updateProfile,
  createProfile,
  deleteProfileById,
  createProfileLogin,
  activateProfile,
  deactivateProfile,
  resetPasswordProfile,
  getManagerNames,
  getManagerNamesByZevId,
} from "./Profiles.Repository"
import { ProfileStatusType } from "./Profiles.Model"
import { testConfig, profileStub, profileUpsert, zevStub } from "./Profiles.Stub"

const domainDependencies = testDomainDependencies()

test("Get profiles", async () => {
  // given
  const adminProfileApiStub = sinon.createStubInstance(AdminProfileApi)
  adminProfileApiStub.getAllProfiles.withArgs(1, 10000, undefined).returns(
    ajaxSuccess({
      elements: [profileStub],
      page: {
        limit: 10,
        currentPage: 1,
        totalElements: 10,
        totalPages: 1,
      },
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminProfileApi: adminProfileApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = getProfiles(depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: {
      page: {
        currentPage: 1,
        limit: 10,
        totalElements: 10,
        totalPages: 1,
      },
      profiles: [
        {
          id: profileStub.id,
          profileName: "Person Herr Max Friberg",
          profileStatusType: ProfileStatusType.ACTIVE,
          statusType: StatusType[profileStub.currentState],
          type: profileStub.userType,
          userName: profileStub.username,
        },
      ],
    },
  })
})

test("Get Profile By Id", async () => {
  // given
  const adminProfileApiStub = sinon.createStubInstance(AdminProfileApi)
  adminProfileApiStub.getAdminProfileById.withArgs(profileStub.id).returns(ajaxSuccess(profileStub))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminProfileApi: adminProfileApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = getProfileById(profileStub.id, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: {
      id: profileStub.id,
      address: `${profileStub.address.street} ${profileStub.address.houseNumber}`,
      city: `${profileStub.address.postalCode} ${profileStub.address.city}`,
      profileName: `${profileStub.personal.firstName} ${profileStub.personal.lastName}`,
      profileStatusType: ProfileStatusType.ACTIVE,
      statusType: StatusType[profileStub.currentState],
      type: profileStub.userType,
      userTitle: "Person Herr",
      email: profileStub.contact.email ?? "",
      mobile: profileStub.contact.mobile ?? "",
      telephone: profileStub.contact.telephone ?? "",
      username: profileStub.username,
    },
  })
})

test("Get Profile Update By Id", async () => {
  // given
  const adminProfileApiStub = sinon.createStubInstance(AdminProfileApi)
  adminProfileApiStub.getAdminProfileById.withArgs(profileStub.id).returns(ajaxSuccess(profileStub))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const result = getProfileUpdateById(profileStub.id, {
    ...domainDependencies,
    adminProfileApi: adminProfileApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: profileUpsert,
  })
})

test("Update profile", async () => {
  // given
  const profileUpdate = santiseEmptyValues({
    contact: {
      email: profileUpsert.email,
      telephone: profileUpsert.telephone,
      mobile: profileUpsert.mobile,
    },
    address: {
      street: profileUpsert.street,
      houseNumber: profileUpsert.houseNumber,
      postalCode: profileUpsert.postalCode,
      city: profileUpsert.city,
    },
    personal: {
      salutation: PersonalDataSalutationEnum[profileUpsert.salutation as keyof typeof PersonalDataSalutationEnum],
      title: profileUpsert.title,
      firstName: profileUpsert.firstName,
      lastName: profileUpsert.lastName,
    },
  })

  const adminProfileApiStub = sinon.createStubInstance(AdminProfileApi)
  adminProfileApiStub.updateAdminProfileById.withArgs(profileStub.id, profileUpdate).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const result = updateProfile(profileStub.id, profileUpsert, {
    ...domainDependencies,
    adminProfileApi: adminProfileApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})

test("Create profile", async () => {
  // given
  const profileCreate = santiseEmptyValues({
    userType: UserType[profileUpsert.userType as keyof typeof UserType],
    contact: {
      email: profileUpsert.email,
      telephone: profileUpsert.telephone,
      mobile: profileUpsert.mobile,
    },
    address: {
      street: profileUpsert.street,
      houseNumber: profileUpsert.houseNumber,
      postalCode: profileUpsert.postalCode,
      city: profileUpsert.city,
    },
    personal: {
      salutation: PersonalDataSalutationEnum[profileUpsert.salutation as keyof typeof PersonalDataSalutationEnum],
      title: profileUpsert.title,
      firstName: profileUpsert.firstName,
      lastName: profileUpsert.lastName,
    },
  })

  const adminProfileApiStub = sinon.createStubInstance(AdminProfileApi)
  adminProfileApiStub.createProfile.withArgs(profileCreate, undefined, undefined).returns(ajaxSuccess("response-url"))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const result = createProfile(profileUpsert, {
    ...domainDependencies,
    adminProfileApi: adminProfileApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: "response-url",
  })
})

test("Delete profile by id", async () => {
  // given
  const adminProfileApiStub = sinon.createStubInstance(AdminProfileApi)
  adminProfileApiStub.deleteProfileById.withArgs(profileStub.id).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const result = deleteProfileById(profileStub.id, {
    ...domainDependencies,
    adminProfileApi: adminProfileApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})

test("Create profile Login", async () => {
  // given
  const adminProfileApiStub = sinon.createStubInstance(AdminProfileApi)
  adminProfileApiStub.createAdminProfileLoginById.withArgs(profileStub.id).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const result = createProfileLogin(profileStub.id, {
    ...domainDependencies,
    adminProfileApi: adminProfileApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})

test("Activate profile", async () => {
  // given
  const adminProfileApiStub = sinon.createStubInstance(AdminProfileApi)
  adminProfileApiStub.blockunblockProfileById.withArgs(profileStub.id, "unblock").resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const result = activateProfile(profileStub.id, {
    ...domainDependencies,
    adminProfileApi: adminProfileApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})

test("Deactivate profile", async () => {
  // given
  const adminProfileApiStub = sinon.createStubInstance(AdminProfileApi)
  adminProfileApiStub.blockunblockProfileById.withArgs(profileStub.id, "block").resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const result = deactivateProfile(profileStub.id, {
    ...domainDependencies,
    adminProfileApi: adminProfileApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})

test("Reset password profile", async () => {
  // given
  const adminProfileApiStub = sinon.createStubInstance(AdminProfileApi)
  adminProfileApiStub.adminProfileResetPassword.withArgs(profileStub.id).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const result = resetPasswordProfile(profileStub.id, {
    ...domainDependencies,
    adminProfileApi: adminProfileApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})

test("Get manager names", async () => {
  // given
  const adminProfileApiStub = sinon.createStubInstance(AdminProfileApi)
  adminProfileApiStub.getAllProfiles.withArgs(1, 10000, undefined).returns(
    ajaxSuccess({
      elements: [profileStub],
      page: {
        limit: 10,
        currentPage: 1,
        totalElements: 10,
        totalPages: 1,
      },
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminProfileApi: adminProfileApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = getManagerNames(depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: {
      profiles: [
        {
          id: profileStub.id,
          fullNameAddress: "Person Herr Max Friberg, street No.1",
        },
      ],
    },
  })
})

test("Get manager names by zev Id", async () => {
  // given
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  const adminProfileApiStub = sinon.createStubInstance(AdminProfileApi)
  adminZevApiStub.adminGetZevById.withArgs(zevStub.id).returns(ajaxSuccess(zevStub))
  adminProfileApiStub.getAllProfiles.withArgs(1, 10000, undefined).returns(
    ajaxSuccess({
      elements: [profileStub],
      page: {
        limit: 10000,
        currentPage: 1,
        totalElements: 10,
        totalPages: 1,
      },
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminZevApi: adminZevApiStub,
    adminProfileApi: adminProfileApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = getManagerNamesByZevId(zevStub.id, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: {
      profiles: [
        {
          id: profileStub.id,
          fullNameAddress: "Person Herr Max Friberg, street No.1",
        },
      ],
    },
  })
})
