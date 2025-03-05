
import { Button, Icon, Layout, Text } from "@ui-kitten/components"
import { useAuthStore } from "../../store/auth/useAuthStore"
import { getProductsByPage } from "../../../accions/products/get-products-by-page";
import { useQuery } from "@tanstack/react-query";



export const HomeScreen = () => {

  const { logout } = useAuthStore();

  const {isLoading, data: products} = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getProductsByPage(0),
  })


  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>HomeScreen</Text>
{/* 
        <Button
          // style={{width: '100%'}}
          accessoryLeft={<Icon name="log-out-outline" />}
          onPress={logout}
        >
          Cerrar sesión
        </Button> */}


        <Text>{JSON.stringify(products, null, 2 )}</Text>
    </Layout>
  )
}