import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { AppState } from "../App.Reducer"
import { ContractsActionType } from "./Contracts.Epic"
import { ContractsUpdateComponent } from "./ContractsUpdate.Component"
import { ContractUpsert } from "../../domain/contracts/Contracts.Models"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.contractsUpdate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getContractUpsert: (contractId: string) => {
      dispatch({
        type: ContractsActionType.CONTRACTS_GET_UPDATE_BY_ID,
        contractId: contractId,
      })
    },
    updateContract: (contractId: string, upsert: ContractUpsert) => {
      dispatch({
        type: ContractsActionType.CONTRACTS_UPDATE,
        contractId: contractId,
        upsert: upsert,
      })
    },
    navigateToContract: (contractId: string) => {
      dispatch(push(`/contracts/${contractId}`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractsUpdateComponent)
