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
        console.log("res token", res)
        jwtToken = res.text
        console.log(jwtToken)

    }
    catch (error) {
        console.log(error);

    }
});


describe('User Handler', () => {


    it('get all users should return 403 without jwt token', async () => {
        const res = await request.get('/users');
        expect(res.status).toBe(403);
    });

    it('get all users should return 200 with jwt token', async () => {
        const res = await request.get('/users/').set('Authorization', `Bearer ${jwtToken}`);
        expect(res.status).toBe(200);
    });

    it('should return 201 and create a user', async () => {
        const res = await request.post('/users/login')
            .send({
                email: 'mtest@gmail.com',
                password: 'mpass123',
            })
        expect(res.status).toBe(200);
    })

});
