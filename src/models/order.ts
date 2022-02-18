import client from '../database'

export type Order = {
    id: number
    status: string
    user_id: number
}

export default class OrderStore {
    async getOrdersByUserId(id: string): Promise<Order[]> {
        try {
            const sql = "SELECT * from orders WHERE user_id=($1)";
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release()
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders for user with ${id}. Error: ${err}`)
        }
    }
}