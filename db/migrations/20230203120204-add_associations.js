'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        queryInterface.addConstraint('Companies', 'companyId', {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        });

        queryInterface.addColumn('CompanyScores', 'companyId', {
            type: Sequelize.STRING,
            allowNull: false
        });

        queryInterface.addConstraint('CompanyScores', {
            fields: ['companyId'],
            type: 'foreign key',
            references: {
                table: 'Companies',
                field: 'companyId'
            }
        });
    },

    async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
        queryInterface.removeColumn('CompanyScores', 'companyId');
        queryInterface.removeConstraint('CompanyScores', 'companyId');

    }
};
