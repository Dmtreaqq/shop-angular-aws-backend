import { Product, Stock }  from '@src/models/models'
import createError from 'http-errors'
import _ from 'lodash'
import { getAllProducts, getAllStocks, getProductById, getStockById } from '@src/repositories/productRepository'

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
