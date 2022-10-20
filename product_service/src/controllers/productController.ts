import { GetProductByIdEvent, Product } from '@src/models/models'
import { retrieveProductById, retrieveProductsList } from '@src/services/getProductService'

export const receiveProductById = async (event: GetProductByIdEvent): Promise<Product | undefined> => {
  return await retrieveProductById(event)
}

export const receiveAllProducts = async (): Promise<Product[] | undefined> => {
  return await retrieveProductsList()
}
