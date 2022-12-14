import middy from '@middy/core'
import {APIGatewayProxyEvent, APIGatewayProxyResult, SQSEvent} from 'aws-lambda'
import { normalizeAndParseMiddleware } from '@src/middlewares/normalizeAndParseMiddleware'
import { globalErrorHandler } from '@src/middlewares/globalErrorHandler'
import { httpTransformResponse } from '@src/services/httpTransformResponseService'
import {
    createProduct,
    receiveAllProducts,
    receiveProductById,
    sendProductsFromCsv
} from '@src/controllers/productController'
import {CreateProductEvent, GetProductByIdEvent, ImportProductsEvent} from '@src/models/models'
import httpCors from '@middy/http-cors';

export const getProductById = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>
  await httpTransformResponse(receiveProductById(event as GetProductByIdEvent))
)
  .use(normalizeAndParseMiddleware())
  .use(globalErrorHandler())
  .use(httpCors())

export const getAllProducts = middy(async (): Promise<APIGatewayProxyResult> =>
  await httpTransformResponse(receiveAllProducts())
)
  .use(normalizeAndParseMiddleware())
  .use(globalErrorHandler())
  .use(httpCors())

export const createProductHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>
    await httpTransformResponse(createProduct(event as CreateProductEvent))
)
    .use(normalizeAndParseMiddleware())
    .use(globalErrorHandler())
    .use(httpCors())

export const catalogBatchProcess = async (event: SQSEvent): Promise<any> => {
    await sendProductsFromCsv(event as ImportProductsEvent)
}