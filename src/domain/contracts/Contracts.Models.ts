import { StatusType } from "../Domain.Model"

export interface ContractsList {
  contracts: ContractItem[]
}

export interface ContractItem {
  id: string
  statusType: StatusType
  startDate: string
  sortableStartDate: number
  endDate: string
  sortableEndDate: number
  productId: string
  productName: string
  zevId: string
  zevName: string
  predecessorContractId: string | undefined
}

export interface ContractDetail {
  id: string
  contractStatus: StatusType
  startDate: string
  startDateValue: number
  endDate: string
  endDateValue: number
  productId: string
  productName: string
  zevName: string
  zevId: string
  availableProducts: ContractProduct[]
}

export interface ContractProduct {
  id: string
  name: string
}

export interface ContractsZevList {
  contracts: ContractZevListItem[]
}

export interface ContractZevListItem {
  id: string
  statusType: StatusType
  startDate: string
  endDate: string
  productName: string
  contractNumber: string
}

export interface ContractUpsert {
  statusType: StatusType
  startDate: number
  endDate: number
  productId: string
  products: ContractProduct[]
}

export interface ContractProduct {
  id: string
  name: string
}

export const initialContract: ContractUpsert = {
  statusType: StatusType.DRAFT,
  startDate: new Date().getTime(),
  endDate: -1,
  productId: "",
  products: [],
}
