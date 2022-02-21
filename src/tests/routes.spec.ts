import supertest from 'supertest'
import app from '../index'

// create a request object
const request = supertest(app)

let jwtToken: string

beforeAll(async () => {
    try {
        const res = await request
            .post('/users/register')
            .send({
                firstname: 'mohamed',
                lastname: 'gamal',
                email: 'mtest@gmail.com',
                password: 'mpass123',
            });
        jwtToken = res.text
        console.log(jwtToken)

    }
    catch (error) {
        console.log(error);

    }
});


describe('User Handler', () => {

    it('should return 200 when login with correct email and password', async () => {
        const res = await request.post('/users/login')
            .send({
                email: 'mtest@gmail.com',
                password: 'mpass123',
            })
        expect(res.status).toBe(200);
    })


    it('get all users should return 403 without jwt token', async () => {
        const res = await request.get('/users');
        expect(res.status).toBe(403);
    });

    it('get all users should return 200 with jwt token', async () => {
        const res = await request.get('/users').auth(jwtToken, { type: 'bearer' });
        expect(res.status).toBe(200);
    });


    it('get user should return 403 without jwt token', async () => {
        const res = await request.get('/users/1');
        expect(res.status).toBe(403);
    });

    it('get user should return 200 with jwt token', async () => {
        const res = await request.get('/users/1').auth(jwtToken, { type: 'bearer' });
        expect(res.status).toBe(200);
    });


    it('get orders for user should return 403 without jwt token', async () => {
        const res = await request.get('/orders/ordersForUser/1');
        expect(res.status).toBe(403);
    });

    it('get orders for user return 200 with jwt token', async () => {
        const res = await request.get('/orders/ordersForUser/1').auth(jwtToken, { type: 'bearer' });
        expect(res.status).toBe(200);
    });


    it('get products return 200', async () => {
        const res = await request.get('/products');
        expect(res.status).toBe(200);
    });

    it('should return 200 when create product with jwt token', async () => {
        const res = await request.post('/products')
            .send({
                name: 'blue toy',
                price: 400,
                category: 'toys'
            }).auth(jwtToken, { type: 'bearer' });
        expect(res.status).toBe(200);
    })


    it('get product by id return 200', async () => {
        const res = await request.get('/products/1');
        expect(res.status).toBe(200);
    })



});
