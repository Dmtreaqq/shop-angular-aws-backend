import { GetProductByIdEvent, CreateProductEvent, Product } from '@src/models/models'
import { persistProduct, retrieveStockAndProductById, retrieveStocksAndProductsList } from '@src/services/productService'

export const receiveProductById = async (event: GetProductByIdEvent): Promise<Product | undefined> => {
  const { id } = event.pathParameters
  return await retrieveStockAndProductById(id)
}

export const receiveAllProducts = async (): Promise<Product[] | undefined> => {
  return await retrieveStocksAndProductsList()
}

export const createProduct = async (event: CreateProductEvent): Promise<Product> => {
  const { body } = event
  return await persistProduct(body)
}
