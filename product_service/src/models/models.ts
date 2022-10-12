import { APIGatewayEvent } from 'aws-lambda'

export interface ResponseBody {
  statusCode: number
  body: string
}

export interface Product {
  count: number
  description: string
  id: string
  price: number
  title: string
}

export type GetProductByIdEvent = APIGatewayEvent & {
  pathParameters: {
    productId: string
  }
}
