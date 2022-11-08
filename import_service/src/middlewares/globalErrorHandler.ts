import httpErrorHandler from '@middy/http-error-handler'
import { transformErrorToHttpError } from '@src/middlewares/transformErrorToHttpErrorMiddleware'

export const globalErrorHandler = (): object[] => [transformErrorToHttpError(), httpErrorHandler()]
