const dbConfig = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'root',
  DB: 'travel',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
  },
};

export default dbConfig;