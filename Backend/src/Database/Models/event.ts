module.exports = (sequelize: any, DataTypes: any) => {
  const Event = sequelize.define("Event", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_datetime: {
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
  return Event;
};
