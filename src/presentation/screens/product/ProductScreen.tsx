import { useRef } from "react";
import { ScrollView, Text, FlatList, Keyboard, Image } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigation/StackNavigation"
import { Button, ButtonGroup, Input, Layout, useTheme } from "@ui-kitten/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";

import { MainLayout } from "../../layouts/MainLayout";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { getProductById } from "../../../accions/products/get-product-by-id";
import { FadeInImage } from "../../components/ui/FadeInImage";
import { Gender, Product, Size } from '../../../domain/entities/product';
import { MyIcon } from "../../components/ui/MyIcon";
import { updateCreateProduct } from "../../../accions/products/update-create-product";
import { CameraAdapter } from "../../../config/adapters/camera.adapter";

const sizes: Size[] = [Size.Xs, Size.S, Size.M,  Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route}: Props) => {

  const productIdRef = useRef(route.params.productId)
  const theme = useTheme();
  const queryClient = useQueryClient();
  // const {productId} = route.params;

  const { data: product} = useQuery({
    queryKey: ['product', productIdRef.current],
    staleTime: 1000,
    queryFn: async() => (await getProductById(productIdRef.current))
  })

  const mutation = useMutation({
    mutationFn: (data: Product) => updateCreateProduct({...data, id: productIdRef.current}),
    onSuccess: (data: Product) => {
      productIdRef.current = data.id; // creacion
      queryClient.invalidateQueries({queryKey: ['products', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['product', data.id]});
      console.log('Success')
    }
  })


  if (!product) {
    return (<MainLayout title="Cargando...">
      <FullScreenLoader/>
    </MainLayout>)
  }

  return (
    <Formik

    initialValues={product}
    onSubmit={ mutation.mutate}
    
    >

      {
        ({handleChange, handleSubmit, values, errors, setFieldValue}) => (
          <MainLayout

            title={values?.title ?? 'Item not found'}
            subTitle={`Precio: $${values?.price ?? '0'}`}
            rightAction={async() => {
              const photos = await CameraAdapter.getPicturesFromLibrary();
              console.log(photos);
              setFieldValue('images', [...values.images, ...photos])
            }}
            rightActionIcon="image-outline"
          >
                  <ScrollView
                    style={{}}
                    keyboardShouldPersistTaps='handled'
                  >
                    <Layout style={{marginVertical: 10,justifyContent: 'center', alignItems: 'center'}}>
                      {
                      (values.images.length === 0) 
                        ? (<Image source={require('../../../assets/no-product-image.png')} style = {{width: 300, height: 300}} />)
                        : (
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
                          />)
                        }
                    </Layout>

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
                        // inputMode="text"
                        keyboardType="number-pad"
                        numberOfLines={1}
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
                      disabled = {mutation.isPending}
                      onPress={() => {
                        handleSubmit()
                        Keyboard.dismiss();
                      }}
                      style={{ margin: 15 }}
                    >
                      Guardar
                    </Button>


                    <Text>
                      ProducScreen: {JSON.stringify(values, null, 2)}

                    </Text>

                    <Layout style={{ height: 150 }} />


                  </ScrollView>
                
            
          </MainLayout>
        )
      }
    </Formik>

  )
}