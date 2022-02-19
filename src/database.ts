import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { POSTGRES_PORT,
    POSTGRES_HOST,
    POSTGRES_DATABASE,
    POSTGRES_TEST_DATABASE,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    DB_ENV } = process.env


const client = new Pool({
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    database: DB_ENV === 'dev' ? POSTGRES_DATABASE : POSTGRES_TEST_DATABASE,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
})

export default client