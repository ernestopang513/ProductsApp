
import { Product } from "../../../domain/entities/product"
import { Layout, List, Text } from "@ui-kitten/components"
import { ProducCard } from "./ProductCard"

interface Props {
    products: Product[]

    //todo: fetch nextPage
}


export const ProductList = ({products}: Props) => {
  return (
    <List
        data={products}
        numColumns={2}
        keyExtractor={(item,index) => `${item.id}-${index}`}
        renderItem={ ({item}) => (
            <ProducCard product={item} />
        )}

        ListFooterComponent={ () => <Layout style= {{height: 150}} />}
    />
  )
}