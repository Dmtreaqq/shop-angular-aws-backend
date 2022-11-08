import createError from 'http-errors'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const client = new S3Client({ region: 'eu-west-1' })

export const importProduct = async (productName: string | undefined, body: any): Promise<any> => {
    if (productName === undefined) {
        throw new createError.BadRequest('Requested product is not valid')
    }

    const bucketName = 'dmytro-shop-import-service'
    const catalogPath = `uploaded/${productName}.csv`

    const params = {
        Bucket: bucketName,
        Key: catalogPath,
        ContentType: 'text/csv',
        Body: body
    }

    const command = new PutObjectCommand(params)
    const url = await getSignedUrl(client, command, { expiresIn: 3600 })

    return url
}