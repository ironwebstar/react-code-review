import { testDomainDependencies } from "../Domain.TestUtils"
import { StatusType } from "../Domain.Model"

import {
  mapBuildingListItem,
  buildingsListMapper,
  buildingDetailMapper,
  subscriberNameMapper,
  buildingsZevListMapper,
} from "./Buildings.Mapper"
import { testConfig, pageStub, buildingStub, zevStub, participantStub, consumptionPointStub } from "./Buildings.Stub"

const domainDependencies = testDomainDependencies()
const depsStub = {
  ...domainDependencies,
  config: testConfig,
}

test("mapBuildingListItem", async () => {
  const result = mapBuildingListItem(buildingStub, [zevStub])

  expect(result).toEqual({
    id: buildingStub.id,
    statusType: StatusType[buildingStub.currentState],
    buildingObject: buildingStub.name ?? "",
    address:
      `${buildingStub.address.street} ${buildingStub.address.houseNumber} ` +
      `${buildingStub.address.postalCode} ${buildingStub.address.city}`,
    zevId: zevStub?.id ?? "",
    zevName: zevStub?.name ?? "",
  })
})

test("buildingsListMapper", async () => {
  const result = buildingsListMapper(
    { elements: [buildingStub], page: pageStub },
    { elements: [zevStub], page: pageStub },
  )

  expect(result).toEqual({
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
  })
})

test("buildingDetailMapper", async () => {
  const result = buildingDetailMapper(
    buildingStub,
    zevStub,
    { elements: [participantStub] },
    [
      {
        value: consumptionPointStub,
        participations: {
          elements: [
            {
              id: participantStub.id,
              moveInDate: "",
              moveOutDate: "",
              participantId: "",
              bills: [],
              consumptionPointId: "",
            },
          ],
        },
      },
    ],
    depsStub,
  )

  expect(result).toEqual({
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
  })
})

test("subscriberNameMapper", async () => {
  const result1 = subscriberNameMapper(
    {
      elements: [
        {
          id: "id",
          moveInDate: "",
          moveOutDate: "",
          participantId: participantStub.id,
          bills: [],
          consumptionPointId: "",
        },
      ],
    },
    { elements: [participantStub] },
    depsStub,
  )
  const result2 = subscriberNameMapper(
    {
      elements: [
        {
          id: "id",
          moveInDate: "",
          moveOutDate: "",
          participantId: "another-id",
          bills: [],
          consumptionPointId: "",
        },
      ],
    },
    { elements: [participantStub] },
    depsStub,
  )

  expect(result1).toEqual("Herr First Name 1477 Last Name 1477")
  expect(result2).toEqual("")
})

test("buildingsZevListMapper", async () => {
  const result = buildingsZevListMapper({ elements: [buildingStub], page: pageStub }, zevStub.id)

  expect(result).toEqual({
    buildings: [
      {
        id: buildingStub.id,
        statusType: StatusType[buildingStub.currentState],
        buildingObject: buildingStub.name ?? "",
        street: `${buildingStub.address.street} ${buildingStub.address.houseNumber}`,
        city: `${buildingStub.address.postalCode} ${buildingStub.address.city}`,
      },
    ],
  })
})
