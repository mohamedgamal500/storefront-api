import { Router, Request, Response } from 'express'
import client from '../database'
import UserStore from '../models/user'
import bcrypt from 'bcrypt'
import generateJwtHandler from '../jwt'
import verifyToken from '../middleware/auth'

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
  const { firstname, lastname, email, password } = req.body
  try {
    // check if user exist then throw an error and return
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
    const user = await userStore.create(firstname, lastname, email, hashedPassword)
    // generate the token
    delete user['password'];
    const token = generateJwtHandler(user)
    res.send(token)
  } catch (err) {
    res.status(500)
    res.send(`Could not create new user ${firstname}. Error: ${err}`)
    console.log(`Could not create new user ${firstname}. Error: ${err}`)
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  try {
    // check if user does not exist then throw an error and return
    const sql = 'SELECT * from users WHERE email=($1)'
    const conn = await client.connect()
    const result = await conn.query(sql, [email])
    conn.release()
    if (result.rows.length === 0) {
      res.status(401).send(`incorrect info to login`)
      return
    }

    // check if password same as stored hashed password in db
    const correctPassword = await bcrypt.compare(password, result.rows[0].password)
    if (!correctPassword) {
      res.status(401).send(`incorrect info to login`)
      return
    }

    // generate the token
    const token = generateJwtHandler(result.rows[0])
    res.send(token)
  } catch (err) {
    res.status(500)
    res.send(`Could not login. Error: ${err}`)
    console.log(`Could not login. Error: ${err}`)
  }
}

users.get('/', verifyToken, getAllUsers)
users.get('/:id', verifyToken, getUser)
users.post('/register', register)
users.post('/login', login)

export default users
