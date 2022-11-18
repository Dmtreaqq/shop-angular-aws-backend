import { APIGatewayProxyResult } from 'aws-lambda'
import { stringify } from 'bfj'
import { HttpStatus } from '@src/models/HttpStatus'

export const httpTransformResponse = async (
    resBody: Promise<any>,
    statusCode = HttpStatus.OK
): Promise<APIGatewayProxyResult> => {
    const responseBody = await resBody
    const body = responseBody === undefined ? '' : await stringify(responseBody)

    return {
        body,
        statusCode
    }
}
