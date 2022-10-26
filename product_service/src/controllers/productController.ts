import { GetProductByIdEvent, Product } from '@src/models/models'
import { retrieveStockAndProductById, retrieveStocksAndProductsList } from '@src/services/productService'

export const receiveProductById = async (event: GetProductByIdEvent): Promise<Product | undefined> => {
  const { id } = event.pathParameters
  return await retrieveStockAndProductById(id)
}

export const receiveAllProducts = async (): Promise<Product[] | undefined> => {
  return await retrieveStocksAndProductsList()
}
