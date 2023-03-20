'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.removeColumn('CompanyScores', 'id');
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.addColumn('CompanyScores', 'id', {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        });
    }
};
