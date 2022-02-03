import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import { FlexOneBox } from "../box/FlexBox"
import { SmallPaddedBox } from "../box/PaddedBox"
import { SpaceBetweenWrapBox } from "../box/AlignmentBox"
import { SingleLineTextField } from "../input/SingleLineTextField"
import { HasChildren } from "../Shared.Prop"

interface FilterBoxProps {
  id: string
  filterQuery?: string
  setFilterQuery: (query: string) => void
}

export const FilterBox = (props: FilterBoxProps & HasChildren) => {
  const { t } = useTranslation()
  const { filterQuery, setFilterQuery, children, id } = props
  return (
    <SpaceBetweenWrapBox>
      <FlexOneBox
        sx={{
          minWidth: 220,
        }}
      >
        <SmallPaddedBox mb={1}>
          <SingleLineTextField
            autoFocus
            id={`${id}-filter`}
            name="filter"
            type="text"
            label={t("shared:form.filter.label")}
            value={filterQuery}
            onChange={(event) => setFilterQuery(event.target.value)}
          />
        </SmallPaddedBox>
      </FlexOneBox>
      {children && <Box>{children}</Box>}
    </SpaceBetweenWrapBox>
  )
}
