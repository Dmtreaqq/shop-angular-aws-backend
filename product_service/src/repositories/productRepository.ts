import { ScanCommand, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
import { get } from 'lodash'
import { ddbDocClient } from '@src/services/dynamoDBManagerService'
import { Product, Stock } from '@src/models/models'

const PRODUCTS_TABLE_NAME = String(process.env.PRODUCTS_TABLE_NAME)
const STOCKS_TABLE_NAME = String(process.env.STOCKS_TABLE_NAME)

export const getProductById = async (id: string | undefined): Promise<any> => {
    const getCommand = new GetCommand({
        TableName: PRODUCTS_TABLE_NAME,
        Key: { id }
    })
    const result = await sendRequest(getCommand)
    return get(result, 'Item', {})
}

export const getStockById = async (product_id: string | undefined): Promise<any> => {
    const getCommand = new GetCommand({
        TableName: STOCKS_TABLE_NAME,
        Key: { product_id }
    })
    const result = await sendRequest(getCommand)
    return get(result, 'Item', {})
}

export const getAllProducts = async (): Promise<any> => {
    const scanCommand = new ScanCommand({
        TableName: PRODUCTS_TABLE_NAME
    })
    const result = await sendRequest(scanCommand)
    return get(result, 'Items', [])
}

export const getAllStocks = async (): Promise<any> => {
    const scanCommand = new ScanCommand({
        TableName: STOCKS_TABLE_NAME
    })
    const result = await sendRequest(scanCommand)
    return get(result, 'Items', [])
}

export const putProduct = async (product: Product): Promise<Product> => {

    await putStock({ product_id: product.id, count: 0 })

    const putCommand = new PutCommand({
        TableName: PRODUCTS_TABLE_NAME,
        Item: product
    })

    await sendRequest(putCommand)
    return product
}

export const putStock = async (stock: Stock): Promise<Stock> => {
    const putCommand = new PutCommand({
        TableName: STOCKS_TABLE_NAME,
        Item: stock
    })

    await sendRequest(putCommand)
    return stock
}

const sendRequest = async (command: any): Promise<any> => {
    try {
        console.debug('Generated query was send: ', JSON.stringify(command))
        return await ddbDocClient.send(command)
    } catch (err) {
        console.error('Error occurred from dynamoDB during send request execution', err)
        throw err
    }
}