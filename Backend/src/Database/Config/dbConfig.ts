import dotenv from 'dotenv'
dotenv.config();

const dbConfig = {
  HOST: process.env.DATABASE_HOST,
  USER: process.env.DATABASE_USER,
  PASSWORD: process.env.DATABASE_PASSWORD,
  DB: process.env.DATABASE_NAME,
  dialect: process.env.DATABASE_DIALECT,
  pool: {
    max: 10,
    min: 0,
  },
};

export default dbConfig;