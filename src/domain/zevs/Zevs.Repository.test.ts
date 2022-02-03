import { lastValueFrom } from "rxjs"
import * as sinon from "sinon"
import { format, parseISO } from "date-fns"
import localeDateDE from "date-fns/locale/de"
import { AdminZevApi, AdminProfileApi, Municipality, ZevBillingFrequency } from "../../data/generated-sources/openapi"

import { StatusType } from "../Domain.Model"
import { ajaxSuccess, testDomainDependencies } from "../Domain.TestUtils"

import {
  getZevs,
  getZevById,
  getZevPrefillProfile,
  getZevUpdateById,
  createZev,
  updateZev,
  deleteZevById,
  activateZevById,
  deactivateZevById,
} from "./Zevs.Repository"
import { testConfig, zevMock, pageMock, profileMock, zevsUpsert } from "./Zevs.Stub"
import { PriceMeasurementType } from "../prices/Prices.Model"

const domainDependencies = testDomainDependencies()

test("Get Zevs", async () => {
  // given
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminZevApiStub.adminGetZevs.withArgs(1, 10000, undefined).returns(
    ajaxSuccess({
      elements: [zevMock],
      page: pageMock,
    }),
  )

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()

  // when
  const result = getZevs({
    ...domainDependencies,
    adminZevApi: adminZevApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  })

  const { address } = zevMock

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: {
      page: pageMock,
      zevs: [
        {
          id: zevMock.id,
          name: zevMock.name,
          statusType: StatusType[zevMock.currentState],
          address: `${address.street} ${address.houseNumber} ${address.postalCode} ${address.city}`,
        },
      ],
    },
  })
})

test("Get Zev By Id", async () => {
  // given
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminZevApiStub.adminGetZevById.withArgs(zevMock.id).returns(ajaxSuccess(zevMock))
  adminZevApiStub.adminGetServiceBillingsZevById.withArgs(zevMock.id).returns(ajaxSuccess({ elements: [] }))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminZevApi: adminZevApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = getZevById(zevMock.id, depsStub)
  const pricePackageResult = {
    id: 0,
    order: 0,
    additionalServicesPrice: "?",
    containsSpikePrice: false,
    measurementType: "CONSUMPTION_DEPENDANT",
    priceHighTariff: "?",
    priceLowTariff: "?",
    priceSolarPower: "?",
    priceTitle: "Standard Preise",
    spikePrice: "",
  }

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: {
      id: zevMock.id,
      name: zevMock.name,
      statusType: StatusType[zevMock.currentState],
      serviceStartDate: "01. Jan 2020",
      serviceEndDate: zevMock.serviceEndDate ? "" : undefined,
      nextBillingDate: "30. Jun 2022",
      billingFrequency: zevMock.billingFrequency,
      nextBillingFrequency: zevMock.nextBillingFrequency?.toString(),
      zevStartDate: "01. Jan 2020",
      externalReferenceNumber: zevMock.externalReferenceNumber,
      incomingMeteringCode: zevMock.incomingMeteringCode,
      outgoingMeteringCode: zevMock.outgoingMeteringCode,
      contactTelephoneNumber: zevMock.contact.telephone,
      contactMobileNumber: zevMock.contact.mobile,
      contactEmail: zevMock.contact.email,
      addressLineOne: zevMock.address.addressLineOne,
      addressLineTwo: zevMock.address.addressLineTwo,
      addressStreet: zevMock.address.street,
      addressHouseNumber: zevMock.address.houseNumber,
      addressPostalCode: zevMock.address.postalCode,
      addressCity: zevMock.address.city,
      municipality: zevMock.municipality,
      mainContactName: zevMock.mainContactPerson.name,
      mainContactTelephoneNumber: zevMock.mainContactPerson.contact.telephone,
      mainContactMobileNumber: zevMock.mainContactPerson.contact.mobile,
      mainContactEmail: zevMock.mainContactPerson.contact.email,
      paymentInformationPayee: zevMock.paymentInformation.payee,
      paymentInformationAccountNumber: zevMock.paymentInformation.accountNumber,
      paymentInformationIban: zevMock.paymentInformation.iban,
      paymentInformationVatNumber: zevMock.vatNumber,
      paymentInformationAddressStreet: zevMock.paymentInformation.payeeAddress.street,
      paymentInformationAddressHouseNumber: zevMock.paymentInformation.payeeAddress.houseNumber,
      paymentInformationAddressPostalCode: zevMock.paymentInformation.payeeAddress.postalCode,
      paymentInformationAddressCity: zevMock.paymentInformation.payeeAddress.city,
      managers: zevMock.managers,
      pricePackages: zevMock.pricePackages ? [pricePackageResult] : [],
      readyForInitialInvoice: false,
      readyForInitialContract: true,
      zevStartDateValue: parseISO(zevMock.zevStartDate).getTime(),
    },
  })
})

test("Get Zev prefill profile", async () => {
  // given
  const adminProfileApiStub = sinon.createStubInstance(AdminProfileApi)
  adminProfileApiStub.getAdminProfileById.withArgs(profileMock.id).returns(ajaxSuccess(profileMock))

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
  const result = getZevPrefillProfile(profileMock.id, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: {
      mainContactName: "Herr 234234 234234",
      contactEmail: profileMock.contact.email ?? "",
      contactMobileNumber: profileMock.contact.mobile ?? "",
      contactTelephoneNumber: profileMock.contact.telephone ?? "",
      addressStreet: profileMock.address.street,
      addressHouseNumber: profileMock.address.houseNumber,
      addressPostalCode: profileMock.address.postalCode,
      addressCity: profileMock.address.city,
    },
  })
})

test("Get Zev Update by Id", async () => {
  // given
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminZevApiStub.adminGetZevById.withArgs(zevMock.id).returns(ajaxSuccess(zevMock))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminZevApi: adminZevApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = getZevUpdateById(zevMock.id, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: zevsUpsert,
  })
})

test("Create Zev by Id", async () => {
  // given
  const zevCreate = {
    name: zevsUpsert.name,
    contact: {
      email: zevsUpsert.contactEmail,
      telephone: zevsUpsert.contactTelephoneNumber,
      mobile: zevsUpsert.contactMobileNumber,
    },
    mainContactPerson: {
      name: zevsUpsert.mainContactName,
      contact: {
        email: zevsUpsert.mainContactEmail,
        telephone: zevsUpsert.mainContactTelephoneNumber,
        mobile: zevsUpsert.mainContactMobileNumber,
      },
    },
    address: {
      addressLineOne: zevsUpsert.addressLineOne,
      street: zevsUpsert.addressStreet,
      houseNumber: zevsUpsert.addressHouseNumber,
      postalCode: zevsUpsert.addressPostalCode,
      city: zevsUpsert.addressCity,
    },
    serviceStartDate: "2020-01-01",
    managers: zevsUpsert.managers,
    incomingMeteringCode: zevsUpsert.incomingMeteringCode,
    outgoingMeteringCode: zevsUpsert.outgoingMeteringCode,
    paymentInformation: {
      payee: zevsUpsert.paymentInformationPayee,
      accountNumber: zevsUpsert.paymentInformationAccountNumber,
      iban: zevsUpsert.paymentInformationIban,
      payeeAddress: {
        street: zevsUpsert.paymentInformationAddressStreet,
        houseNumber: zevsUpsert.paymentInformationAddressHouseNumber,
        postalCode: zevsUpsert.paymentInformationAddressPostalCode,
        city: zevsUpsert.paymentInformationAddressCity,
      },
    },
    externalReferenceNumber: zevsUpsert.externalReferenceNumber,
    billingFrequency: ZevBillingFrequency[zevsUpsert.billingFrequency as keyof typeof ZevBillingFrequency],
    vatNumber: zevsUpsert.paymentInformationVatNumber,
    municipality: Municipality[zevsUpsert.municipality as keyof typeof Municipality],
  }
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminZevApiStub.adminCreateZev.withArgs(zevCreate).returns(ajaxSuccess("create-url"))

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminZevApi: adminZevApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = createZev(zevsUpsert, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: "create-url",
  })
})

test("Update Zev", async () => {
  // given
  const zevUpdate = {
    name: zevsUpsert.name,
    contact: {
      email: zevsUpsert.contactEmail,
      telephone: zevsUpsert.contactTelephoneNumber,
      mobile: zevsUpsert.contactMobileNumber,
    },
    mainContactPerson: {
      name: zevsUpsert.mainContactName,
      contact: {
        email: zevsUpsert.mainContactEmail,
        telephone: zevsUpsert.mainContactTelephoneNumber,
        mobile: zevsUpsert.mainContactMobileNumber,
      },
    },
    address: {
      addressLineOne: zevsUpsert.addressLineOne,
      street: zevsUpsert.addressStreet,
      houseNumber: zevsUpsert.addressHouseNumber,
      postalCode: zevsUpsert.addressPostalCode,
      city: zevsUpsert.addressCity,
    },
    serviceStartDate: "2020-01-01",
    managers: zevsUpsert.managers,
    incomingMeteringCode: zevsUpsert.incomingMeteringCode,
    outgoingMeteringCode: zevsUpsert.outgoingMeteringCode,
    paymentInformation: {
      payee: zevsUpsert.paymentInformationPayee,
      accountNumber: zevsUpsert.paymentInformationAccountNumber,
      iban: zevsUpsert.paymentInformationIban,
      payeeAddress: {
        street: zevsUpsert.paymentInformationAddressStreet,
        houseNumber: zevsUpsert.paymentInformationAddressHouseNumber,
        postalCode: zevsUpsert.paymentInformationAddressPostalCode,
        city: zevsUpsert.paymentInformationAddressCity,
      },
    },
    externalReferenceNumber: zevsUpsert.externalReferenceNumber,
    vatNumber: zevsUpsert.paymentInformationVatNumber,
    municipality: Municipality[zevsUpsert.municipality as keyof typeof Municipality],
    nextBillingFrequency: ZevBillingFrequency[zevsUpsert.nextBillingFrequency as keyof typeof ZevBillingFrequency],
    nextBillingDate: "2022-06-30",
    zevStartDate: "2020-01-01",
    pricePackages: Array.from(zevsUpsert.pricePackages.values()).map((pricePackage) => ({
      id: pricePackage.id,
      name: pricePackage.priceTitle,
      order: pricePackage.id,
      prices: {
        solarPrice: pricePackage.priceSolarPower,
        highTariffPrice: pricePackage.priceHighTariff,
        lowTariffPrice: pricePackage.priceLowTariff,
        additionalServicesPrice: pricePackage.additionalServicesPrice,
        isFixedRate: pricePackage.measurementType === PriceMeasurementType.FLAT_RATE,
        spikePrice: pricePackage.containsSpikePrice ? pricePackage.spikePrice : undefined,
      },
    })),
    paymentDeadlineInDays: 30,
  }
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminZevApiStub.adminUpdateZevById.withArgs(zevMock.id, zevUpdate).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminZevApi: adminZevApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }
  // when
  const result = updateZev(zevMock.id, zevsUpsert, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})

test("Delete Zev by Id", async () => {
  // given
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminZevApiStub.adminDeleteZevById.withArgs(zevMock.id).resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminZevApi: adminZevApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: testConfig,
  }

  // when
  const result = deleteZevById(zevMock.id, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})

test("Activate Zev", async () => {
  // given
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminZevApiStub.adminActivateZevById
    .withArgs(
      zevMock.id,
      format(1577826000000, "yyyy-MM-dd", {
        locale: localeDateDE,
      }),
    )
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminZevApi: adminZevApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = activateZevById(zevMock.id, 1577826000000, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})

test("Deactivate Zev", async () => {
  // given
  const adminZevApiStub = sinon.createStubInstance(AdminZevApi)
  adminZevApiStub.adminDeactivateZevById
    .withArgs(
      zevMock.id,
      format(1577826000000, "yyyy-MM-dd", {
        locale: localeDateDE,
      }),
    )
    .resolves()

  const createCookieBearerToken = sinon.spy()
  const createCookieRefreshToken = sinon.spy()
  const depsStub = {
    ...domainDependencies,
    adminZevApi: adminZevApiStub,
    cookie: {
      ...domainDependencies.cookie,
      createCookieBearerToken: createCookieBearerToken,
      createCookieRefreshToken: createCookieRefreshToken,
    },
    config: { ...testConfig, locale: localeDateDE },
  }

  // when
  const result = deactivateZevById(zevMock.id, 1577826000000, depsStub)

  await expect(lastValueFrom(result)).resolves.toEqual({
    type: "ok",
    result: true,
  })
})
