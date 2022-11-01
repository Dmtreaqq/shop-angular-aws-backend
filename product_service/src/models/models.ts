import { APIGatewayEvent } from 'aws-lambda'

export interface ResponseBody {
  statusCode: number
  body: string
}

export interface Product {
  description: string
  id: string
  price: number
  title: string
}

export interface Stock {
  product_id: string
  count: number
}

export type GetProductByIdEvent = APIGatewayEvent & {
  pathParameters: {
    productId: string
  }
}

export type CreateProductEvent = APIGatewayEvent & {
  body: Product
}