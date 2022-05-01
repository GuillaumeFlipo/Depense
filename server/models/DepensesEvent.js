module.exports = (sequelize, DataTypes) => {
  const DepensesEvent = sequelize.define("DepensesEvent", {
    nom: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    UserId: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dateDebut: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dateFin: {
      type: DataTypes.DATE,
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
