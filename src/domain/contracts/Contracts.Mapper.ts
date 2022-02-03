import { ContractDetail, ContractItem, ContractProduct, ContractZevListItem } from "./Contracts.Models"
import {
  ContractAdminResponse,
  MultiProductAdminResponse,
  PagedContractAdminResponse,
  PagedZevAdminResponse,
} from "../../data/generated-sources/openapi"
import { apiFormattedDateToTimestamp, appFormattedDate } from "../Domain.Formatters"
import { DomainDependencies } from "../Domain.Dependencies"
import { StatusType } from "../Domain.Model"

export const contractsMapper = (
  contracts: PagedContractAdminResponse,
  zevs: PagedZevAdminResponse,
  products: MultiProductAdminResponse,
  deps: DomainDependencies,
): ContractItem[] => {
  return contracts.elements.map((contractResponse) => {
    const zev = zevs.elements.find((zevResponse) => contractResponse.zevId === zevResponse.id)
    const product = products.elements.find((productResponse) => contractResponse.productId === productResponse.id)
    return {
      id: contractResponse.id,
      statusType: StatusType[contractResponse.currentState],
      startDate: appFormattedDate(contractResponse.startDate, deps),
      sortableStartDate: apiFormattedDateToTimestamp(contractResponse.startDate),
      endDate: appFormattedDate(contractResponse.endDate, deps),
      sortableEndDate: apiFormattedDateToTimestamp(contractResponse.endDate),
      productId: product?.id ?? "",
      productName: product?.name ?? "",
      zevId: zev?.id ?? "",
      zevName: zev?.name ?? "",
      predecessorContractId: contractResponse.predecessorContractId,
    }
  })
}

export const contractDetailMapper = (
  contractAdminResponse: ContractAdminResponse,
  zevAdminResponse: PagedZevAdminResponse,
  productsAdminResponse: MultiProductAdminResponse,
  deps: DomainDependencies,
): ContractDetail => {
  const zev = zevAdminResponse.elements.find((zevResponse) => contractAdminResponse.zevId === zevResponse.id)
  const currentProduct = productsAdminResponse.elements.find(
    (productResponse) => contractAdminResponse.productId === productResponse.id,
  )
  const products = productsAdminResponse.elements.map((product) => ({
    id: product.id,
    name: product.name,
  }))
  return <ContractDetail>{
    id: contractAdminResponse.id,
    contractStatus: StatusType[contractAdminResponse.currentState],
    startDate: appFormattedDate(contractAdminResponse.startDate, deps),
    startDateValue: apiFormattedDateToTimestamp(contractAdminResponse.startDate),
    endDate: appFormattedDate(contractAdminResponse.endDate, deps),
    endDateValue: apiFormattedDateToTimestamp(contractAdminResponse.endDate),
    productId: currentProduct?.id ?? "",
    productName: currentProduct?.name ?? "",
    zevId: zev?.id ?? "",
    zevName: zev?.name ?? "",
    availableProducts: products,
  }
}

export const contractsZevListMapper = (
  contracts: PagedContractAdminResponse,
  products: MultiProductAdminResponse,
  zevId: string,
  deps: DomainDependencies,
): ContractZevListItem[] => {
  return contracts.elements
    .filter((contract) => contract.zevId === zevId)
    .map((contract) => ({
      id: contract.id,
      statusType: StatusType[contract.currentState],
      startDate: appFormattedDate(contract.startDate, deps),
      endDate: appFormattedDate(contract.endDate, deps),
      productName: products.elements.find((product) => product.id === contract.productId)?.name ?? "",
      contractNumber: contract.id,
    }))
}

export const contractProductMapper = (productResponse: MultiProductAdminResponse): ContractProduct[] => {
  return productResponse.elements.map((product) => ({
    id: product.id,
    name: product.name,
  }))
}
