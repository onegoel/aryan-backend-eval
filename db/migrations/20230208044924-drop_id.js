'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        await queryInterface.removeConstraint('CompanyScores', 'CompanyScores_pkey');
        await queryInterface.removeColumn('Companies', 'id');
        await queryInterface.addConstraint('CompanyScores', {
            fields: ['CompanyId', 'sector'],
            type: 'primary key',
            name: 'CompanyScores_pkey'
        });
    },

    async down (queryInterface, Sequelize) {

        await queryInterface.addConstraint('CompanyScores', {
            fields: ['id'],
            type: 'primary key',
            name: 'CompanyScores_pkey'
        });
        await queryInterface.addColumn('Companies', 'id', {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        });
        await queryInterface.removeConstraint('CompanyScores', 'CompanyScores_pkey');
    }
};
