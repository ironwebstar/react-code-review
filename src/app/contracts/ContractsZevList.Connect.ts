import { AppState } from "../App.Reducer"
import { Dispatch } from "react"
import { AnyAction } from "redux"
import { connect } from "react-redux"
import { ContractsZevListComponent } from "./ContractsZevList.Component"
import { ContractsActionType } from "./Contracts.Epic"
import { push } from "connected-react-router"

const mapStateToProps = (state: AppState) => {
  return {
    ...state.contractsZevList,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    getZevContracts: (zevId: string) => {
      dispatch({
        type: ContractsActionType.CONTRACTS_LIST_GET_BY_ZEV_ID,
        zevId: zevId,
      })
    },
    navigateToContract: (contractId: string) => {
      dispatch(push(`/contracts/${contractId}`))
    },
    navigateToCreateContract: (zevId: string) => {
      dispatch(push(`/zevs/${zevId}/contract/create/`))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractsZevListComponent)
