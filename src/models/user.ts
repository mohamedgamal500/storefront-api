import client from '../database'

export type User = {
  id: number
  firstname: string
  lastname: string
  email: string
  password?: string
}

export default class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * from users'
      const conn = await client.connect()
      const result = await conn.query(sql)
      const usersRes = result.rows
      conn.release()
      return usersRes
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * from users WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const userRes = result.rows[0]
      conn.release()
      return userRes
    } catch (err) {
      throw new Error(`Could not find user with ${id}. Error: ${err}`)
    }
  }

  async create(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [firstname, lastname, email, password])
      const userRes = result.rows[0]
      conn.release()
      return userRes
    } catch (err) {
      throw new Error(`Could not create new user ${firstname}. Error: ${err}`)
    }
  }
}
