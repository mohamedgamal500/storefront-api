import { Router, Request, Response } from 'express'
import UserStore from '../models/user'

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
    const user = await userStore.create(firstName, lastName, email, password)
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
