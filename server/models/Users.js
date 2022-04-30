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
    Users.hasMany(models.Categories, {
      onDelete: "cascade",
    });
    Users.hasMany(models.DepensesEvent, {
      onDelete: "cascade",
    });
    Users.hasMany(models.TransacRec, {
      onDelete: "cascade",
    });
  };

  return Users;
};
