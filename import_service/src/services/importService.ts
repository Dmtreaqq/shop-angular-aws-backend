// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import createError from 'http-errors'
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3'
import { SQSClient, SendMessageCommand, SendMessageCommandInput } from '@aws-sdk/client-sqs'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import csv from 'csv-parser'
import { Stream } from 'stream'

const REGION = 'eu-west-1'
const client = new S3({ region: REGION })
const sqsClient = new SQSClient({ region: REGION })
const BUCKET_NAME = 'dmytro-shop-import-service'
const queueUrl = 'https://sqs.eu-west-1.amazonaws.com/192675374686/catalogItemsQueue'

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
        return s3Object
      } catch (error) {
        console.error('Error while downloading object from S3', error.message)
        throw new createError.BadRequest('Error while downloading object from S3')
      }
}

async function getObject(params) {
    const s3ResponseStream: any = (await client.getObject(params)).Body


    const processS3Stream = async (stream: Stream) => {
        return new Promise((res, rej) => {
            const results = []
            stream.pipe(csv())
                .on('data', (data) => results.push(data))
                .on('error', rej)
                .on('end', () => {
                    return res(results)
                });
        })
    }

    const records = await processS3Stream(s3ResponseStream)
    await Promise.all(records.map(async (item) => {
        const paramsSqs: SendMessageCommandInput = {
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify(item),
            DelaySeconds: 0
        }

        try {
            const result = await sqsClient.send(new SendMessageCommand(paramsSqs))
            console.log('message to SQS Queue was sent. Message ID: ', result.MessageId)
        } catch (err) {
            console.log('err: ', err)
        }

    }))

    return records
  }