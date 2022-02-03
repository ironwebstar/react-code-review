import localeDateDE from "date-fns/locale/de"
import { parseISO } from "date-fns"
import {
  billingsRecurringListMapper,
  billingsRecurringMapper,
  serviceBillingMapper,
  billingPositionMapper,
} from "./BillingsRecurring.Mapper"
import { testDomainDependencies } from "../../Domain.TestUtils"
import { testConfig, pageStub, billingRecurringRunStub, serviceBillingStub, zevStub } from "./BillingsRecurring.Stub"
import { StatusType } from "../../Domain.Model"

const domainDependencies = testDomainDependencies()
const depsStub = {
  ...domainDependencies,
  config: { ...testConfig, locale: localeDateDE },
}

test("billingsRecurringListMapper", () => {
  const result = billingsRecurringListMapper(
    {
      elements: [billingRecurringRunStub],
    },
    {
      page: pageStub,
      elements: [zevStub],
    },
    depsStub,
  )

  expect(result).toEqual({
    billingsRecurring: [
      {
        id: billingRecurringRunStub.id,
        statusType: StatusType[billingRecurringRunStub.currentState],
        sortableStatusType: billingRecurringRunStub.currentState.toString(),
        filterablePeriod: "2022-07-01 - 2022-12-31",
        period: "01. Jul 2022 - 31. Dec 2022",
        sortablePeriod: parseISO(billingRecurringRunStub.startDate).getTime(),
        zevs: [{ id: zevStub.id, name: zevStub.name }],
      },
    ],
  })
})

test("billingsRecurringMapper", () => {
  const result = billingsRecurringMapper(
    billingRecurringRunStub,
    [
      {
        zevResponse: zevStub,
        serviceBillingAdminResponse: serviceBillingStub,
      },
    ],
    depsStub,
  )
  expect(result).toEqual({
    id: billingRecurringRunStub.id,
    statusType: StatusType[billingRecurringRunStub.currentState],
    period: "01. Jul 2022 - 31. Dec 2022",
    zevIds: billingRecurringRunStub.zevIds,
    serviceBillings: [
      {
        id: serviceBillingStub.id,
        statusType: StatusType[serviceBillingStub.currentState],
        sortableStatusType: serviceBillingStub.currentState.toString(),
        period: "01. Jan 2022 - 30. Jun 2022",
        sortablePeriod: parseISO(serviceBillingStub.startDate ?? "").getTime(),
        positions: [
          {
            id: "0",
            name: serviceBillingStub.positions[0].name,
            quantity: "54",
            sortableQuantity: 54,
            price: "CHF 5.50",
            sortablePrice: 5.5,
            finalAmountDue: "CHF 297.00",
            sortableFinalAmountDue: 297.0,
          },
        ],
        billingType: serviceBillingStub.billingType,
        zevId: zevStub.id,
        zevName: zevStub.name,
        totalAmountDue: "CHF 442.80",
        sortableTotalAmountDue: 442.8,
        accountingStatus: serviceBillingStub.accountingStatus,
        sortableAccountingStatus: serviceBillingStub.accountingStatus.toString(),
        invoiceReferenceNumber: serviceBillingStub.invoiceReferenceNumber ?? "",
        orderReferenceNumber: serviceBillingStub.orderReferenceNumber ?? "",
        submissionError: serviceBillingStub.accountingErrorMessage,
      },
    ],
  })
})

test("serviceBillingMapper", () => {
  const result = serviceBillingMapper(
    {
      zevResponse: zevStub,
      serviceBillingAdminResponse: serviceBillingStub,
    },
    depsStub,
  )
  expect(result).toEqual({
    id: serviceBillingStub.id,
    statusType: StatusType[serviceBillingStub.currentState],
    sortableStatusType: serviceBillingStub.currentState.toString(),
    period: "01. Jan 2022 - 30. Jun 2022",
    sortablePeriod: parseISO(serviceBillingStub.startDate ?? "").getTime(),
    positions: serviceBillingStub.positions.map((position, index) => billingPositionMapper(position, index)),
    billingType: serviceBillingStub.billingType,
    zevId: zevStub.id,
    zevName: zevStub.name,
    totalAmountDue: "CHF 442.80",
    sortableTotalAmountDue: 442.8,
    accountingStatus: serviceBillingStub.accountingStatus,
    invoiceReferenceNumber: serviceBillingStub.invoiceReferenceNumber ?? "",
    orderReferenceNumber: serviceBillingStub.orderReferenceNumber ?? "",
    submissionError: serviceBillingStub.accountingErrorMessage,
    sortableAccountingStatus: serviceBillingStub.accountingStatus.toString(),
  })
})

test("billingPositionMapper", () => {
  const result = billingPositionMapper(serviceBillingStub.positions[0], 0)
  expect(result).toEqual({
    id: "0",
    name: serviceBillingStub.positions[0].name,
    quantity: "54",
    sortableQuantity: 54,
    price: "CHF 5.50",
    sortablePrice: 5.5,
    finalAmountDue: "CHF 297.00",
    sortableFinalAmountDue: 297,
  })
})
