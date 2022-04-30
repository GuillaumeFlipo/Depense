module.exports = (sequelize, DataTypes) => {
  const TransacRec = sequelize.define("TransacRec", {
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    reccurence: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return TransacRec;
};
