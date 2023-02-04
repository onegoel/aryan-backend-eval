'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CompanyScores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
            CompanyScores.belongsTo(models.Companies);
            models.Companies.hasOne(CompanyScores);
        }
    }
    CompanyScores.init({
        name: DataTypes.STRING,
        score: DataTypes.FLOAT,
        sector: DataTypes.STRING,
        companyId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'CompanyScores',
    });
    return CompanyScores;
};