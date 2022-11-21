import { Product, Stock }  from '@src/models/models'
import createError from 'http-errors'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import {
  getAllProducts,
  getAllStocks,
  getProductById,
  getStockById,
  putProduct
} from '@src/repositories/productRepository'

export const persistProduct = async (product: Product | undefined): Promise<Product> => {
  if (product === undefined) {
    throw new createError.BadRequest('Requested product is not valid')
  }

  const uuid = uuidv4()
  return await putProduct({ ...product, id: uuid })
}

export const importProductsFromCsv = async (products: Product[] | undefined): Promise<any> => {
  if (products === undefined) {
    throw new createError.BadRequest('Requested products is not valid')
  }

  for (let i = 0; i < products.length; i++) {
    await persistProduct(products[i])
  }
}

export const retrieveProductById = async (id: string | undefined): Promise<Product> => {
  if (id === undefined) {
    throw new createError.BadRequest('Product id is undefined')
  }

  const finalProduct = await getProductById(id)

  if (finalProduct === undefined) {
    throw new createError.NotFound('Product with such ID not found')
  }

  return finalProduct
}

export const retrieveStockById = async (product_id: string | undefined): Promise<Stock> => {
  if (product_id === undefined) {
    throw new createError.BadRequest('Stock id is undefined')
  }

  const finalStock = await getStockById(product_id)

  if (finalStock === undefined) {
    throw new createError.NotFound('Stock with such ID not found')
  }

  return finalStock
}

export const retrieveProductsList = async (): Promise<Product[]> => {
  const products = await getAllProducts()

  if (_.isEmpty(products)) {
    throw new createError.NotFound('No products Found')
  }

  return products
}

export const retrieveStocksList = async (): Promise<Stock[]> => {
  const stocks = await getAllStocks()

  if (_.isEmpty(stocks)) {
    throw new createError.NotFound('No stocks Found')
  }

  return stocks
}

export const retrieveStocksAndProductsList = async (): Promise<Product[]> => {
  const stocks = await retrieveStocksList()
  let products = await retrieveProductsList()

  products = products.map((product: Product) => {
    const stock = stocks.find(stk => product.id === stk.product_id)
    return { ...product, count: stock?.count }
  })

  return products
}

export const retrieveStockAndProductById = async (id: string | undefined): Promise<any> => {
  const stock = await retrieveStockById(id)
  const product = await retrieveProductById(id)
  return { ...product, count: stock?.count }
}
