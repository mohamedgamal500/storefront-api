import bodyParser from 'body-parser'
import express, { Application, Request, Response } from 'express'
import logger from 'morgan'
import orders from './handlers/orders'
import products from './handlers/products'
import users from './handlers/users'

const PORT = 5000
const app: Application = express()

app.use(logger('dev'))

app.use(bodyParser.json())

app.use('/orders', orders)
app.use('/products', products)
app.use('/users', users)

app.get('/', (req: Request, res: Response) => {
  res.send('storefront api')
})

app.listen(PORT, () => {
  console.log(`Server is runing at port:${PORT}`)
})

export default app
