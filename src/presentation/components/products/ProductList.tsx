
import { Product } from "../../../domain/entities/product"
import { Layout, List, Text } from "@ui-kitten/components"
import { ProductCard } from "./ProductCard"
import { useState } from "react";
import { RefreshControl } from "react-native";

interface Props {
    products: Product[]

    //todo: fetch nextPage
    fetchNextPage: () => void;
}


export const ProductList = ({products, fetchNextPage}: Props) => {

  const [isRefreshing, setIsRegreshing] = useState(false);

  const onPullToRefresh = async() => {
    setIsRegreshing(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

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