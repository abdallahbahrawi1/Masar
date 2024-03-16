module.exports = (sequelize: any, DataTypes: any) => {
	const Location = sequelize.define("Location", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [3, 100],
			},
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		latitude: {
			type: DataTypes.DECIMAL(10, 6), 
			allowNull: true, 
		},
		longitude: {
			type: DataTypes.DECIMAL(10, 6), 
			allowNull: true, 
		},
	}, {
		timestamps: true,
	});

	return Location;
};
  