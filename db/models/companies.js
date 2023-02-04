'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    Companies.init({
        companyId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        ceo: DataTypes.STRING,
        tags: DataTypes.ARRAY(DataTypes.STRING)
    }, {
        sequelize,
        modelName: 'Companies',
    });
    return Companies;
};