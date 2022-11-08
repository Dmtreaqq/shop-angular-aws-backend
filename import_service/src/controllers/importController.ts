import { importProduct } from '@src/services/importService'
import { ImportProductEvent } from '@src/models/Events'
import createError from 'http-errors'

export const importProductController = async (event: ImportProductEvent): Promise<any> => {
    const { queryStringParameters } = event
    let name
    if (queryStringParameters) {
        name = queryStringParameters.name
    }

    if (!name) {
        throw new createError.BadRequest('You didn\'t pass the NAME parameter')
    }

    return await importProduct(name, event.body)
}