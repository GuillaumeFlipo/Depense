module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define("Transactions", {
    nom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    somme: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    categorie: {
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
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dateString: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Transactions;
};
