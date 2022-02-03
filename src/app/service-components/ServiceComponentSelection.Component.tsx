import { Autocomplete } from "@mui/material"
import { useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { ServiceComponentListItem } from "../../domain/service-components/ServiceComponents.Model"
import { FormRowCell, FormSectionTitle } from "../../uikit/form/FormView"
import { SingleLineTextField } from "../../uikit/input/SingleLineTextField"
import { firstViewState } from "../Shared.Reducer"
import { mapDispatchToProps } from "./ServiceComponentSelection.Connect"
import { ServiceComponentsSelectionState } from "./ServiceComponentSelection.Reducer"

interface ServiceComponentSelectionComponentProps
  extends ServiceComponentsSelectionState,
    ReturnType<typeof mapDispatchToProps> {
  selectedItems: string[]
  onSelectionChanged: (values: string[]) => void
}

export const ServiceComponentSelectionComponent = (props: ServiceComponentSelectionComponentProps) => {
  const { t } = useTranslation("service-components")
  const { viewState, selectedItems, getServiceComponents, onSelectionChanged } = props
  useEffect(() => {
    if (firstViewState(viewState)) {
      getServiceComponents()
    }
  }, [viewState])
  const serviceComponents = useMemo(() => viewState.domainResult?.serviceComponents ?? [], [viewState])
  return (
    <>
      <FormSectionTitle label={t("form.title.base-data")} />
      <FormRowCell>
        <ServiceComponentFilterView
          selectedItems={selectedItems}
          serviceComponents={serviceComponents}
          label={t("form.field.select.name")}
          onSelectionChanged={onSelectionChanged}
        />
      </FormRowCell>
    </>
  )
}

const ServiceComponentFilterView = (props: {
  selectedItems: string[]
  label: string
  serviceComponents: ServiceComponentListItem[]
  onSelectionChanged: (values: string[]) => void
}) => {
  const { t } = useTranslation()
  const { selectedItems, label, serviceComponents, onSelectionChanged } = props
  return (
    <Autocomplete
      clearOnBlur
      multiple
      filterSelectedOptions
      value={serviceComponents.filter((serviceComponent) => selectedItems.includes(serviceComponent.id))}
      options={serviceComponents}
      getOptionLabel={(serviceComponent) => serviceComponent.name}
      onChange={(_, value, reason) => {
        if ((reason === "selectOption" || reason === "removeOption") && value !== null) {
          onSelectionChanged(value.map((serviceComponent) => serviceComponent.id))
        }
        if (reason === "clear") {
          onSelectionChanged([])
        }
      }}
      renderInput={(params) => (
        <SingleLineTextField {...params} placeholder={t("shared:input.hint.add")} label={label} />
      )}
    />
  )
}
