import { Elysia } from 'elysia'
import { Products } from '../schemas/products'

const productsRoute = new Elysia()

productsRoute.get('/products/search', ({ set }) => {
  set.status = 200

  return Products
})

productsRoute.post('/products', ({ set }) => {
  set.status = 201
})

productsRoute.patch('/products/:id', ({ set }) => {
  set.status = 204
})

productsRoute.delete('/products/:id', ({ set }) => {
  set.status = 204
})

export { productsRoute }
