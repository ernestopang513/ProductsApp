
import { StackScreenProps } from "@react-navigation/stack"
import { ScrollView, Text, useAnimatedValue, View, StyleSheet, FlatList } from 'react-native';
import { RootStackParams } from "../../navigation/StackNavigation"
import { MainLayout } from "../../layouts/MainLayout";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../../accions/products/get-product-by-id";
import { useRef } from "react";
import { Input, Layout, Spinner } from "@ui-kitten/components";
import { FadeInImage } from "../../components/ui/FadeInImage";

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
          <ScrollView
            style={{}}
          >

            <FlatList
              data={product?.images}
              keyExtractor={(item) => item }
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={ ({item}) => (
                <FadeInImage
                  uri={item}
                  style = {{width: 300, height: 300, marginHorizontal: 7 }}
                />
              )}
            />

            {/* Formulario */}
            <Layout style = {{marginHorizontal: 10}}>
              <Input
                label = "Título"
                value = { product?.title }
                style = {{marginVertical: 5}}
              />
              
              <Input
                label = "Slug"
                value = { product?.slug }
                style = {{marginVertical: 5}}
              />
              
              <Input
                label = "Descripción"
                value = { product?.description }
                multiline
                numberOfLines={5}
                style = {{marginVertical: 5}}
              />

            </Layout>

              
            <Layout style = {{marginVertical: 5, marginHorizontal: 15, flexDirection: "row", gap: 10}}>

              <Input
                label = "Precio"
                value = { product?.price.toString() }
                style = {{flex: 1}}
              />
              
              <Input
                label = "Inventario"
                value = { product?.stock.toString() }
                style = {{flex: 1}}
              />




            </Layout>

            <Layout style = {{height: 200}} />

            {/* <Text>
            ProducScreen: {JSON.stringify(product, null, 2)}

            </Text> */}
          </ScrollView>
        )
      }
    </MainLayout>
  )
}