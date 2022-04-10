module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Categories", {
    nom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Categories;
};
