import { FormikProps } from "formik"
import { useEffect, RefObject } from "react"
import { ViewState } from "../../app/Shared.Reducer"

interface ClearFormProps<T> {
  viewState: ViewState<unknown>
  formRef: RefObject<FormikProps<T>>
}

export function ClearForm<T>(props: ClearFormProps<T>) {
  const { viewState, formRef } = props
  useEffect(() => {
    if (formRef && formRef.current && viewState.domainResult) {
      formRef.current.resetForm()
    }
  }, [formRef, viewState])
  return <></>
}
