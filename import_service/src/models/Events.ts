import { APIGatewayProxyEvent } from 'aws-lambda'

export type ImportProductEvent = APIGatewayProxyEvent & {
    queryStringParameters: {
        name: string
    }
}