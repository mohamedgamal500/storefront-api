import { Router, Request, Response } from 'express'
import client from '../database'
import UserStore from '../models/user'
import bcrypt from 'bcrypt'

const users = Router()
const userStore = new UserStore()

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userStore.index()
    res.send(users)
  } catch (err) {
    res.status(500)
    res.send(`Could not get users. Error: ${err}`)
    console.log(`Could not get users. Error: ${err}`)
  }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const user = await userStore.show(id)
    res.send(user)
  } catch (err) {
    res.status(500)
    res.send(`Could not find user with ${id}. Error: ${err}`)
    console.log(`Could not find user with ${id}. Error: ${err}`)
  }
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, password } = req.body
  try {
    // check if user exist then throw an error
    const sql = 'SELECT * from users WHERE email=($1)'
    const conn = await client.connect()
    const result = await conn.query(sql, [email])
    conn.release()
    if (result.rows.length > 0) {
      res.status(401).send("this user already exist")
      return
    }

    // hash user password by bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)

    // save the user to the database
    const user = await userStore.create(firstName, lastName, email, hashedPassword)
    // generate the token

    res.send(user)
  } catch (err) {
    res.status(500)
    res.send(`Could not create new user ${firstName}. Error: ${err}`)
    console.log(`Could not create new user ${firstName}. Error: ${err}`)
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  try {
    res.send({ email, password })
  } catch (err) {
    res.status(500)
    res.send(`Could not login. Error: ${err}`)
    console.log(`Could not login. Error: ${err}`)
  }
}

users.get('/', getAllUsers)
users.get('/:id', getUser)
users.post('/register', register)
users.post('/login', login)

export default users
