import { API_URL_LOCAL } from '../../config/api/tesloApi';
import { Product } from '../../domain/entities/product';
import { TesloProduct } from '../interfaces/teslo-products.response';


export class ProductMapper {
    static tesloProductToEntity (tesloProduct: TesloProduct): Product {


        return {
            id: tesloProduct.id,
            title: tesloProduct.title,
            price: tesloProduct.price,
            description: tesloProduct.description,
            slug: tesloProduct.slug,
            stock: tesloProduct.stock,
            sizes: tesloProduct.sizes,
            gender: tesloProduct.gender,
            tags: tesloProduct.tags,
            images: tesloProduct.images.map(
                image => `${API_URL_LOCAL}/files/product/${image}`
            )
        }
    }
}