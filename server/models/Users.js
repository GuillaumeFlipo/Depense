module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    superUtilisateur: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Users.associate = (models) => {
    Users.hasMany(models.Transactions, {
      onDelete: "cascade",
    });
  };

  return Users;
};
