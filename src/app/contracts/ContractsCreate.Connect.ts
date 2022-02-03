import { connect } from "react-redux"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { AppState } from "../App.Reducer"
import { ContractsActionType } from "./Contracts.Epic"
import { ContractUpsert } from "../../domain/contracts/Contracts.Models"
import { ContractsCreateComponent } from "./ContractsCreate.Component"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.contractsCreate,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    createContract: (zevId: string, upsert: ContractUpsert) => {
      dispatch({
        type: ContractsActionType.CONTRACTS_CREATE,
        zevId: zevId,
        upsert: upsert,
      })
    },
    getContractProducts: () => {
      dispatch({
        type: ContractsActionType.CONTRACTS_GET_PRODUCTS,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractsCreateComponent)
