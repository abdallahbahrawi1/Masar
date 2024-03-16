module.exports = (sequelize: any, DataTypes: any) => {
	const Rating = sequelize.define("Rating", {
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
				max: 5,
			},
		},
		review: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
	}, {
		timestamps: true,
	});  
	return Rating;
};
  