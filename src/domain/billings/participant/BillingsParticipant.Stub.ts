import localeDateDE from "date-fns/locale/de"
import { Map } from "immutable"
import {
  ZevAllParticipantsBilling,
  AllParticipantsBillingState,
  Page,
  Municipality,
  TutorialStatus,
  ZevAdminResponse,
  ZevBillingFrequency,
  ZevState,
  EnergyType,
  PowerMeterParameters,
  ConsumptionPointAdminResponse,
  ConsumptionPointState,
  ConsumptionPointType,
  PowerMeterType,
  ParticipantGpType,
  ParticipantPersonalDataSalutationEnum,
  ParticipantResponse,
  BuildingAdminResponse,
  BuildingState,
  AllParticipantBillingDetailsAdminResponse,
  OtherType,
  SummaryType,
  PaymentStatus,
  AccountingStatus,
  ZevIndividualParticipantBilling,
  IndividualParticipantBillingState,
  IndividualParticipantBillingDetailsAdminResponse,
} from "../../../data/generated-sources/openapi"
import { DomainConfig } from "../../Domain.Dependencies"
import { PriceMeasurementType, PricePackageUpsert, PricePackageItem } from "../../prices/Prices.Model"

export const testConfig: DomainConfig = {
  baseUrl: "adminportal.ckw.noumenadigital.com",
  appName: "ckw-adminportal",
  locale: localeDateDE,
}

export const pageStub: Page = {
  limit: 10,
  currentPage: 1,
  totalElements: 10,
  totalPages: 1,
}

export const allParticipantBillingStub: ZevAllParticipantsBilling = {
  id: "all-participant-billing-1",
  startDate: "2021-07-01",
  endDate: "2021-12-31",
  currentState: AllParticipantsBillingState.IN_PROGRESS,
  powerMeterParameters: [
    {
      meteringCode: "CH1003601234500000000000005107747",
      from: "2021-07-01",
      to: "2021-12-31",
      isDataAvailable: true,
      consumptionData: [
        {
          energyType: EnergyType.SOLAR,
          consumption: "4564.07",
        },
        {
          energyType: EnergyType.HIGH_TARIFF,
          consumption: "1479.16",
        },
        {
          energyType: EnergyType.LOW_TARIFF,
          consumption: "1178.44",
        },
      ],
      consumptionPointId: "consumption-point-1",
      participationId: "participant-1",
    },
  ],
  bills: ["bill-1"],
  zevId: "zev-1",
  pricePackages: [
    {
      id: 0,
      name: "Standard Preise",
      order: 0,
      prices: {
        solarPrice: "0.1356",
        highTariffPrice: "0.1968",
        lowTariffPrice: "0.1752",
        additionalServicesPrice: "5.00",
        isFixedRate: true,
      },
    },
  ],
  isConfirmedByZevManager: false,
  totalSum: "1728.15",
}

export const individualParticipantBillingStub: ZevIndividualParticipantBilling = {
  id: "6cdd3a4b-5e5a-408d-b2c6-36d1f3724ce5",
  startDate: "2021-07-01",
  endDate: "2021-09-01",
  currentState: IndividualParticipantBillingState.IN_PROGRESS_REOPENED,
  consumptionPointId: "3c4ce7be-51bd-4bad-993c-f251022e0a00",
  powerMeterParameters: {
    meteringCode: "CH1003601234500000000000005215134",
    from: "2021-07-01",
    to: "2021-09-01",
    isDataAvailable: true,
    consumptionData: [
      {
        energyType: EnergyType.SOLAR,
        consumption: "239.68",
      },
      {
        energyType: EnergyType.HIGH_TARIFF,
        consumption: "61.50",
      },
      {
        energyType: EnergyType.LOW_TARIFF,
        consumption: "170.17",
      },
    ],
    consumptionPointId: "consumption-point-1",
    participationId: "participant-1",
  },
  prices: {
    solarPrice: "0.1235",
    highTariffPrice: "0.1962",
    lowTariffPrice: "0.1753",
    additionalServicesPrice: "0.0132",
    isFixedRate: false,
    spikePrice: "0.0123",
  },
  isConfirmedByZevManager: false,
  finalAmountDue: "77.70",
  bill: "bill-1",
  billingDate: "2022-01-04",
}

export const individualParticipantBillingDetailsStub: IndividualParticipantBillingDetailsAdminResponse = {
  id: "individual-participant-billing-1",
  billingStartDate: "2021-07-01",
  billingEndDate: "2021-09-01",
  billingStatus: IndividualParticipantBillingState.IN_PROGRESS_REOPENED,
  totalEnergyProduction: "2079.3520",
  totalEnergyHighTariff: "565.4400",
  totalEnergyLowTariff: "1012.0200",
  totalConsumption: "471.0000",
  totalCosts: "77.70",
  powerMeterParameters: {
    meteringCode: "CH1003601234500000000000005215134",
    from: "2021-07-01",
    to: "2021-09-01",
    isDataAvailable: true,
    consumptionData: [
      {
        energyType: EnergyType.SOLAR,
        consumption: "239.68",
      },
      {
        energyType: EnergyType.HIGH_TARIFF,
        consumption: "61.50",
      },
      {
        energyType: EnergyType.LOW_TARIFF,
        consumption: "170.17",
      },
    ],
    consumptionPointId: "consumption-point-1",
    participationId: "participant-1",
  },
  prices: {
    solarPrice: "0.1235",
    highTariffPrice: "0.1962",
    lowTariffPrice: "0.1753",
    additionalServicesPrice: "0.0132",
    isFixedRate: false,
    spikePrice: "0.0123",
  },
  isConfirmedByZevManager: false,
  billingDate: "2022-01-04",
  bill: {
    id: "bill-1",
    from: "2021-07-01",
    to: "2021-09-01",
    billNumber: "100004779",
    consumptionPointId: "3c4ce7be-51bd-4bad-993c-f251022e0a00",
    billingCalculations: {
      calculatedOn: "2022-01-23",
      shareInSolar: "0.5096",
      energyPositions: [
        {
          energyType: EnergyType.SOLAR,
          consumption: "240.0000",
          price: "0.1235",
          amountDue: "29.64",
        },
        {
          energyType: EnergyType.HIGH_TARIFF,
          consumption: "61.0000",
          price: "0.1962",
          amountDue: "11.97",
        },
        {
          energyType: EnergyType.LOW_TARIFF,
          consumption: "170.0000",
          price: "0.1753",
          amountDue: "29.80",
        },
      ],
      otherPositions: [
        {
          otherType: OtherType.SERVICES,
          consumption: "471.0000",
          price: "0.0132",
          amountDue: "6.22",
        },
      ],
      summaryPositions: [
        {
          summaryType: SummaryType.TOTAL_ENERGY_CONSUMPTION,
          amountDue: "71.46",
          consumption: "471.0000",
        },
        {
          summaryType: SummaryType.TOTAL_ENERGY_CONSUMPTION_AND_SERVICES,
          amountDue: "77.68",
        },
        {
          summaryType: SummaryType.ROUNDING_DIFFERENCE,
          amountDue: "0.02",
        },
        {
          summaryType: SummaryType.FINAL_AMOUNT_DUE,
          amountDue: "77.70",
        },
      ],
    },
    energyConsumption: [
      {
        energyType: EnergyType.SOLAR,
        consumption: "239.68",
      },
      {
        energyType: EnergyType.HIGH_TARIFF,
        consumption: "61.50",
      },
      {
        energyType: EnergyType.LOW_TARIFF,
        consumption: "170.17",
      },
    ],
    paymentStatus: PaymentStatus.UNPAID,
    accountingStatus: AccountingStatus.UNAVAILABLE,
    billPersonalData: {
      salutation: ParticipantPersonalDataSalutationEnum.COMPANY,
      firstName: "First Name 362",
      lastName: "Last Name 362",
      title: "",
      firstNameSecondPerson: "Second First Name 362",
      lastNameSecondPerson: "Second Last Name 362",
    },
  },
}

export const zevStub: ZevAdminResponse = {
  id: "zev-1",
  name: "Samuel Kirton",
  contact: {
    email: "samkirton@me.com",
    telephone: "+41762033341",
    mobile: "",
  },
  mainContactPerson: {
    name: "Sam",
    contact: {
      email: "",
      telephone: "",
      mobile: "",
    },
  },
  address: {
    street: "Seestrasse 91",
    houseNumber: "91",
    postalCode: "8002",
    city: "zürich",
    addressLineOne: "Seestrasse 91",
  },
  serviceStartDate: "2020-01-01",
  managers: ["profile-id"],
  buildings: [],
  currentState: ZevState.ACTIVE,
  participants: [],
  incomingMeteringCode: "342234234234234444444444444444444",
  outgoingMeteringCode: "342234234234234444444444444444444",
  paymentInformation: {
    payee: "Samuel Kirton",
    accountNumber: "rewrwerwewrrw",
    iban: "CH93 0076 2011 6238 5295 7",
    payeeAddress: {
      street: "Seestrasse 91",
      houseNumber: "Seestrasse 91",
      postalCode: "8002",
      city: "Zürich",
    },
  },
  nextBillingDate: "2022-06-30",
  billingFrequency: ZevBillingFrequency.BIANNUAL,
  paymentDeadlineInDays: 30,
  tutorialStatus: TutorialStatus.OPEN,
  zevStartDate: "2020-01-01",
  allParticipantsBillingsHistory: [],
  recurringServiceBillings: [],
  externalReferenceNumber: "231231231231233213",
  municipality: Municipality.DIERIKON,
  contracts: [],
  pricePackages: [
    {
      id: 0,
      name: "Standard Preise",
      order: 0,
    },
  ],
  vatNumber: "",
}

export const powerMeterParametersStub: PowerMeterParameters = {
  meteringCode: "CH100360123450000000000000508971033",
  from: "2021-07-01",
  to: "2021-12-31",
  isDataAvailable: true,
  participationId: "participant-1",
  consumptionData: [
    {
      energyType: EnergyType.SOLAR,
      consumption: "consumption",
    },
  ],
  consumptionPointId: "consumption-point-1",
}

export const consumptionPointStub: ConsumptionPointAdminResponse = {
  id: "consumption-point-1",
  name: "1.OG rechts3",
  buildingId: "building-1",
  currentState: ConsumptionPointState.ACTIVE,
  meterType: PowerMeterType.COMMERCIAL_POWERMETER_LARGE,
  meteringCode: "CH100360123450000000000000508971033",
  participations: ["participant-1"],
  pricePackageId: 0,
  type: ConsumptionPointType.BUSINESS,
  billableFrom: "2020-01-25",
}

export const participantStub: ParticipantResponse = {
  id: "participant-1",
  zevId: "zev-1",
  gpType: ParticipantGpType.PERSON,
  personalData: {
    salutation: ParticipantPersonalDataSalutationEnum.MR,
    firstName: "First Name 1477",
    lastName: "Last Name 1477",
    firstNameSecondPerson: "Second First Name 1477",
    lastNameSecondPerson: "Second Last Name 1477",
  },
  contactDetails: {
    email: "email@bluewin.ch",
    phone: "+41 41 000 00 00",
  },
  domicileAddress: {
    city: "Alberswil",
    postCode: "6020",
    houseNumber: "7",
    street: "Street",
    land: "Schweiz",
    co: "someone somewhere",
  },
  syncStatus: false,
}

export const buildingStub: BuildingAdminResponse = {
  id: "building-1",
  address: {
    street: "Garageweg",
    houseNumber: "67",
    postalCode: "6028",
    city: "Herlisberg",
  },
  zevId: "zev-1",
  consumptionPoints: ["consumption-point-1"],
  currentState: BuildingState.INACTIVE,
  name: "Autorep-Werkstatt mit Wohnung",
}

export const allParticipantBillingDetailsStub: AllParticipantBillingDetailsAdminResponse = {
  id: "all-participant-billing",
  billingStartDate: "2021-07-01",
  billingEndDate: "2021-12-31",
  billingStatus: AllParticipantsBillingState.IN_PROGRESS,
  totalEnergyProduction: "6680.7310",
  totalEnergyHighTariff: "2911.2150",
  totalEnergyLowTariff: "2172.6510",
  totalConsumption: "10383.0000",
  totalCosts: "1728.15",
  powerMeterParameters: [
    {
      meteringCode: "CH1003601234500000000000005107747",
      from: "2021-07-01",
      to: "2021-12-31",
      isDataAvailable: true,
      consumptionData: [
        {
          energyType: EnergyType.SOLAR,
          consumption: "4564.07",
        },
        {
          energyType: EnergyType.HIGH_TARIFF,
          consumption: "1479.16",
        },
        {
          energyType: EnergyType.LOW_TARIFF,
          consumption: "1178.44",
        },
      ],
      consumptionPointId: "consumption-point-1",
      participationId: "participant-1",
    },
  ],
  bills: [
    {
      id: "bill-1",
      from: "2021-07-01",
      to: "2021-12-31",
      billNumber: "100004777",
      consumptionPointId: "consumption-point-1",
      billingCalculations: {
        calculatedOn: "2022-01-23",
        shareInSolar: "0.3509",
        energyPositions: [
          {
            energyType: EnergyType.SOLAR,
            consumption: "678.0000",
            price: "0.1356",
            amountDue: "91.94",
          },
        ],
        otherPositions: [
          {
            otherType: OtherType.SERVICES_LUMP_SUM,
            consumption: "6.0000",
            price: "5.0000",
            amountDue: "30.00",
          },
        ],
        summaryPositions: [
          {
            summaryType: SummaryType.TOTAL_ENERGY_CONSUMPTION,
            amountDue: "329.40",
            consumption: "1932.0000",
          },
        ],
      },
      energyConsumption: [
        {
          energyType: EnergyType.SOLAR,
          consumption: "678.01",
        },
      ],
      paymentStatus: PaymentStatus.UNPAID,
      accountingStatus: AccountingStatus.UNAVAILABLE,
      billPersonalData: {
        salutation: ParticipantPersonalDataSalutationEnum.COMPANY,
        firstName: "First Name 1791",
        lastName: "Last Name 1791",
        firstNameSecondPerson: "Second First Name 1791",
        lastNameSecondPerson: "Second Last Name 1791",
      },
    },
  ],
  isConfirmedByZevManager: false,
  pricePackages: [
    {
      id: 0,
      name: "Standard Preise",
      order: 0,
      prices: {
        solarPrice: "0.1356",
        highTariffPrice: "0.1968",
        lowTariffPrice: "0.1752",
        additionalServicesPrice: "5.00",
        isFixedRate: true,
      },
    },
  ],
}

export const pricePackage = {
  id: 0,
  order: 0,
  priceTitle: "Standard Preise",
  additionalServicesPrice: "5.0000",
  containsSpikePrice: false,
  measurementType: PriceMeasurementType.FLAT_RATE,
  priceHighTariff: "0.1968",
  priceLowTariff: "0.1752",
  priceSolarPower: "0.1356",
  spikePrice: "",
}

export const pricePackagesUpsert: PricePackageUpsert = Map<number, PricePackageItem>([[pricePackage.id, pricePackage]])
