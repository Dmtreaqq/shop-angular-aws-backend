import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const isOffline = (): boolean => Boolean(process.env.IS_OFFLINE) ?? false

const OFFLINE_CONFIG = {
    endpoint: 'http://localhost:8000',
    credentials: {
        accessKeyId: 'DEFAULT_ACCESS_KEY',
        secretAccessKey: 'DEFAULT_SECRET'
    },
    region: 'localhost'
}
const ONLINE_CONFIG = {
    region: String(process.env.AWS_REGION)
}

const getConfig = (): DynamoDBClientConfig => {
    if (isOffline()) {
        return OFFLINE_CONFIG
    }
    return ONLINE_CONFIG
}

export const dynamoClient = new DynamoDBClient(getConfig())

export const ddbDocClient = DynamoDBDocumentClient.from(dynamoClient)
