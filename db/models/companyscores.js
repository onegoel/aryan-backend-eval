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
            this.belongsTo(models.Company, {
                foreignKey: 'companyId',
                allowNull: false
            });
        }
    }
    CompanyScores.init({
        companyId: DataTypes.STRING,
        name: DataTypes.STRING,
        score: DataTypes.FLOAT,
        sector: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'CompanyScores',
    });
    return CompanyScores;
};