// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import createError from 'http-errors'
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import csv from 'csv-parser'

const client = new S3({ region: 'eu-west-1' })
const BUCKET_NAME = 'dmytro-shop-import-service'

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

export const parseProductCsv = async (productName: string): Promise<any> => {
    try {
        const s3Object = await getObject({
          Bucket: BUCKET_NAME,
          Key: productName
        })
        console.log(s3Object)
        return s3Object
      } catch (error) {
        console.error('Error while downloading object from S3', error.message)
        throw new createError.BadRequest('Error while downloading object from S3')
      }
}

async function getObject(params) {
    const s3ResponseStream: any = (await client.getObject(params)).Body
    const results = []


    s3ResponseStream
        .pipe(csv())
        .on('data', (data) => {
            console.log(data)
            results.push(data)
        })
        .on('end', () => {
            console.log('RESULTS: ', results)
        })

    return results
  }