import {
  ContractDetail,
  ContractProduct,
  ContractsList,
  ContractsZevList,
  ContractUpsert,
} from "../../domain/contracts/Contracts.Models"
import {
  getContractById,
  getAllContracts,
  replaceContract,
  deleteContract,
  getContractsByZevId,
  approveContract,
  updateContract,
  getContractUpdateById,
  createContract,
  getContractProducts,
} from "../../domain/contracts/Contracts.Repository"
import { DOMAIN_DEPENDENCIES } from "../App.Config"
import { createEpic } from "../Shared.Epic"

export enum ContractsActionType {
  CONTRACTS_LIST_GET = "CONTRACT_LIST_GET",
  CONTRACT_GET_BY_ID = "CONTRACT_GET_BY_ID",
  CONTRACT_REPLACE = "CONTRACT_REPLACE",
  CONTRACT_APPROVE = "CONTRACT_APPROVE",
  CONTRACT_DELETE = "CONTRACT_DELETE",
  CONTRACTS_LIST_GET_BY_ZEV_ID = "CONTRACTS_LIST_GET_BY_ZEV_ID",
  CONTRACTS_GET_UPDATE_BY_ID = "CONTRACTS_GET_UPDATE_BY_ID",
  CONTRACTS_UPDATE = "CONTRACTS_UPDATE",
  CONTRACTS_CREATE = "CONTRACTS_CREATE",
  CONTRACTS_GET_PRODUCTS = "CONTRACTS_GET_PRODUCTS",
}

export const contractsEpic = [
  createEpic<ContractsList>(ContractsActionType.CONTRACTS_LIST_GET, () => getAllContracts(DOMAIN_DEPENDENCIES)),
  createEpic<ContractDetail>(ContractsActionType.CONTRACT_GET_BY_ID, (action) =>
    getContractById(action.contractId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<string>(ContractsActionType.CONTRACT_REPLACE, (action) =>
    replaceContract(action.contractId, action.productId, action.endDate, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ContractsActionType.CONTRACT_APPROVE, (action) =>
    approveContract(action.contractId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ContractsActionType.CONTRACT_DELETE, (action) =>
    deleteContract(action.contractId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ContractsZevList>(ContractsActionType.CONTRACTS_LIST_GET_BY_ZEV_ID, (action) =>
    getContractsByZevId(action.zevId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ContractUpsert>(ContractsActionType.CONTRACTS_GET_UPDATE_BY_ID, (action) =>
    getContractUpdateById(action.contractId, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ContractsActionType.CONTRACTS_UPDATE, (action) =>
    updateContract(action.contractId, action.upsert, DOMAIN_DEPENDENCIES),
  ),
  createEpic<boolean>(ContractsActionType.CONTRACTS_CREATE, (action) =>
    createContract(action.zevId, action.upsert, DOMAIN_DEPENDENCIES),
  ),
  createEpic<ContractProduct[]>(ContractsActionType.CONTRACTS_GET_PRODUCTS, () =>
    getContractProducts(DOMAIN_DEPENDENCIES),
  ),
]
