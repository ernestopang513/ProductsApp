
import { Card, Text } from "@ui-kitten/components"
import { Product } from "../../../domain/entities/product"
import { Image } from "react-native"
import { FadeInImage } from "../ui/FadeInImage"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParams } from "../../navigation/StackNavigation"

interface Props {
    product: Product
}

export const ProductCard = ({product}: Props) => {

  const navigator = useNavigation<NavigationProp<RootStackParams>>();

  return (
    // <Text>{product.id}</Text>
   <Card
      style = {{flex: 1, backgroundColor: '#f9f9f9', margin: 3}}
      onPress={()=> navigator.navigate('ProductScreen', { productId: product.id})}
   >

    {
      (product.images.length === 0)
      ? (
        <Image
          source={require('../../../assets/no-product-image.png')}
          style = {{width: '100%', height: 200}}
        />
      )
      : (
        
        <FadeInImage
          uri={product.images[0]}
          style = {{width: '100%', height: 200}}
        />
      )
    }

    <Text
    numberOfLines={2}
      style = {{textAlign: 'center'}}
    >{product.title}</Text>

   </Card>
  )
}