import localeDateDE from "date-fns/locale/de"
import { parseISO } from "date-fns"
import { testDomainDependencies } from "../Domain.TestUtils"
import { contractsMapper, contractDetailMapper, contractsZevListMapper } from "./Contracts.Mapper"
import { testConfig, pageStub, contractStub, zevStub, productStub } from "./Contracts.Stub"
import { StatusType } from "../Domain.Model"
import { apiFormattedDateToTimestamp } from "../Domain.Formatters"

const domainDependencies = testDomainDependencies()
const depsStub = {
  ...domainDependencies,
  config: { ...testConfig, locale: localeDateDE },
}

test("contractsMapper", () => {
  const result = contractsMapper(
    {
      page: pageStub,
      elements: [contractStub],
    },
    {
      page: pageStub,
      elements: [zevStub],
    },
    { elements: [productStub] },
    depsStub,
  )

  expect(result).toEqual([
    {
      id: contractStub.id,
      statusType: StatusType[contractStub.currentState],
      startDate: "01. Aug 2022",
      sortableStartDate: parseISO(contractStub.startDate).getTime(),
      endDate: "01. Dec 2022",
      sortableEndDate: parseISO(contractStub.endDate ?? "").getTime(),
      productId: productStub.id,
      productName: productStub.name,
      zevId: zevStub.id,
      zevName: zevStub.name,
      predecessorContractId: contractStub.predecessorContractId,
    },
  ])
})

test("contractDetailMapper", () => {
  const result = contractDetailMapper(
    contractStub,
    {
      page: pageStub,
      elements: [zevStub],
    },
    { elements: [productStub] },
    depsStub,
  )

  expect(result).toEqual({
    id: contractStub.id,
    contractStatus: StatusType[contractStub.currentState],
    startDate: "01. Aug 2022",
    startDateValue: apiFormattedDateToTimestamp(contractStub.startDate),
    endDate: "01. Dec 2022",
    endDateValue: apiFormattedDateToTimestamp(contractStub.endDate),
    productId: productStub.id,
    productName: productStub.name,
    zevId: zevStub.id,
    zevName: zevStub.name,
    availableProducts: [productStub].map((product) => ({ id: product.id, name: product.name })),
  })
})

test("contractsZevListMapper", () => {
  const result = contractsZevListMapper(
    {
      page: pageStub,
      elements: [contractStub],
    },
    { elements: [productStub] },
    zevStub.id,
    depsStub,
  )

  expect(result).toEqual([
    {
      id: contractStub.id,
      statusType: StatusType[contractStub.currentState],
      startDate: "01. Aug 2022",
      endDate: "01. Dec 2022",
      productName: productStub.name,
      contractNumber: contractStub.id,
    },
  ])
})
