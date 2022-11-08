import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import httpCors from '@middy/http-cors';
import { normalizeAndParseMiddleware } from '@src/middlewares/normalizeAndParseMiddleware'
import { globalErrorHandler } from '@src/middlewares/globalErrorHandler'
import { httpTransformResponse } from '@src/services/httpTransformResponseService'
import { importProductController } from '@src/controllers/importController'
import { ImportProductEvent } from '@src/models/Events'

export const importProductsFile = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>
    await httpTransformResponse(importProductController(event as ImportProductEvent)))
        .use(normalizeAndParseMiddleware())
        .use(globalErrorHandler())
        .use(httpCors())