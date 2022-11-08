import httpHeaderNormalizer from '@middy/http-header-normalizer'
import jsonBodyParser from '@middy/http-json-body-parser'

export const normalizeAndParseMiddleware = (options?): object[] => {
    options = {
        ...options
    }

    return [
        httpHeaderNormalizer(options.headerNormalizeOption),
        jsonBodyParser(options.jsonBodyParserOption)
    ]
}
