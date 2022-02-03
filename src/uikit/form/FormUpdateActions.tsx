import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import { AlignEndBox, SpaceBetweenAlignBottomBox } from "../box/AlignmentBox"
import { DividerBox } from "../box/DividerBox"
import { CancelButton } from "../button/CancelButton"
import { PrimaryButtonLoading } from "../button/PrimaryButtonLoading"
import { AbortIcon, ResetIcon, SaveIcon } from "../Shared.Icon"

interface FormUpdateActionsFormUpdateActionsViewProps {
  buttonCtaLabel: string
  isValid: boolean
  dirty: boolean
  isLoading: boolean
  navigateBack: () => void
  resetForm: () => void
}

export const FormUpdateActionsView = (props: FormUpdateActionsFormUpdateActionsViewProps) => {
  const { t } = useTranslation()
  const { buttonCtaLabel, isValid, dirty, isLoading, navigateBack, resetForm } = props
  return (
    <SpaceBetweenAlignBottomBox>
      <Box>
        <CancelButton
          id="form-abort"
          startIcon={<AbortIcon />}
          label={t("shared:button.abort")}
          onClick={() => navigateBack()}
        />
      </Box>
      <Box>
        <AlignEndBox>
          <CancelButton
            id="form-reset"
            disabled={!dirty}
            startIcon={<ResetIcon />}
            label={t("shared:button.reset")}
            onClick={() => resetForm()}
          />
          <DividerBox />
          <PrimaryButtonLoading
            id="form-cta"
            disabled={!isValid || !dirty}
            label={buttonCtaLabel}
            type="submit"
            startIcon={<SaveIcon />}
            isLoading={isLoading}
          />
        </AlignEndBox>
      </Box>
    </SpaceBetweenAlignBottomBox>
  )
}
