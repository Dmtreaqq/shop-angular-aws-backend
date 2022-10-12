import { GetProductByIdEvent, Product } from '@src/models/models'
import createError from 'http-errors'
import products from '@src/assets/products.json'

export const retrieveProductById = async (event: GetProductByIdEvent): Promise<Product> => {
  const { productId } = event.pathParameters

  if (productId === undefined) {
    throw new createError.BadRequest('Product id is undefined')
  }

  const finalProduct = products.find((prod: Product) => {
    return prod.id === productId
  })

  if (finalProduct === undefined) {
    throw new createError.NotFound('Product with such ID not found')
  }

  return finalProduct
}

export const retrieveProductsList = async (): Promise<Product[]> => {
  if (products.length === 0) {
    throw new createError.NotFound('Products not found')
  }

  return products
}
