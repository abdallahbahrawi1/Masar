module.exports = (sequelize, DataTypes) => {
	const Trip = sequelize.define("Trip", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [3, 255],
			},
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		start_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		end_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		max_participants: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				min: 1,
			},
		},
	}, {
		timestamps: true,
	});  
	return Trip;
};
  