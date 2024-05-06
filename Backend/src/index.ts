
import express from 'express';
import cors from 'cors';
import { sequelize } from './Database/Models/index';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import usersRoute from './Routers/usersRoute';
import './passport-setup';
import cookieSession from 'cookie-session'
import passport from 'passport';
// import oauthRoutes from './Routers/oauthRoutes';
// 
import dotenv from 'dotenv';
// import router from './Routers/oauthRoutes';
import authRoute from './Routers/authRoute';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());


const corsOptions = {
  origin:'http://localhost:3000', 
  credentials: true,           
  optionSuccessStatus:200,
  allowedHeaders: ['Content-Type', '*']
}

app.use(cors(corsOptions));


const SequelizeStore = require("connect-session-sequelize")(session.Store);
  
export var myStore = new SequelizeStore({
  db: sequelize,
	checkExpirationInterval: 15 * 60 * 1000, 
  expiration: 24 * 60 * 60 * 1000  
});

app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  session({
    secret: "secrit",
    cookie: { 
      secure: false,
      sameSite: null, 
      httpOnly: true,
    },
    store: myStore,
    saveUninitialized: false,
    resave: false,
    unset: 'destroy'
  }),
);

myStore.sync();

// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: ['asdsad']
// }))
// var uniqueSlug = require('unique-slug')

app.use(passport.initialize())
app.use(passport.session())

const port = process.env.PORT || 4000;

app.use('/users', usersRoute);
app.use('/oauth', authRoute);

// router.use()
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


