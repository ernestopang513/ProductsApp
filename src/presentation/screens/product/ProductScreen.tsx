
import { StackScreenProps } from "@react-navigation/stack"
import { ScrollView, Text, FlatList } from 'react-native';
import { RootStackParams } from "../../navigation/StackNavigation"
import { MainLayout } from "../../layouts/MainLayout";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../../accions/products/get-product-by-id";
import { useRef } from "react";
import { Button, ButtonGroup, Input, Layout, useTheme } from "@ui-kitten/components";
import { FadeInImage } from "../../components/ui/FadeInImage";
import { Gender, Size } from '../../../domain/entities/product';
import { MyIcon } from "../../components/ui/MyIcon";
import { Formik } from "formik";

const sizes: Size[] = [Size.Xs, Size.S, Size.M,  Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route}: Props) => {

  const productIdRef = useRef(route.params.productId)
  const theme = useTheme();
  // const {productId} = route.params;

  const {isLoading, data: product} = useQuery({
    queryKey: ['product', productIdRef.current],
    staleTime: 1000 * 60 * 60,
    queryFn: async() => (await getProductById(productIdRef.current))
  })


  if (!productIdRef.current || !product || isLoading) {
    return (<MainLayout title="Cargando...">
      <FullScreenLoader/>
    </MainLayout>)
  }

  return (
    <Formik

    initialValues={product}
    // enableReinitialize
    // initialValues={product ?? {
    //   id: '',
    //   title: '',
    //   price: 0,
    //   description: '',
    //   slug: '',
    //   stock: 0,
    //   sizes: [] as Size[],
    //   gender: '',
    //   tags: [],
    //   images: []
  // }}
    onSubmit={values => console.log(values)}
    
    >

      {
        ({handleChange, handleSubmit, values, errors, setFieldValue}) => (
          <MainLayout

            title={values?.title ?? 'Item not found'}
            subTitle={`Precio: $${values?.price ?? '0'}`}
          >
            {
              (isLoading)
                ? (
                  <FullScreenLoader />
                )
                : (
                  <ScrollView
                    style={{}}
                  >

                    <FlatList
                      data={values?.images}
                      keyExtractor={(item) => item}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <FadeInImage
                          uri={item}
                          style={{ width: 300, height: 300, marginHorizontal: 7 }}
                        />
                      )}
                    />

                    {/* Formulario */}
                    <Layout style={{ marginHorizontal: 10 }}>
                      <Input
                        label="Título"
                        value={values?.title}
                        onChangeText={handleChange('title')}
                        style={{ marginVertical: 5 }}
                      />

                      <Input
                        label="Slug"
                        value={values?.slug}
                        onChangeText={handleChange('slug')}
                        style={{ marginVertical: 5 }}
                      />

                      <Input
                        label="Descripción"
                        value={values?.description}
                        onChangeText={handleChange('description')}
                        multiline
                        numberOfLines={5}
                        style={{ marginVertical: 5 }}
                      />

                    </Layout>

                    {/* Precio e inventario */}

                    <Layout style={{ marginVertical: 5, marginHorizontal: 15, flexDirection: "row", gap: 10 }}>

                      <Input
                        label="Precio"
                        value={values?.price.toString()}
                        onChangeText={handleChange('price')}
                        style={{ flex: 1 }}
                      />

                      <Input
                        label="Inventario"
                        value={values?.stock.toString()}
                        onChangeText={handleChange('stock')}
                        style={{ flex: 1 }}
                      />

                    </Layout>

                    {/* Selectores */}

                    <ButtonGroup
                      style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
                      size="small"
                      appearance="outline"
                    >
                      {
                        sizes.map((size) => (
                          <Button
                            onPress={() => setFieldValue(
                              'sizes',
                              (values?.sizes ?? []).includes(size)
                                ? (values?.sizes ?? [ ] ).filter((s: Size) => s !== size)
                                : [...(values?.sizes ?? []), size]
                            )}
                            key={size}
                            style={{
                              flex: 1,
                              backgroundColor: (values?.sizes ?? []).includes(size) ? theme['color-primary-200'] : undefined
                            }}
                          >{size}</Button>
                        ))
                      }
                    </ButtonGroup>

                    <ButtonGroup
                      style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
                      size="small"
                      appearance="outline"
                    >
                      {
                        genders.map((gender) => (
                          <Button
                            onPress={() => setFieldValue('gender', gender)}
                            key={gender}
                            style={{
                              flex: 1,
                              backgroundColor: (values?.gender ?? []).startsWith(gender) ? theme['color-primary-200'] : undefined
                            }}
                          >{gender.toUpperCase()}</Button>
                        ))
                      }
                    </ButtonGroup>


                    {/* Botón de guardar */}

                    <Button
                      accessoryLeft={<MyIcon name="save-outline" white />}
                      onPress={() => console.log('Guardar')}
                      style={{ margin: 15 }}
                    >
                      Guardar
                    </Button>


                    <Text>
                      ProducScreen: {JSON.stringify(values, null, 2)}

                    </Text>

                    <Layout style={{ height: 150 }} />


                  </ScrollView>
                )
            }
          </MainLayout>
        )
      }
    </Formik>

  )
}