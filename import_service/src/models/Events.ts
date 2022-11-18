import { APIGatewayProxyEvent, S3CreateEvent } from 'aws-lambda'

export type ImportProductEvent = APIGatewayProxyEvent & {
    queryStringParameters: {
        name: string
    }
}

export type ParseProductEvent = S3CreateEvent & {
    queryStringParameters: {
        name: string
    }
}