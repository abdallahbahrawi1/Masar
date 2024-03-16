import express from 'express';
import { sequelize } from './Database/Models/index';
import session from 'express-session';
import usersRoute from './Routers/usersRoute';

const app = express();
const SequelizeStore = require("connect-session-sequelize")(session.Store);
var myStore = new SequelizeStore({
  db: sequelize,
	checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
});
app.use(
  session({
    secret: "my key",
    store: myStore,
    resave: false,
		saveUninitialized: false,
  })
);
myStore.sync();

const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/users', usersRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  