import { GetProductByIdEvent } from '@src/models/models'
import * as productService from '@src/services/getProductService'

describe('Get product service', () => {
  beforeAll(() => {})
  beforeEach(() => {})
  afterEach(() => {})
  afterAll(() => {})

  it('Should return product when get product by id', async () => {
    const event = { pathParameters: { productId: '7567ec4b-b10c-48c5-9345-fc73c48a80a0' } }
    const products = await productService.retrieveProductById(event as GetProductByIdEvent)

    expect(products).toEqual(expect.objectContaining({ id: event.pathParameters.productId }))
  })

  it('Should throw error when product ID undefined', async () => {
    const event = { pathParameters: { productId: undefined } }

    await expect(productService.retrieveProductById(event as any as GetProductByIdEvent))
      .rejects
      .toThrow('Product id is undefined')
  })

  it('Should throw error when no product with such id', async () => {
    const event = { pathParameters: { productId: '123' } }

    await expect(productService.retrieveProductById(event as any as GetProductByIdEvent))
      .rejects
      .toThrow('Product with such ID not found')
  })

  it('Should return all products when get all products', async () => {
    const products = await productService.retrieveProductsList()

    expect(products).toBeInstanceOf(Array)
  })

  // it('Should throw error when no products while get all products', async () => {
  //   await expect(productService.retrieveProductsList())
  //     .rejects
  //     .toThrow('Products not found')
  // })
})
