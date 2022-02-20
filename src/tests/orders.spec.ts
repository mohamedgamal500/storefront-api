import client from "../database";
import OrderStore from "../models/order";
import UserStore from "../models/user";

const orderStore = new OrderStore();
const userStore = new UserStore();


describe('Order Model', () => {

    it('test get single order for user', async () => {
        const user = await userStore.create('mohamed', 'gamal', 'mohamedgamaltest@gmail.com', 'password1234');
        const sql = `INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;`;
        const conn = await client.connect()
        await conn.query(sql, ['active', String(user.id)]);
        conn.release()
        const orders = await orderStore.getOrdersByUserId(String(user.id))
        expect(orders[0]).toEqual({ id: orders[0].id, status: 'active', user_id: user.id })
    });

});
