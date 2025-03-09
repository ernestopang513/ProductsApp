
import { useAuthStore } from "../../store/auth/useAuthStore"
import { getProductsByPage } from "../../../accions/products/get-products-by-page";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { ProductList } from "../../components/products/ProductList";
import { FAB } from "../../components/ui/FAB";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/StackNavigation";



export const HomeScreen = () => {

  const { logout } = useAuthStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  // const {isLoading, data: products} = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60, // 1 hour
  //   queryFn: () => getProductsByPage(0),
  // })

  //? pages = [ [p1, p2, producto3], [p4, p5, p6 ], [ ]] --- Esto es como se ven los datos por pagina
  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    initialPageParam: 0,
    queryFn: async(params) => {
      console.log(params)
      return await getProductsByPage(params.pageParam)
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  })


  return (
    <>
      <MainLayout
        title="TesloShop - Products"
        subTitle="Aplicación administrativa"
      // rightAction={()=>{}}
      // rightActionIcon="plus-outline"
      >
        {
          isLoading
            ? (<FullScreenLoader />)
            : (
              <ProductList
                products={data?.pages.flat() ?? []}
                fetchNextPage={fetchNextPage}
              />
            )
        }
      </MainLayout>

      <FAB
        style = {{
          position: 'absolute',
          bottom: 30,
          right: 20
        }}
        iconName = 'plus-outline'
        onPress={() => navigation.navigate('ProductScreen', { productId: 'new'})}
      />
    </>
  )
}