import { Fragment, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { IconButton, TableCell, TableContainer, TableRow, Tooltip } from "@mui/material"
import { ProfileListItem, ProfileStatusType } from "../../domain/profiles/Profiles.Model"
import { TableFixed } from "../../uikit/table/Table.Fixed"
import { TableRowClickable, TableRowView } from "../../uikit/table/Table.RowView"
import { PageRowSlice, TablePaginationView } from "../../uikit/table/Table.PaginationView"
import { TableColumnSort, TableHeaderView } from "../../uikit/table/Table.HeaderView"
import { ORDERED_STRING_COMPARATOR } from "../../domain/Domain.Comparators"
import { PaperBox } from "../../uikit/page/PaperBox"
import { firstViewState } from "../Shared.Reducer"
import { ProfilesListState } from "./ProfilesList.Reducer"
import { StatusView } from "../../uikit/label/StatusView"
import { PageHeaderFilterBox } from "../../uikit/page/PageHeaderFilterBox"
import { ErrorAlert, SuccessAlert, TableRowErrorAlert } from "../../uikit/Shared.Alert"
import { TickIcon, CrossIcon, AccountBlockedIcon } from "../../uikit/Shared.Icon"
import { SmallPaddedBox } from "../../uikit/box/PaddedBox"
import { PrimaryPlusButton } from "../../uikit/button/PrimaryPlusButton"
import { mapDispatchToProps } from "./ProfilesList.Connect"
import { TableActionView } from "../../uikit/table/TableActionView"
import { StatusType } from "../../domain/Domain.Model"

interface ProfilesListComponentProps extends ProfilesListState, ReturnType<typeof mapDispatchToProps> {}

enum ProfilesListColumns {
  STATUS_TYPE = "STATUS_TYPE",
  PROFILE_NAME = "PROFILE_NAME",
  USER_NAME = "USER_NAME",
  TYPE = "TYPE",
  COMMAND = "COMMAND",
}

export const ProfilesListComponent = (props: ProfilesListComponentProps) => {
  const { t } = useTranslation("profiles")
  const {
    viewState,
    getProfiles,
    navigateToProfileDetail,
    navigateToCreateProfile,
    activateViewStateMap,
    activateProfile,
    directActivateProfile,
    deactivateViewStateMap,
    deactivateProfile,
    directDeactivateProfile,
    showDeleteAlert,
  } = props

  useEffect(() => {
    if (firstViewState(viewState)) {
      getProfiles()
    }
  }, [viewState])

  const profileList = useMemo(
    () =>
      viewState.domainResult?.profiles?.map((profile) => ({
        ...profile,
        type: t(`userType.${profile.type}`),
        statusTypeFilter: t(`shared:status.${StatusType[profile.statusType]}`),
      })) ?? [],
    [viewState],
  )

  const [orderBy, setOrderBy] = useState<TableColumnSort<ProfilesListColumns>>({
    column: ProfilesListColumns.PROFILE_NAME,
    direction: "asc",
  })

  const [pageRowSlice, setPageRowSlice] = useState<PageRowSlice>({
    start: 0,
    end: 25,
  })

  const [filterQuery, setFilterQuery] = useState<string>("")

  const headers = [
    {
      column: ProfilesListColumns.STATUS_TYPE,
      label: t("list.label.status"),
      width: "10%",
      orderable: true,
    },
    {
      column: ProfilesListColumns.PROFILE_NAME,
      label: t("list.label.profileName"),
      width: "25%",
      orderable: true,
    },
    {
      column: ProfilesListColumns.USER_NAME,
      label: t("list.label.userName"),
      width: "45%",
      orderable: true,
    },
    {
      column: ProfilesListColumns.TYPE,
      label: t("list.label.type"),
      width: "15%",
      orderable: true,
    },
    {
      column: ProfilesListColumns.COMMAND,
      label: t("list.label.command"),
      width: "5%",
      orderable: false,
    },
  ]

  const columnComparator = () => {
    switch (orderBy.column) {
      case ProfilesListColumns.STATUS_TYPE:
        return (a: ProfileListItem, b: ProfileListItem) =>
          ORDERED_STRING_COMPARATOR(a.statusType, b.statusType, orderBy.direction)
      case ProfilesListColumns.PROFILE_NAME:
        return (a: ProfileListItem, b: ProfileListItem) =>
          ORDERED_STRING_COMPARATOR(a.profileName, b.profileName, orderBy.direction)
      case ProfilesListColumns.USER_NAME:
        return (a: ProfileListItem, b: ProfileListItem) =>
          ORDERED_STRING_COMPARATOR(a.userName, b.userName, orderBy.direction)
      case ProfilesListColumns.TYPE:
        return (a: ProfileListItem, b: ProfileListItem) => ORDERED_STRING_COMPARATOR(a.type, b.type, orderBy.direction)
      default:
        return (a: ProfileListItem, b: ProfileListItem) => ORDERED_STRING_COMPARATOR(a.id, b.id, orderBy.direction)
    }
  }

  return (
    <>
      {showDeleteAlert && <SuccessAlert message={t("list.alert.delete.success")} />}
      <PaperBox>
        <PageHeaderFilterBox
          id="list-title"
          headerTitle={t("list.title")}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        >
          <SmallPaddedBox>
            <PrimaryPlusButton onClick={navigateToCreateProfile} />
          </SmallPaddedBox>
        </PageHeaderFilterBox>
        <TableContainer>
          <TableFixed>
            <TableHeaderView<ProfilesListColumns>
              isLoading={viewState.isLoading}
              headers={headers}
              orderBy={orderBy}
              orderByChanged={(orderBy) => setOrderBy(orderBy)}
            />
            {viewState.domainError && (
              <TableRowErrorAlert colSpan={5} retry={() => getProfiles()} message={viewState.domainError.message} />
            )}
            <TableRowView<ProfileListItem>
              id="list-table"
              colSpan={5}
              rows={profileList}
              pageRowSlice={pageRowSlice}
              comparator={columnComparator}
              filterQuery={filterQuery}
              render={(profileListItem) => {
                const isLoading =
                  activateViewStateMap.isLoading.get(profileListItem.id) ||
                  deactivateViewStateMap.isLoading.get(profileListItem.id)
                return (
                  <Fragment key={profileListItem.id}>
                    {activateViewStateMap.domainError.get(profileListItem.id) && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <ErrorAlert
                            message={activateViewStateMap.domainError.get(profileListItem.id)?.message ?? ""}
                            retry={() => directActivateProfile(profileListItem.id)}
                          />
                        </TableCell>
                      </TableRow>
                    )}
                    {deactivateViewStateMap.domainError.get(profileListItem.id) && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <ErrorAlert
                            message={deactivateViewStateMap.domainError.get(profileListItem.id)?.message ?? ""}
                            retry={() => directDeactivateProfile(profileListItem.id)}
                          />
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRowClickable
                      rowData={profileListItem}
                      rowClick={(profile) => navigateToProfileDetail(profile.id)}
                    >
                      <TableCell className={`row-${ProfilesListColumns.STATUS_TYPE}`} align="left">
                        <StatusView statusType={profileListItem.statusType} />
                      </TableCell>
                      <TableCell className={`row-${ProfilesListColumns.PROFILE_NAME}`} align="left">
                        {profileListItem.profileName}
                      </TableCell>
                      <TableCell className={`row-${ProfilesListColumns.USER_NAME}`} align="left">
                        {profileListItem.userName}
                      </TableCell>
                      <TableCell className={`row-${ProfilesListColumns.TYPE}`} align="left">
                        {profileListItem.type}
                      </TableCell>
                      <TableCell className={`row-${ProfilesListColumns.COMMAND}`} align="center">
                        <TableActionView isLoading={isLoading ?? false}>
                          {profileListItem.profileStatusType === ProfileStatusType.BLOCKED && (
                            <Tooltip title={<>{t("list.tooltip.activate")}</>}>
                              <IconButton
                                onClick={(event) => {
                                  event.stopPropagation()
                                  activateProfile(profileListItem.id)
                                }}
                              >
                                <CrossIcon color="error" fontSize="large" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {profileListItem.profileStatusType === ProfileStatusType.ACTIVE && (
                            <Tooltip title={<>{t("list.tooltip.deactivate")}</>}>
                              <IconButton
                                onClick={(event) => {
                                  event.stopPropagation()
                                  deactivateProfile(profileListItem.id)
                                }}
                              >
                                <TickIcon color="secondary" fontSize="large" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {profileListItem.profileStatusType === ProfileStatusType.NOT_CREATED && (
                            <Tooltip title={<>{t("list.tooltip.createLogin")}</>}>
                              <IconButton onClick={() => void 0}>
                                <AccountBlockedIcon color="warning" fontSize="large" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableActionView>
                      </TableCell>
                    </TableRowClickable>
                  </Fragment>
                )
              }}
            />
          </TableFixed>
          <TablePaginationView rowCount={profileList.length} onPageRowSliceChanged={setPageRowSlice} />
        </TableContainer>
      </PaperBox>
    </>
  )
}
