import { GetProductByIdEvent, CreateProductEvent, Product, ImportProductsEvent } from '@src/models/models'
import {
  importProductsFromCsv,
  persistProduct,
  retrieveStockAndProductById,
  retrieveStocksAndProductsList
} from '@src/services/productService'
import { SQSRecord } from 'aws-lambda'

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

export const sendProductsFromCsv = async (event: ImportProductsEvent): Promise<any> => {
  const records = event.Records.map((record: SQSRecord) => {
    return JSON.parse(record.body)
  })

  await importProductsFromCsv(records)
}
