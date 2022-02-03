import { useState } from "react"
import { Grid, IconButton, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { Map } from "immutable"
import { useTranslation } from "react-i18next"
import { AlignEndBox } from "../../../uikit/box/AlignmentBox"
import { SmallPaddedBox, TinyPaddedBox } from "../../../uikit/box/PaddedBox"
import { FormRowCell, FormView } from "../../../uikit/form/FormView"
import { CURRENCY_ADORNMENT } from "../../../uikit/input/CurrencyAdornment"
import { SingleLineTextField } from "../../../uikit/input/SingleLineTextField"
import { RemoveIcon } from "../../../uikit/Shared.Icon"
import { validatePrices } from "./PricesForm.Validation"
import { PrimaryPlusButton } from "../../../uikit/button/PrimaryPlusButton"
import {
  PricePackageUpsert,
  PricePackageItem,
  PriceMeasurementType,
  initialPricePackageItem,
} from "../../../domain/prices/Prices.Model"

interface PricesFormProps {
  pricePackages: PricePackageUpsert
  pricePackagesChanged: (values: PricePackageUpsert) => void
}

export const PricesForm = (props: PricesFormProps) => {
  const { pricePackages: pricePackages, pricePackagesChanged } = props
  return (
    <Grid container>
      {Array.from(pricePackages.values()).map((priceValues, index) => (
        <PriceItem
          id={priceValues.id}
          key={priceValues.id}
          disableDeleteButton={index === 0}
          priceValues={priceValues}
          priceItemChanged={(updateZevPriceValues) =>
            pricePackagesChanged(pricePackages.set(updateZevPriceValues.id, updateZevPriceValues))
          }
          priceItemRemoved={(id) => {
            pricePackagesChanged(pricePackages.delete(id))
          }}
        />
      ))}
      <SmallPaddedBox>
        <PrimaryPlusButton
          onClick={() => {
            const nextId = (Array.from(pricePackages.values())?.pop()?.id ?? 0) + 1
            pricePackagesChanged(
              pricePackages.set(nextId, {
                ...initialPricePackageItem,
                id: nextId,
              }),
            )
          }}
        />
      </SmallPaddedBox>
    </Grid>
  )
}

const PriceItem = (props: {
  id: number
  priceValues: PricePackageItem
  priceItemChanged: (zevPricesValue: PricePackageItem) => void
  priceItemRemoved: (id: number) => void
  disableDeleteButton: boolean
}) => {
  const { t } = useTranslation("prices")
  const { id, priceValues, priceItemChanged, priceItemRemoved, disableDeleteButton } = props
  const [touched, setTouched] = useState<Map<string, boolean>>(Map())
  return (
    <TinyPaddedBox>
      <Paper
        sx={{
          width: 420,
        }}
      >
        <AlignEndBox>
          <IconButton color="primary" disabled={disableDeleteButton} onClick={() => priceItemRemoved(id)}>
            <RemoveIcon />
          </IconButton>
        </AlignEndBox>
        <>
          <TinyPaddedBox>
            <FormView>
              <FormRowCell>
                <SingleLineTextField
                  name="priceTitle"
                  type="text"
                  label={t("form.field.title")}
                  helperText={validatePrices.title(priceValues.priceTitle, touched.has("priceTitle"), t)}
                  value={priceValues.priceTitle}
                  onChange={(priceTitle) =>
                    priceItemChanged({
                      ...priceValues,
                      priceTitle: priceTitle.target.value,
                    })
                  }
                  onBlur={() => setTouched(touched.set("priceTitle", true))}
                />
              </FormRowCell>
              <FormRowCell>
                <SingleLineTextField
                  name="priceSolarPower"
                  type="text"
                  label={t("form.field.solarPower")}
                  helperText={validatePrices.solarPower(priceValues.priceSolarPower, touched.has("priceSolarPower"), t)}
                  value={priceValues.priceSolarPower}
                  onChange={(priceSolarPower) =>
                    priceItemChanged({
                      ...priceValues,
                      priceSolarPower: priceSolarPower.target.value,
                    })
                  }
                  onBlur={() => setTouched(touched.set("priceSolarPower", true))}
                  InputProps={CURRENCY_ADORNMENT}
                />
              </FormRowCell>
              <FormRowCell>
                <SingleLineTextField
                  name="priceHighTariff"
                  type="text"
                  label={t("form.field.highTariff")}
                  helperText={validatePrices.highTariff(priceValues.priceHighTariff, touched.has("priceHighTariff"), t)}
                  value={priceValues.priceHighTariff}
                  onChange={(priceHighTariff) =>
                    priceItemChanged({
                      ...priceValues,
                      priceHighTariff: priceHighTariff.target.value,
                    })
                  }
                  onBlur={() => setTouched(touched.set("priceHighTariff", true))}
                  InputProps={CURRENCY_ADORNMENT}
                />
              </FormRowCell>
              <FormRowCell>
                <SingleLineTextField
                  name="priceLowTariff"
                  type="text"
                  label={t("form.field.lowTariff")}
                  helperText={validatePrices.lowTariff(priceValues.priceLowTariff, touched.has("priceLowTariff"), t)}
                  value={priceValues.priceLowTariff}
                  onChange={(priceLowTariff) =>
                    priceItemChanged({
                      ...priceValues,
                      priceLowTariff: priceLowTariff.target.value,
                    })
                  }
                  onBlur={() => setTouched(touched.set("priceLowTariff", true))}
                  InputProps={CURRENCY_ADORNMENT}
                />
              </FormRowCell>
              <FormRowCell>
                <ToggleButtonGroup
                  color="secondary"
                  exclusive
                  value={priceValues.measurementType}
                  onChange={() => {
                    if (priceValues.measurementType === PriceMeasurementType.CONSUMPTION_DEPENDANT) {
                      priceItemChanged({
                        ...priceValues,
                        measurementType: PriceMeasurementType.FLAT_RATE,
                      })
                    } else {
                      priceItemChanged({
                        ...priceValues,
                        measurementType: PriceMeasurementType.CONSUMPTION_DEPENDANT,
                      })
                    }
                  }}
                >
                  <ToggleButton value={PriceMeasurementType.CONSUMPTION_DEPENDANT}>
                    {t("form.toggle.consumptionDependant")}
                  </ToggleButton>
                  <ToggleButton value={PriceMeasurementType.FLAT_RATE}>{t("form.toggle.flatRate")}</ToggleButton>
                </ToggleButtonGroup>
              </FormRowCell>
              {priceValues.measurementType === PriceMeasurementType.CONSUMPTION_DEPENDANT && (
                <FormRowCell>
                  <SingleLineTextField
                    name="additionalServicesPrice"
                    type="text"
                    label={t("form.field.measurementServicePerHour")}
                    helperText={validatePrices.measurementServicePerHour(
                      priceValues.additionalServicesPrice,
                      touched.has("additionalServicesPrice"),
                      t,
                    )}
                    value={priceValues.additionalServicesPrice}
                    onChange={(additionalServicesPrice) =>
                      priceItemChanged({
                        ...priceValues,
                        additionalServicesPrice: additionalServicesPrice.target.value,
                      })
                    }
                    onBlur={() => setTouched(touched.set("additionalServicesPrice", true))}
                    InputProps={CURRENCY_ADORNMENT}
                  />
                </FormRowCell>
              )}
              {priceValues.measurementType === PriceMeasurementType.FLAT_RATE && (
                <FormRowCell>
                  <SingleLineTextField
                    name="additionalServicesPrice"
                    type="text"
                    label={t("form.field.measurementServiceMonth")}
                    helperText={validatePrices.measurementServiceMonth(
                      priceValues.additionalServicesPrice,
                      touched.has("additionalServicesPrice"),
                      t,
                    )}
                    value={priceValues.additionalServicesPrice}
                    onChange={(additionalServicesPrice) =>
                      priceItemChanged({
                        ...priceValues,
                        additionalServicesPrice: additionalServicesPrice.target.value,
                      })
                    }
                    onBlur={() => setTouched(touched.set("additionalServicesPrice", true))}
                    InputProps={CURRENCY_ADORNMENT}
                  />
                </FormRowCell>
              )}
              <FormRowCell>
                <ToggleButtonGroup
                  color="secondary"
                  exclusive
                  value={priceValues.containsSpikePrice}
                  onChange={() => {
                    priceItemChanged({
                      ...priceValues,
                      containsSpikePrice: !priceValues.containsSpikePrice,
                      spikePrice: "",
                    })
                  }}
                >
                  <ToggleButton value={false}>{t("form.toggle.spike.without")}</ToggleButton>
                  <ToggleButton value={true}>{t("form.toggle.spike.with")}</ToggleButton>
                </ToggleButtonGroup>
              </FormRowCell>
            </FormView>
            {priceValues.containsSpikePrice && (
              <FormRowCell>
                <SingleLineTextField
                  name="spikePrice"
                  type="text"
                  label={t("form.field.spikePrice")}
                  helperText={validatePrices.spikePrice(
                    priceValues.spikePrice,
                    priceValues.containsSpikePrice,
                    touched.has("spikePrice"),
                    t,
                  )}
                  value={priceValues.spikePrice}
                  onChange={(spikePrice) =>
                    priceItemChanged({
                      ...priceValues,
                      spikePrice: spikePrice.target.value,
                    })
                  }
                  onBlur={() => setTouched(touched.set("spikePrice", true))}
                  InputProps={CURRENCY_ADORNMENT}
                />
              </FormRowCell>
            )}
          </TinyPaddedBox>
        </>
      </Paper>
    </TinyPaddedBox>
  )
}
