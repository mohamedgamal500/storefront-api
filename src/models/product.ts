import client from '../database'

export type Product = {
  id: number
  name: string
  price: number
  category?: string
}

export default class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT * from products'
      const conn = await client.connect()
      const result = await conn.query(sql)
      const productsRes = result.rows
      conn.release()
      return productsRes
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * from products WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const productRes = result.rows[0]
      conn.release()
      return productRes
    } catch (err) {
      throw new Error(`Could not find product with ${id}. Error: ${err}`)
    }
  }

  async create(name: string, price: number, category: string): Promise<Product> {
    try {
      const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [name, price, category])
      const productRes = result.rows[0]
      conn.release()
      return productRes
    } catch (err) {
      throw new Error(`Could not add new product ${name}. Error: ${err}`)
    }
  }
}
