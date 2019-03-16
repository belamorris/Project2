module.exports = function(sequelize, DataTypes) {
  var photolibraries = sequelize.define("photolibraries", {
    celebName: DataTypes.STRING,
    photoURL: DataTypes.STRING,
    // Timestamps
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  return photolibraries;
};
