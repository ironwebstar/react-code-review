import { forkJoin, from, Observable, of } from "rxjs"
import { catchError, map, mergeMap } from "rxjs/operators"
import { apiCall, apiHeaders } from "../Domain.Calls"
import { createOkResponse, DomainResponse } from "../Domain.Response"
import { DomainDependencies } from "../Domain.Dependencies"
import { ZevsList } from "./ZevsList.Model"
import { ZevsUpsert } from "./ZevsUpsert.Model"
import { Municipality, ServiceBillingAdminResponse, ZevBillingFrequency } from "../../data/generated-sources/openapi"
import { ZevDetail, ZevDetailBillingsList, ZevPrefillProfile } from "./ZevsDetail.Model"
import { timestampToApiFormattedDate } from "../Domain.Formatters"
import {
  emptyZevPrefillProfile,
  zevDetailInitialBillingsListMapper,
  zevDetailRecurringBillingsListMapper,
  zevsDetailMapper,
  zevsDetailProfilePrefillMapper,
} from "./ZevsDetail.Mapper"
import { zevsUpdateMapper } from "./ZevsUpsert.Mapper"
import { StatusType } from "../Domain.Model"
import { setPricesUpsertMapper } from "../prices/Prices.Mapper"

export const getZevs = (deps: DomainDependencies): Observable<DomainResponse<ZevsList>> =>
  apiCall(
    from(deps.adminZevApi.adminGetZevs(1, 10000, undefined, apiHeaders(deps))).pipe(
      map((zevResponse) => ({
        zevs: zevResponse.data.elements.map((zev) => ({
          id: zev.id,
          name: zev.name,
          statusType: StatusType[zev.currentState],
          address: `${zev.address.street} ${zev.address.houseNumber} ${zev.address.postalCode} ${zev.address.city}`,
        })),
        page: zevResponse.data.page,
      })),
    ),
  )

export const getZevById = (zevId: string, deps: DomainDependencies): Observable<DomainResponse<ZevDetail>> => {
  return apiCall(
    from(deps.adminZevApi.adminGetZevById(zevId, apiHeaders(deps))).pipe(
      mergeMap((zevResponse) =>
        getContractsForZev(zevResponse.data.contracts, deps).pipe(
          mergeMap((contractsResponse) =>
            getInitialServiceBilling(zevResponse.data.id, zevResponse.data.initialServiceBillingId, deps).pipe(
              map((serviceBilling) => zevsDetailMapper(zevResponse.data, contractsResponse, serviceBilling, deps)),
            ),
          ),
        ),
      ),
    ),
  )
}

const getInitialServiceBilling = (
  zevId: string,
  initialServiceBillingId: string | undefined,
  deps: DomainDependencies,
): Observable<ServiceBillingAdminResponse | undefined> => {
  return from(deps.adminZevApi.adminGetServiceBillingsZevById(zevId, apiHeaders(deps))).pipe(
    map((serviceBilling) =>
      serviceBilling.data.elements.find((serviceBilling) => serviceBilling.id === initialServiceBillingId),
    ),
    catchError(() => of(undefined)),
  )
}

const getContractsForZev = (contractsId: string[] | undefined, deps: DomainDependencies) => {
  if (!contractsId || contractsId.length === 0) return of([])
  return forkJoin(
    contractsId.map((contractId) =>
      from(deps.adminContractsApi.adminGetContractById(contractId, apiHeaders(deps))).pipe(
        map((contractResponse) => contractResponse.data),
      ),
    ),
  )
}

export const getZevPrefillProfile = (
  profileId: string | undefined,
  deps: DomainDependencies,
): Observable<DomainResponse<ZevPrefillProfile>> => {
  if (!profileId) return of(createOkResponse(emptyZevPrefillProfile))
  return apiCall(
    from(deps.adminProfileApi.getAdminProfileById(profileId, apiHeaders(deps))).pipe(
      map((profileResponse) => zevsDetailProfilePrefillMapper(profileResponse.data, deps)),
    ),
  )
}

export const getZevUpdateById = (zevId: string, deps: DomainDependencies): Observable<DomainResponse<ZevsUpsert>> =>
  apiCall(
    from(deps.adminZevApi.adminGetZevById(zevId, apiHeaders(deps))).pipe(
      map((zevResponse) => zevsUpdateMapper(zevResponse.data)),
    ),
  )

export const createZev = (zevsUpsert: ZevsUpsert, deps: DomainDependencies): Observable<DomainResponse<string>> =>
  apiCall(
    from(
      deps.adminZevApi.adminCreateZev(
        {
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
          serviceStartDate: timestampToApiFormattedDate(zevsUpsert.serviceStartDate, deps),
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
        },
        apiHeaders(deps),
      ),
    ).pipe(map((url) => url.data.split("/").pop() ?? "")),
  )

export const updateZev = (
  zevId: string,
  zevsUpsert: ZevsUpsert,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> =>
  apiCall(
    from(
      deps.adminZevApi.adminUpdateZevById(
        zevId,
        {
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
          serviceStartDate: timestampToApiFormattedDate(zevsUpsert.serviceStartDate, deps),
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
          nextBillingFrequency:
            ZevBillingFrequency[zevsUpsert.nextBillingFrequency as keyof typeof ZevBillingFrequency],
          nextBillingDate: timestampToApiFormattedDate(zevsUpsert.nextBillingDate, deps),
          zevStartDate: timestampToApiFormattedDate(zevsUpsert.zevStartDate, deps),
          pricePackages: setPricesUpsertMapper(zevsUpsert.pricePackages),
          paymentDeadlineInDays: 30,
        },
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )

export const deleteZevById = (zevId: string, deps: DomainDependencies): Observable<DomainResponse<boolean>> => {
  return apiCall(from(deps.adminZevApi.adminDeleteZevById(zevId, apiHeaders(deps))).pipe(map(() => true)))
}

export const activateZevById = (
  zevId: string,
  billableFromDate: number,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminZevApi.adminActivateZevById(
        zevId,
        timestampToApiFormattedDate(billableFromDate, deps),
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const deactivateZevById = (
  zevId: string,
  billableUntilDate: number,
  deps: DomainDependencies,
): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(
      deps.adminZevApi.adminDeactivateZevById(
        zevId,
        timestampToApiFormattedDate(billableUntilDate, deps),
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const createInitialInvoiceByZevId = (
  zevId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<string>> => {
  return apiCall(
    from(deps.adminZevApi.adminPostZevInitialServiceBillingById(zevId, apiHeaders(deps))).pipe(
      map((url) => url.data.split("/").pop() ?? ""),
    ),
  )
}

export const getInitialBillingsForZev = (
  zevId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ZevDetailBillingsList>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(deps.adminServiceBillingsApi.getAdminServiceBillings(headers)).pipe(
      mergeMap((billingResponse) =>
        from(deps.adminZevApi.adminGetZevById(zevId, headers)).pipe(
          map((zevResponse) => zevDetailInitialBillingsListMapper(billingResponse.data, zevResponse.data, deps)),
        ),
      ),
    ),
  )
}

export const getRecurringBillingsForZev = (
  zevId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ZevDetailBillingsList>> => {
  const headers = apiHeaders(deps)
  return apiCall(
    from(deps.adminServiceBillingsApi.getAdminServiceBillings(headers)).pipe(
      mergeMap((billingResponse) =>
        from(deps.adminZevApi.adminGetZevById(zevId, headers)).pipe(
          map((zevResponse) => zevDetailRecurringBillingsListMapper(billingResponse.data, zevResponse.data, deps)),
        ),
      ),
    ),
  )
}
