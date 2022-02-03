import { Autocomplete, Box } from "@mui/material"
import { useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { ProfileManagerNameListItem } from "../../domain/profiles/Profiles.Model"
import { FormRowCell, FormSectionTitle } from "../../uikit/form/FormView"
import { SingleLineTextField } from "../../uikit/input/SingleLineTextField"
import { PaperBox } from "../../uikit/page/PaperBox"
import { firstViewState } from "../Shared.Reducer"
import { mapDispatchToProps } from "./ProfilesManagerSelection.Connect"
import { ProfilesManagerSelectionState } from "./ProfilesManagerSelection.Reducer"

interface ProfilesManagerSelectionComponentProps
  extends ProfilesManagerSelectionState,
    ReturnType<typeof mapDispatchToProps> {
  selectedItems: string[]
  onSelectionChanged: (values: string[]) => void
}

export const ProfilesManagerSelectionComponent = (props: ProfilesManagerSelectionComponentProps) => {
  const { t } = useTranslation("profiles")
  const { viewState, selectedItems, getManagerProfiles, onSelectionChanged } = props
  useEffect(() => {
    if (firstViewState(viewState)) {
      getManagerProfiles()
    }
  }, [viewState])
  const profilesList = useMemo(() => viewState.domainResult?.profiles ?? [], [viewState])
  return (
    <PaperBox>
      <FormSectionTitle label={t("manager.title")} />
      <FormRowCell>
        <ProfilesManagerFilterView
          selectedItems={selectedItems}
          profiles={profilesList}
          label={t("manager.selection.field.filter")}
          onSelectionChanged={onSelectionChanged}
        />
      </FormRowCell>
    </PaperBox>
  )
}

const ProfilesManagerFilterView = (props: {
  selectedItems: string[]
  label: string
  profiles: ProfileManagerNameListItem[]
  onSelectionChanged: (values: string[]) => void
}) => {
  const { selectedItems, label, profiles, onSelectionChanged } = props
  return (
    <Autocomplete
      clearOnBlur
      multiple
      filterSelectedOptions
      value={profiles.filter((profile) => selectedItems.includes(profile.id))}
      options={profiles}
      getOptionLabel={(profile) => profile.fullNameAddress}
      onChange={(_, value, reason) => {
        if ((reason === "selectOption" || reason === "removeOption") && value !== null) {
          onSelectionChanged(value.map((profile) => profile.id))
        }
        if (reason === "clear") {
          onSelectionChanged([])
        }
      }}
      renderOption={({ className, id, onClick, onMouseOver, role, onTouchStart, tabIndex }, option) => (
        <Box
          component="li"
          className={className ?? ""}
          id={id}
          onClick={onClick}
          onMouseOver={onMouseOver}
          role={role}
          onTouchStart={onTouchStart}
          tabIndex={tabIndex}
          key={option.id}
        >
          {option.fullNameAddress}
        </Box>
      )}
      renderInput={(params) => <SingleLineTextField {...params} label={label} />}
    />
  )
}
