module.exports = (sequelize: any, DataTypes: any) => {
	const Post = sequelize.define("Post", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [3, 255],
			},
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
		timestamps: true,
	});
	return Post;
};
