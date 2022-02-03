import { Redirect, RouteComponentProps } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useEffect, useMemo } from "react"
import { ProgressIndicator } from "../../uikit/progress/ProgressIndicator"
import { coerce } from "../Shared.View"
import { SmallPaddedBox, TinyPaddedBox } from "../../uikit/box/PaddedBox"
import { AppRouteParams } from "../App.Routes"
import { firstViewState } from "../Shared.Reducer"
import { PaperBox } from "../../uikit/page/PaperBox"
import { ErrorAlert, SuccessAlert } from "../../uikit/Shared.Alert"
import { PrimaryEditButton } from "../../uikit/button/PrimaryEditButton"
import { ProductsDetailState } from "./ProductsDetail.Reducer"
import { FormRowColumn } from "../../uikit/form/FormView"
import { AlignEndBox } from "../../uikit/box/AlignmentBox"
import { DataItemBox } from "../../uikit/box/DataItemBox"
import { FlexOneBox } from "../../uikit/box/FlexBox"
import { DividerBox } from "../../uikit/box/DividerBox"
import { Chip, Stack, Typography } from "@mui/material"
import { PrimaryButtonLoading } from "../../uikit/button/PrimaryButtonLoading"
import { RemoveIcon } from "../../uikit/Shared.Icon"
import { PriceComponentsTableView } from "./views/PriceComponentsTableView"
import { mapDispatchToProps } from "./ProductsDetail.Connect"
import { PrimaryPlusButton } from "../../uikit/button/PrimaryPlusButton"

interface ProductsDetailComponentProps
  extends ProductsDetailState,
    RouteComponentProps<AppRouteParams>,
    ReturnType<typeof mapDispatchToProps> {}

export const ProductsDetailComponent = (props: ProductsDetailComponentProps) => {
  const { t } = useTranslation("products")
  const {
    getProductViewState,
    getProductById,
    navigateToUpdateProduct,
    navigateToCreatePriceComponent,
    navigateToUpdatePriceComponent,
    deletePriceComponent,
    deletePriceComponentViewState,
    prevPriceComponentDeleteId,
    deleteProductViewState,
    deleteProduct,
    match,
    showUpdateAlert,
    showPriceComponentCreateSuccessAlert,
    showPriceComponentUpdateSuccessAlert,
  } = props
  const priceComponentsList = useMemo(
    () => getProductViewState.domainResult?.priceComponents ?? [],
    [getProductViewState],
  )
  useEffect(() => {
    if (firstViewState(getProductViewState)) {
      getProductById(match.params.productId)
    }
  }, [getProductViewState])

  if (getProductViewState.isLoading) return <ProgressIndicator />
  return (
    <>
      {deleteProductViewState.domainResult && <Redirect to="/products" />}
      {showUpdateAlert && <SuccessAlert message={t("update.alert.success")} />}
      {showPriceComponentCreateSuccessAlert && <SuccessAlert message={t("create.price.alert.success")} />}
      {showPriceComponentUpdateSuccessAlert && <SuccessAlert message={t("update.price.alert.success")} />}
      {getProductViewState.domainError && <ErrorAlert message={getProductViewState.domainError.message} />}
      {coerce(getProductViewState.domainResult, (productDetail) => (
        <>
          <PaperBox>
            <FormRowColumn>
              <AlignEndBox>
                <SmallPaddedBox>
                  <PrimaryEditButton onClick={() => navigateToUpdateProduct(productDetail.id)} />
                </SmallPaddedBox>
              </AlignEndBox>
            </FormRowColumn>
            <FlexOneBox>
              <TinyPaddedBox>
                <DataItemBox title={t("field.label.products")} value={productDetail.name} />
              </TinyPaddedBox>
            </FlexOneBox>
            <DividerBox />
            <TinyPaddedBox>
              <Typography variant="h5">{t("field.header.base-data")}</Typography>
              <FlexOneBox>
                <DataItemBox
                  title={t("field.label.serviceComponents")}
                  value={
                    <Stack direction="row" spacing={1}>
                      {productDetail.serviceComponents.map((serviceComponent) => (
                        <Chip
                          label={serviceComponent.name}
                          color="secondary"
                          key={serviceComponent.id}
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  }
                />
              </FlexOneBox>
              <DividerBox />
              {deleteProductViewState.domainError && (
                <>
                  <ErrorAlert message={deleteProductViewState.domainError.message} />
                  <DividerBox />
                </>
              )}
              <PrimaryButtonLoading
                startIcon={<RemoveIcon fontSize="large" />}
                label={t("cta.delete-product")}
                isLoading={deleteProductViewState.isLoading}
                onClick={() => deleteProduct(productDetail.id)}
              />
              <DividerBox />
            </TinyPaddedBox>
          </PaperBox>
          <DividerBox />
          <PaperBox>
            <AlignEndBox>
              <SmallPaddedBox>
                <PrimaryPlusButton onClick={() => navigateToCreatePriceComponent(productDetail.id)} />
              </SmallPaddedBox>
            </AlignEndBox>
            {deletePriceComponentViewState.domainResult.get(prevPriceComponentDeleteId ?? "") && (
              <>
                <SuccessAlert message={t("delete.price.alert.success")} />
                <DividerBox />
              </>
            )}
            <PriceComponentsTableView
              priceComponents={priceComponentsList}
              navigateToUpdatePriceComponent={(priceComponentId) =>
                navigateToUpdatePriceComponent(productDetail.id, priceComponentId)
              }
              deletePriceComponent={(priceComponentId) => deletePriceComponent(productDetail.id, priceComponentId)}
              deletePriceComponentViewState={deletePriceComponentViewState}
            />
          </PaperBox>
        </>
      ))}
    </>
  )
}
