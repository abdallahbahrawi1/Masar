module.exports = (sequelize: any, DataTypes: any) => {
	const User = sequelize.define("User", {
		
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'email',
			validate: {
				isEmail: true,
				len: [5, 254]
			},
		},	
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [8, 254]
			},
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		profile_image: {
			type: DataTypes.STRING,
		},
		mobile: {
			type: DataTypes.STRING,
		},
		birth_date: {
			type: DataTypes.DATE,
		},
	},{
			timestamps: true,
	});

	return User;
};
