'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.removeColumn('CompanyScores', 'createdAt');
        await queryInterface.removeColumn('CompanyScores', 'updatedAt');
        await queryInterface.removeColumn('Companies', 'createdAt');
        await queryInterface.removeColumn('Companies', 'updatedAt');
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.addColumn('CompanyScores', 'createdAt', {
            allowNull: false,
            type: Sequelize.DATE
        });
        await queryInterface.addColumn('CompanyScores', 'updatedAt', {
            allowNull: false,
            type: Sequelize.DATE
        });
        await queryInterface.addColumn('Companies', 'createdAt', {
            allowNull: false,
            type: Sequelize.DATE
        });
        await queryInterface.addColumn('Companies', 'updatedAt', {
            allowNull: false,
            type: Sequelize.DATE
        });
    }
};
