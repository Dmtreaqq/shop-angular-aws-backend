import { stringify } from 'bfj'
import createError, { HttpError } from 'http-errors'
import { RequestError } from '@src/models/RequestError'
import { HttpStatus } from '@src/models/HttpStatus'

export const transformErrorToHttpError = (): object => {
    return {
        onError: async (request: RequestError) => {
            if (!(request.error instanceof HttpError)) {
                request.error = createError(
                    HttpStatus.InternalServerError,
                    await stringify(request.error.message)
                )
            }
        }
    }
}
