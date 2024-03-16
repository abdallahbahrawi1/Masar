import dbConfig from '../Config/dbConfig';
import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize(
  (process.env.mysql_database as string) || dbConfig.DB,
  (process.env.mysql_username as string) || dbConfig.USER,
  process.env.mysql_password || dbConfig.PASSWORD,
  {
		host: process.env.mysql_host || dbConfig.HOST,
		dialect: 'mysql',
		pool: {
			max: 10,
			min: 1
		}
  }
);

sequelize.authenticate()
.then(() => {
	console.log('Connected to the database.');
})
.catch(err => {
	console.error('Error connecting to the database:', err);
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.events = require('./event')(sequelize, DataTypes);
db.trips = require('./trip')(sequelize, DataTypes);
db.locations = require('./location')(sequelize, DataTypes);
db.posts = require('./post')(sequelize, DataTypes);
db.ratings = require('./rating')(sequelize, DataTypes);
db.users = require('./user')(sequelize, DataTypes);
db.tripParticipants = require('./tripParticipant')(sequelize, DataTypes);


// User relations
db.users.hasMany(db.trips, {
  foreignKey: { name: "organizer_id", allowNull: false },
});
db.trips.belongsTo(db.users, {
  foreignKey: { name: "organizer_id", allowNull: false },
});

db.users.hasMany(db.events, {
  foreignKey: { name: "organizer_id", allowNull: false },
});
db.events.belongsTo(db.users, {
  foreignKey: { name: "organizer_id", allowNull: false },
});

db.users.hasMany(db.posts, {
  foreignKey: { name: "user_id", allowNull: false },
});
db.posts.belongsTo(db.users, {
  foreignKey: { name: "user_id", allowNull: false },
});

db.users.hasMany(db.ratings, {
  foreignKey: { name: "user_id", allowNull: false },
});

db.ratings.belongsTo(db.users, {
  foreignKey: { name: "user_id", allowNull: false },
});

// location relations
db.trips.belongsTo(db.locations, {
  foreignKey: { name: "location_id", allowNull: false },
});
db.locations.hasMany(db.trips, {
  foreignKey: { name: "location_id", allowNull: false },
});

db.events.belongsTo(db.locations, {
  foreignKey: { name: "location_id", allowNull: false },
});
db.locations.hasMany(db.events, {
  foreignKey: { name: "location_id", allowNull: false },
});

db.locations.hasMany(db.ratings, {
	foreignKey: { name: "location_id", allowNull: false },
});
db.ratings.belongsTo(db.locations, {
  foreignKey: { name: "location_id", allowNull: false },
});

db.trips.belongsToMany(db.users, {
	through: db.tripParticipants, foreignKey: 'trip_id' 
});
db.users.belongsToMany(db.trips, { 
	through: db.tripParticipants, foreignKey: 'user_id' 
});

// Sync with the database
db.sequelize.sync(
	// {force: true}
)
.then(() => {
	console.log('Database synchronization complete.');
})
.catch((err: any) => {
	console.error('Error synchronizing the database:', err);
});

export default db;
