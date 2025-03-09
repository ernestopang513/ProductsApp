
import { useState } from "react";
import { RefreshControl } from "react-native";
import { Layout, List,} from "@ui-kitten/components"
import { useQueryClient } from "@tanstack/react-query";
import { Product } from "../../../domain/entities/product"
import { ProductCard } from "./ProductCard"

interface Props {
    products: Product[]

    //todo: fetch nextPage
    fetchNextPage: () => void;
}


export const ProductList = ({products, fetchNextPage}: Props) => {


  const queryClient = useQueryClient();
  const [isRefreshing, setIsRegreshing] = useState(false);

  const onPullToRefresh = async() => {
    setIsRegreshing(true);
    //! Solo en local
    // await new Promise(resolve => setTimeout(resolve, 1500));
    queryClient.invalidateQueries({queryKey: ['products', 'infinite']})

    setIsRegreshing(false)
  }
  return (
    <List
        data={products}
        numColumns={2}
        keyExtractor={(item,index) => `${item.id}-${index}`}
        renderItem={ ({item}) => (
            <ProductCard product={item} />
        )}

        ListFooterComponent={ () => <Layout style= {{height: 150}} />}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.8}

        refreshControl={
          <RefreshControl
            refreshing={ isRefreshing} 
            onRefresh={onPullToRefresh}
          />
        }
    />
  )
}