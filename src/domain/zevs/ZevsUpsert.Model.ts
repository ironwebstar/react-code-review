import { Map } from "immutable"
import { Municipality, ZevBillingFrequency } from "../../data/generated-sources/openapi"
import { StatusType } from "../Domain.Model"
import { PricePackageUpsert } from "../prices/Prices.Model"
import { ZevPrefillProfile } from "./ZevsDetail.Model"

export const billingFrequencyKeys = Object.keys(ZevBillingFrequency)

export const municipalityKeys = Object.keys(Municipality)

export interface ZevsUpsert {
  id?: string
  statusType: StatusType
  name: string
  serviceStartDate: number
  serviceEndDate: number
  nextBillingDate: number
  billingFrequency: string
  zevStartDate: number
  externalReferenceNumber: string
  incomingMeteringCode: string
  outgoingMeteringCode: string
  contactTelephoneNumber: string
  contactMobileNumber: string
  contactEmail: string
  addressLineOne: string
  addressLineTwo: string
  addressStreet: string
  addressHouseNumber: string
  addressPostalCode: string
  addressCity: string
  municipality: string
  mainContactName: string
  mainContactTelephoneNumber: string
  mainContactMobileNumber: string
  mainContactEmail: string
  paymentInformationPayee: string
  paymentInformationAccountNumber: string
  paymentInformationIban: string
  paymentInformationVatNumber?: string
  paymentInformationAddressStreet: string
  paymentInformationAddressHouseNumber: string
  paymentInformationAddressPostalCode: string
  paymentInformationAddressCity: string
  managers: string[]
  pricePackages: PricePackageUpsert
  nextBillingFrequency?: string
}

export const emptyZevCreate = (zevPrefillProfile: ZevPrefillProfile, profileId?: string): ZevsUpsert => {
  return {
    name: "",
    statusType: StatusType.DRAFT,
    serviceStartDate: -1,
    serviceEndDate: -1,
    nextBillingDate: -1,
    billingFrequency: "",
    zevStartDate: -1,
    externalReferenceNumber: "",
    incomingMeteringCode: "",
    outgoingMeteringCode: "",
    contactTelephoneNumber: zevPrefillProfile.contactTelephoneNumber,
    contactMobileNumber: zevPrefillProfile.contactMobileNumber,
    contactEmail: zevPrefillProfile.contactEmail,
    addressLineOne: "",
    addressLineTwo: "",
    addressStreet: zevPrefillProfile.addressStreet,
    addressHouseNumber: zevPrefillProfile.addressHouseNumber,
    addressPostalCode: zevPrefillProfile.addressPostalCode,
    addressCity: zevPrefillProfile.addressCity,
    municipality: "",
    mainContactName: zevPrefillProfile.mainContactName,
    mainContactTelephoneNumber: zevPrefillProfile.contactTelephoneNumber,
    mainContactMobileNumber: zevPrefillProfile.contactMobileNumber,
    mainContactEmail: zevPrefillProfile.contactEmail,
    paymentInformationPayee: "",
    paymentInformationAccountNumber: "",
    paymentInformationIban: "",
    paymentInformationVatNumber: "",
    paymentInformationAddressStreet: zevPrefillProfile.addressStreet,
    paymentInformationAddressHouseNumber: zevPrefillProfile.addressHouseNumber,
    paymentInformationAddressPostalCode: zevPrefillProfile.addressPostalCode,
    paymentInformationAddressCity: zevPrefillProfile.addressCity,
    managers: profileId ? [profileId] : [],
    pricePackages: Map(),
  }
}
