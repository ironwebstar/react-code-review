import * as sinon from "sinon"
import { lastValueFrom } from "rxjs"
import localeDateDE from "date-fns/locale/de"
import { format } from "date-fns"
import { AdminBuildingApi, AdminZevApi, AdminConsumptionPointApi } from "../../data/generated-sources/openapi/api"
import { ajaxSuccess, testDomainDependencies } from "../Domain.TestUtils"
import {
  getBuildings,
  getBuildingById,
  getConsumptionPointsWithParticipations,
  getBuildingsByZevId,
  createBuilding,
  updateBuilding,
  getBuildingUpdateById,
  deactivateBuilding,
  deleteBuilding,
} from "./Buildings.Repository"
import {
  testConfig,
  pageStub,
  buildingStub,
  zevStub,
  participantStub,
  consumptionPointStub,
  buildingUpsert,
} from "./Buildings.Stub"
import { StatusType } from "../Domain.Model"

const domainDependencies = testDomainDependencies()

test("Get buildings", async () => {
  // given
  const adminBuildingApiStub = sinon.createStubInstance(AdminBuildingApi)
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminBuildingApiStub.adminGetBuildings.withArgs(1, 10000, undefined).returns(
    ajaxSuccess({
      elements: [buildingStub],
      page: pageStub,
    }),
  )
  adminZevApiStub.adminGetZevs.withArgs(1, 10000, undefined).returns(
    ajaxSuccess({
      elements: [zevStub],
      page: pageStub,
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminBuildingApi: adminBuildingApiStub,
    adminZevApi: adminZevApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = getBuildings(depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: {
      buildings: [
        {
          id: buildingStub.id,
          statusType: StatusType[buildingStub.currentState],
          buildingObject: buildingStub.name ?? "",
          address:
            `${buildingStub.address.street} ${buildingStub.address.houseNumber} ` +
            `${buildingStub.address.postalCode} ${buildingStub.address.city}`,
          zevId: zevStub?.id ?? "",
          zevName: zevStub?.name ?? "",
        },
      ],
    },
  })
})

test("getConsumptionPointsWithParticipations", async () => {
  // given
  const adminConsumptionPointApiStub = sinon.createStubInstance(AdminConsumptionPointApi)
  adminConsumptionPointApiStub.adminGetConsumptionPointById
    .withArgs(consumptionPointStub.id)
    .returns(ajaxSuccess(consumptionPointStub))
  adminConsumptionPointApiStub.adminGetParticipationsByConsumptionPointId.withArgs(consumptionPointStub.id).returns(
    ajaxSuccess({
      elements: [
        {
          id: participantStub.id,
          moveInDate: "",
          moveOutDate: "",
          bills: [],
          consumptionPointId: consumptionPointStub.id,
        },
      ],
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminConsumptionPointApi: adminConsumptionPointApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = getConsumptionPointsWithParticipations([consumptionPointStub.id], depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual([
    {
      value: consumptionPointStub,
      participations: {
        elements: [
          {
            id: participantStub.id,
            moveInDate: "",
            moveOutDate: "",
            bills: [],
            consumptionPointId: consumptionPointStub.id,
          },
        ],
      },
    },
  ])
})

test("Get building by Id", async () => {
  // given
  const adminBuildingApiStub = sinon.createStubInstance(AdminBuildingApi)
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  const adminConsumptionPointApiStub = sinon.createStubInstance(AdminConsumptionPointApi)
  adminBuildingApiStub.adminGetBuildingById.withArgs(buildingStub.id).returns(ajaxSuccess(buildingStub))
  adminZevApiStub.adminGetZevById.withArgs(zevStub.id).returns(ajaxSuccess(zevStub))
  adminZevApiStub.adminGetZevParticipants.withArgs(zevStub.id).returns(
    ajaxSuccess({
      elements: [participantStub],
    }),
  )
  adminConsumptionPointApiStub.adminGetConsumptionPointById
    .withArgs(consumptionPointStub.id)
    .returns(ajaxSuccess(consumptionPointStub))
  adminConsumptionPointApiStub.adminGetParticipationsByConsumptionPointId.withArgs(consumptionPointStub.id).returns(
    ajaxSuccess({
      elements: [
        {
          id: participantStub.id,
          moveInDate: "",
          moveOutDate: "",
          bills: [],
          consumptionPointId: consumptionPointStub.id,
        },
      ],
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminBuildingApi: adminBuildingApiStub,
    adminZevApi: adminZevApiStub,
    adminConsumptionPointApi: adminConsumptionPointApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = getBuildingById(zevStub.id, buildingStub.id, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: {
      id: buildingStub.id,
      name: buildingStub.name ?? "",
      statusType: StatusType[buildingStub.currentState],
      addressStreet: `${buildingStub.address.street} ${buildingStub.address.houseNumber}`,
      addressCity: `${buildingStub.address.postalCode} ${buildingStub.address.city}`,
      zevId: zevStub.id,
      zevName: zevStub.name,
      consumptionPoints: [
        {
          id: consumptionPointStub.id,
          statusType: StatusType[consumptionPointStub.currentState],
          name: consumptionPointStub.name,
          type: consumptionPointStub.type ?? "",
          powerMeterType: consumptionPointStub.meterType,
          subscriberName: "",
        },
      ],
    },
  })
})

test("get Buildings ByZevId", async () => {
  // given
  const adminBuildingApiStub = sinon.createStubInstance(AdminBuildingApi)
  adminBuildingApiStub.adminGetBuildings.withArgs(1, 10000, undefined).returns(
    ajaxSuccess({
      elements: [buildingStub],
      page: pageStub,
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminBuildingApi: adminBuildingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = getBuildingsByZevId(zevStub.id, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: {
      buildings: [
        {
          id: buildingStub.id,
          statusType: StatusType[buildingStub.currentState],
          buildingObject: buildingStub.name ?? "",
          street: `${buildingStub.address.street} ${buildingStub.address.houseNumber}`,
          city: `${buildingStub.address.postalCode} ${buildingStub.address.city}`,
        },
      ],
    },
  })
})

test("Create Building", async () => {
  // given
  const adminBuildingApiStub = sinon.createStubInstance(AdminBuildingApi)
  adminBuildingApiStub.adminCreateBuildingForZev
    .withArgs(zevStub.id, {
      name: buildingUpsert.buildingObject,
      address: {
        street: buildingUpsert.addressStreet,
        houseNumber: buildingUpsert.addressHouseNumber,
        postalCode: buildingUpsert.addressPostCode,
        city: buildingUpsert.addressCity,
      },
    })
    .returns(ajaxSuccess("building-create"))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminBuildingApi: adminBuildingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = createBuilding(zevStub.id, buildingUpsert, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: "building-create",
  })
})

test("Update Building", async () => {
  // given
  const adminBuildingApiStub = sinon.createStubInstance(AdminBuildingApi)
  adminBuildingApiStub.adminUpdateBuildingById
    .withArgs(buildingStub.id, {
      name: buildingUpsert.buildingObject,
      address: {
        street: buildingUpsert.addressStreet,
        houseNumber: buildingUpsert.addressHouseNumber,
        postalCode: buildingUpsert.addressPostCode,
        city: buildingUpsert.addressCity,
      },
    })
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminBuildingApi: adminBuildingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = updateBuilding(buildingStub.id, buildingUpsert, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})

test("Get Building Update By Id", async () => {
  // given
  const adminBuildingApiStub = sinon.createStubInstance(AdminBuildingApi)
  adminBuildingApiStub.adminGetBuildingById.withArgs(buildingStub.id).returns(ajaxSuccess(buildingStub))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminBuildingApi: adminBuildingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = getBuildingUpdateById(buildingStub.id, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: {
      statusType: StatusType[buildingStub.currentState],
      buildingObject: buildingStub.name ?? "",
      addressStreet: buildingStub.address.street,
      addressHouseNumber: buildingStub.address.houseNumber,
      addressPostCode: buildingStub.address.postalCode,
      addressCity: buildingStub.address.city,
    },
  })
})

test("Deactivate Building", async () => {
  // given
  const adminBuildingApiStub = sinon.createStubInstance(AdminBuildingApi)
  adminBuildingApiStub.adminDeactivateBuildingById.withArgs(buildingStub.id, "").resolves()
  adminBuildingApiStub.adminDeactivateBuildingById
    .withArgs(
      buildingStub.id,
      format(1577941199, "yyyy-MM-dd", {
        locale: localeDateDE,
      }),
    )
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminBuildingApi: adminBuildingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result1 = deactivateBuilding(buildingStub.id, -1, depsStub)
  const result2 = deactivateBuilding(buildingStub.id, 1577941199, depsStub)

  await expect(lastValueFrom(result1)).resolves.toEqual({
    type: "ok",
    result: true,
  })
  await expect(lastValueFrom(result2)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})

test("Delete Building", async () => {
  // given
  const adminBuildingApiStub = sinon.createStubInstance(AdminBuildingApi)
  adminBuildingApiStub.adminDeleteBuilding.withArgs(buildingStub.id).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminBuildingApi: adminBuildingApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = deleteBuilding(buildingStub.id, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})
