import { DomainDependencies } from "../Domain.Dependencies"
import { from, map, mergeMap, Observable } from "rxjs"
import { DomainResponse } from "../Domain.Response"
import { apiCall, apiHeaders } from "../Domain.Calls"
import { ContractDetail, ContractProduct, ContractsList, ContractUpsert } from "./Contracts.Models"
import {
  contractDetailMapper,
  contractProductMapper,
  contractsMapper,
  contractsZevListMapper,
} from "./Contracts.Mapper"
import { apiFormattedDateToTimestamp, timestampToApiFormattedDate } from "../Domain.Formatters"
import { StatusType } from "../Domain.Model"
import { santiseEmptyValues } from "../Domain.Mapper"

export const getAllContracts = (deps: DomainDependencies): Observable<DomainResponse<ContractsList>> => {
  return apiCall(
    from(deps.adminContractsApi.adminGetContracts(1, 10000, undefined, apiHeaders(deps))).pipe(
      mergeMap((contractsResponse) =>
        from(deps.adminZevApi.adminGetZevs(1, 10000, undefined, apiHeaders(deps))).pipe(
          mergeMap((zevsResponse) =>
            from(deps.adminProductsAndServicesApi.adminGetProducts(apiHeaders(deps))).pipe(
              map((productsResponse) => ({
                contracts: contractsMapper(contractsResponse.data, zevsResponse.data, productsResponse.data, deps),
              })),
            ),
          ),
        ),
      ),
    ),
  )
}

export const getContractById = (
  contractId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ContractDetail>> => {
  return apiCall(
    from(deps.adminContractsApi.adminGetContractById(contractId, apiHeaders(deps))).pipe(
      mergeMap((contractsResponse) =>
        from(deps.adminZevApi.adminGetZevs(1, 10000, undefined, apiHeaders(deps))).pipe(
          mergeMap((zevsResponse) =>
            from(deps.adminProductsAndServicesApi.adminGetProducts(apiHeaders(deps))).pipe(
              map((productsResponse) =>
                contractDetailMapper(contractsResponse.data, zevsResponse.data, productsResponse.data, deps),
              ),
            ),
          ),
        ),
      ),
    ),
  )
}

export const replaceContract = (
  contractId: string,
  productId: string,
  endDate: number,
  deps: DomainDependencies,
): Observable<DomainResponse<string>> => {
  return apiCall(
    from(
      deps.adminContractsApi.adminReplaceContractById(
        contractId,
        {
          productId: productId,
          endDate: timestampToApiFormattedDate(endDate, deps),
        },
        apiHeaders(deps),
      ),
    ).pipe(map((url) => url.data.split("/").pop() ?? "")),
  )
}

export const approveContract = (contractId: string, deps: DomainDependencies): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminContractsApi.adminApproveContractById(contractId, false, false, apiHeaders(deps))).pipe(
      map(() => true),
    ),
  )
}

export const deleteContract = (contractId: string, deps: DomainDependencies): Observable<DomainResponse<boolean>> => {
  return apiCall(
    from(deps.adminContractsApi.adminDeleteContractById(contractId, apiHeaders(deps))).pipe(map(() => true)),
  )
}

export const getContractsByZevId = (zevId: string, deps: DomainDependencies) => {
  return apiCall(
    from(deps.adminContractsApi.adminGetContracts(1, 10000, undefined, apiHeaders(deps))).pipe(
      mergeMap((contractsResponse) =>
        from(deps.adminProductsAndServicesApi.adminGetProducts(apiHeaders(deps))).pipe(
          map((productsResponse) => ({
            contracts: contractsZevListMapper(contractsResponse.data, productsResponse.data, zevId, deps),
          })),
        ),
      ),
    ),
  )
}

export const getContractUpdateById = (
  contractId: string,
  deps: DomainDependencies,
): Observable<DomainResponse<ContractUpsert>> => {
  return apiCall(
    from(deps.adminContractsApi.adminGetContractById(contractId, apiHeaders(deps))).pipe(
      mergeMap((contractsResponse) =>
        from(deps.adminProductsAndServicesApi.adminGetProducts(apiHeaders(deps))).pipe(
          map((productsResponse) => ({
            statusType: StatusType[contractsResponse.data.currentState],
            startDate: apiFormattedDateToTimestamp(contractsResponse.data.startDate),
            endDate: apiFormattedDateToTimestamp(contractsResponse.data.endDate),
            productId: contractsResponse.data.productId,
            products: productsResponse.data.elements.map((product) => ({
              id: product.id,
              name: product.name,
            })),
          })),
        ),
      ),
    ),
  )
}

export const updateContract = (contractId: string, contractUpsert: ContractUpsert, deps: DomainDependencies) => {
  return apiCall(
    from(
      deps.adminContractsApi.adminUpdateContractById(
        contractId,
        {
          startDate: timestampToApiFormattedDate(contractUpsert.startDate, deps),
          endDate:
            contractUpsert.endDate === -1 ? undefined : timestampToApiFormattedDate(contractUpsert.endDate, deps),
          productId: contractUpsert.productId,
        },
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const createContract = (zevId: string, contractUpsert: ContractUpsert, deps: DomainDependencies) => {
  return apiCall(
    from(
      deps.adminContractsApi.adminCreateContractForZev(
        zevId,
        santiseEmptyValues({
          startDate: timestampToApiFormattedDate(contractUpsert.startDate, deps),
          endDate:
            contractUpsert.endDate === -1 ? undefined : timestampToApiFormattedDate(contractUpsert.endDate, deps),
          productId: contractUpsert.productId,
        }),
        apiHeaders(deps),
      ),
    ).pipe(map(() => true)),
  )
}

export const getContractProducts = (deps: DomainDependencies): Observable<DomainResponse<ContractProduct[]>> => {
  return apiCall(
    from(deps.adminProductsAndServicesApi.adminGetProducts(apiHeaders(deps))).pipe(
      map((productsResponse) => contractProductMapper(productsResponse.data)),
    ),
  )
}
