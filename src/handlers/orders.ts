import { Router, Request, Response } from 'express'
import verifyToken from '../middleware/auth'
import OrderStore from '../models/order'

const orders = Router()
const orderStore = new OrderStore()


export const getOrdersForUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const orders = await orderStore.getOrdersByUserId(id)
        res.send(orders)
    } catch (err) {
        res.status(500)
        res.send(`Could not get orders. Error: ${err}`)
        console.log(`Could not get orders. Error: ${err}`)
    }
}


orders.get('/ordersForUser/:id', verifyToken, getOrdersForUser)


export default orders