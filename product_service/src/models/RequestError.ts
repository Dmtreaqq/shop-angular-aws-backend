import { HttpError } from '@middy/util'

export interface RequestError {
  error: Error | HttpError
}
