import { useTranslation } from "react-i18next"
import { AlignEndBox } from "../../../../uikit/box/AlignmentBox"
import { DividerBox } from "../../../../uikit/box/DividerBox"
import { SmallPaddedBox } from "../../../../uikit/box/PaddedBox"
import { Heading6, Heading4 } from "../../../../uikit/typography/Typography"

export interface BillingsTotalViewProps {
  totalConsumption: string
  totalCosts: string
}

export const BillingsTotalView = (props: BillingsTotalViewProps) => {
  const { t } = useTranslation("billings-participant")
  const { totalConsumption, totalCosts } = props
  return (
    <AlignEndBox>
      <SmallPaddedBox
        sx={{
          width: 200,
          textAlign: "right",
        }}
      >
        <Heading6>{t("detail.all.total.total.kwh")}</Heading6>
        <Heading4>{totalConsumption}</Heading4>
      </SmallPaddedBox>
      <DividerBox />
      <SmallPaddedBox
        sx={{
          width: 320,
          textAlign: "right",
        }}
      >
        <Heading6>{t("detail.all.total.total")}</Heading6>
        <Heading4>{totalCosts}</Heading4>
      </SmallPaddedBox>
    </AlignEndBox>
  )
}
