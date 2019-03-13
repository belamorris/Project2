module.exports = function(sequelize, DataTypes) {
  var Faces = sequelize.define("Faces", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Faces;
};
