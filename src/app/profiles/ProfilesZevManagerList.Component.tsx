import { Table, TableBody, TableCell, Typography } from "@mui/material"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ProfileManagerNameListItem } from "../../domain/profiles/Profiles.Model"
import { FormSectionTitle } from "../../uikit/form/FormView"
import { PaperBox } from "../../uikit/page/PaperBox"
import { TableLoadingSkeleton } from "../../uikit/table/Table.Loading"
import { TableRowClickable } from "../../uikit/table/Table.RowView"
import { firstViewState } from "../Shared.Reducer"
import { mapDispatchToProps } from "./ProfilesZevManagerList.Connect"
import { ProfilesZevManagerListState } from "./ProfilesZevManagerList.Reducer"

interface ProfilesZevManagerListComponentProps
  extends ProfilesZevManagerListState,
    ReturnType<typeof mapDispatchToProps> {
  zevId: string
}

export const ProfilesZevManagerListComponent = (props: ProfilesZevManagerListComponentProps) => {
  const { t } = useTranslation("profiles")
  const { viewState, getZevManagerProfiles, navigateToProfile, zevId } = props
  useEffect(() => {
    if (firstViewState(viewState)) {
      getZevManagerProfiles(zevId)
    }
  }, [viewState, zevId])
  return (
    <PaperBox>
      <FormSectionTitle label={t("manager.title")} />
      <Table>
        {viewState.isLoading && <TableLoadingSkeleton colSpan={1} rowsPerPage={3} />}
        {viewState.domainResult && (
          <TableBody>
            {viewState.domainResult.profiles.map((profile) => (
              <ProfilesZevManagerListItem
                key={profile.id}
                profileItem={profile}
                navigateToProfile={navigateToProfile}
              />
            ))}
          </TableBody>
        )}
      </Table>
    </PaperBox>
  )
}

const ProfilesZevManagerListItem = (props: {
  profileItem: ProfileManagerNameListItem
  navigateToProfile: (profileId: string) => void
}) => {
  const { profileItem, navigateToProfile } = props
  return (
    <TableRowClickable<ProfileManagerNameListItem>
      key={profileItem.id}
      rowData={profileItem}
      rowClick={(profileItem) => navigateToProfile(profileItem.id)}
    >
      <TableCell align="left">
        <Typography variant="body1">{profileItem.fullNameAddress}</Typography>
      </TableCell>
    </TableRowClickable>
  )
}
