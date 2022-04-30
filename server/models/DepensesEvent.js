module.exports = (sequelize, DataTypes) => {
  const DepensesEvent = sequelize.define("DepensesEvent", {
    nom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dateDebut: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    dateFin: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });
  DepensesEvent.associate = (models) => {
    DepensesEvent.hasMany(models.Transactions, {
      onDelete: "cascade",
    });
  };

  return DepensesEvent;
};
