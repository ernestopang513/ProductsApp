
import { StackScreenProps } from "@react-navigation/stack"
import { Text, useAnimatedValue, View } from "react-native"
import { RootStackParams } from "../../navigation/StackNavigation"
import { MainLayout } from "../../layouts/MainLayout";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../../accions/products/get-product-by-id";
import { useRef } from "react";
import { Layout, Spinner } from "@ui-kitten/components";

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route}: Props) => {

  const productIdRef = useRef(route.params.productId)

  // const {productId} = route.params;

  const {isLoading, data: product} = useQuery({
    queryKey: ['product', productIdRef.current],
    staleTime: 1000 * 60 * 60,
    queryFn: async() => (await getProductById(productIdRef.current))
  })


  if (!productIdRef.current) {
    return (<MainLayout title="Cargando...">
      <FullScreenLoader/>
    </MainLayout>)
  }

  return (
    <MainLayout
      title={product?.title ?? 'Item not found'}
      subTitle={ `Precio: $${product?.price ?? '0'}`}
    >
      {
        isLoading
        ? (
          <FullScreenLoader/>
        )
        : (
          <Text>ProducScreen: {JSON.stringify(product, null, 2)}</Text>
        )
      }
    </MainLayout>
  )
}