import { DomainConfig } from "../Domain.Dependencies"
import {
  AllParticipantsBillingState,
  EnergyType,
  Page,
  ZevAllParticipantsBilling,
} from "../../data/generated-sources/openapi"

export const testConfig: DomainConfig = {
  baseUrl: "adminportal.ckw.noumenadigital.com",
  appName: "ckw-adminportal",
  locale: {
    code: "de",
  },
}

export const pageStub: Page = {
  limit: 10,
  currentPage: 1,
  totalElements: 10,
  totalPages: 1,
}

export function zevAllParticipantsBillingStatusStub(status: AllParticipantsBillingState): ZevAllParticipantsBilling {
  return {
    id: "da706f6e-9ee4-4f8a-a450-b9039c59a982",
    startDate: "2021-07-01",
    endDate: "2021-12-31",
    currentState: status,
    powerMeterParameters: [
      {
        meteringCode: "CH1003601234500000000000005215134",
        from: "2021-09-02",
        to: "2021-12-31",
        isDataAvailable: true,
        consumptionData: [
          {
            energyType: EnergyType.SOLAR,
            consumption: "266.88",
          },
          {
            energyType: EnergyType.HIGH_TARIFF,
            consumption: "356.56",
          },
          {
            energyType: EnergyType.LOW_TARIFF,
            consumption: "331.87",
          },
        ],
        consumptionPointId: "3c4ce7be-51bd-4bad-993c-f251022e0a00",
        participationId: "ba5ece90-437a-4008-982e-b84688785e0c",
      },
      {
        meteringCode: "CH1003601234500000000000005215135",
        from: "2021-07-01",
        to: "2021-12-31",
        isDataAvailable: true,
        consumptionData: [
          {
            energyType: EnergyType.SOLAR,
            consumption: "415.04",
          },
          {
            energyType: EnergyType.HIGH_TARIFF,
            consumption: "175.46",
          },
        ],
        consumptionPointId: "33a9139c-edfa-4e48-8d6b-1618ee991e8e",
        participationId: "d899fb6c-b1bc-4a66-ae88-7eaeec64739c",
      },
    ],
    bills: [
      "191f8915-c1e7-4366-ac9b-6d499560b4c2",
      "17ed03c5-9d15-4cf9-8f26-4c046934265c",
      "0367994c-7896-48e5-b36b-b4a0b9740135",
      "e87baf27-89ec-4422-9274-1153c4ec95f1",
      "dabb1a78-b479-43ee-ae24-38646f449f3a",
      "a9bb8017-c789-450e-866d-309c32856263",
      "1fea2a51-9d72-46a8-b860-37b13e828075",
      "29dea041-6508-4b44-b22c-1a70c00c60bc",
      "67568817-d08f-4df1-8e52-3112a1d155b7",
      "ae50a796-1490-4d1c-919a-253dd3b04c38",
      "3a565caf-04cd-467c-a5f6-16a90c8cdbdd",
      "1ca9a82f-963f-404a-91ce-12348b647ca2",
      "d3aefb89-5aa3-441c-8d93-afc7b7ec3fa9",
      "8ffd8950-6711-4cfa-8006-905064e9a929",
      "2f3ede56-55f7-43c3-8bce-55108fd71ead",
    ],
    zevId: "8de9a3f3-8635-4282-aa3e-39c00052b370",
    pricePackages: [
      {
        id: 0,
        name: "Standard Preise",
        order: 0,
        prices: {
          solarPrice: "0.1356",
          highTariffPrice: "0.1968",
          lowTariffPrice: "0.1752",
          additionalServicesPrice: "0.0000",
          isFixedRate: false,
        },
      },
      {
        id: 2,
        name: "Preise 3",
        order: 2,
        prices: {
          solarPrice: "4.0000",
          highTariffPrice: "5.0000",
          lowTariffPrice: "6.0000",
          additionalServicesPrice: "0.00",
          isFixedRate: true,
        },
      },
    ],
    isConfirmedByZevManager: true,
    totalSum: "4533.20",
    billingDate: "2022-01-13",
  }
}
