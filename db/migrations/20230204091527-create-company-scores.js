'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CompanyScores', {
            id: {
                allowNull: false,
                // autoIncrement: true,
                primaryKey: true,
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            score: {
                type: Sequelize.FLOAT
            },
            sector: {
                type: Sequelize.STRING
            },
            CompanyId: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                references: {
                    model: 'Companies',
                    key: 'companyId'
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('CompanyScores');
    }
};