// import localeDateDE from "date-fns/locale/de"
// import { testDomainDependencies } from "../../Domain.TestUtils"
// import { getParticipantBillingDetail } from "./BillingsParticipant.Repository"
// import * as BillingsAllParticipantRepository from "./BillingsAllParticipant.Repository"
// import * as BillingsIndividualParticipantRepository from "./BillingsIndividualParticipant.Repository"
// import {
//   BillingParticipantType,
//   BillingsParticipantDetail,
//   BillingsParticipantFinalise,
// } from "./BillingsParticipant.Model"
// import { testConfig } from "./BillingsParticipant.Stub"

// const domainDependencies = testDomainDependencies()
// const depsStub = {
//   ...domainDependencies,
//   cookie: {
//     ...domainDependencies.cookie,
//   },
//   config: {
//     ...testConfig,
//     locale: localeDateDE,
//   },
// }

// test("getParticipantBillingDetail", () => {
//   const getAllParticipantBillingDetailSpy = jest.spyOn(
//     BillingsAllParticipantRepository,
//     "getAllParticipantBillingDetail",
//   )
//   getParticipantBillingDetail("billing-1", BillingParticipantType.ALL, depsStub)
//   expect(getAllParticipantBillingDetailSpy).toHaveBeenCalledTimes(1)
// })
