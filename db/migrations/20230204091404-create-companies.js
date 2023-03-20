'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Companies', {
            id: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            companyId: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            ceo: {
                type: Sequelize.STRING
            },
            tags: {
                type: Sequelize.ARRAY(Sequelize.STRING)
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
        await queryInterface.dropTable('Companies');
    }
};