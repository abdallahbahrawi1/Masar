module.exports = (sequelize, DataTypes) => {
	const TripParticipants = sequelize.define("TripParticipants", {
	}, {
		timestamps: true,
	});  
	return TripParticipants;
};
  