import supertest from 'supertest'
import app from '../index'

// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('test endpoint', async () => {
    const positiveResponse = await request.get('/')
    expect(positiveResponse.status).toBe(200)
  })


  it('test endpoint', async () => {
    const negativeResponse = await request.get('/wrongroute')
    expect(negativeResponse.status).toBe(404)
  })

})
