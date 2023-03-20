const controllers = require('../../src/controllers/controllers');
const services = require('../../src/services/services');
// const HTTPError = require('../../src/utils/HTTPError');
// const Sequelize = require('sequelize');
// const Joi = require('joi');

describe('controllers', () => {
    describe('getCompaniesScores', () => {
        it('should return 200 status code', async () => {
            const mockReq = {
                body: {
                    urlLink: 'https://s3.amazonaws.com/stock-scores/companies.csv'
                }
            };
            const mockRes = {
                status: jest.fn(),
                json: jest.fn().mockReturnThis()
            };
            jest.spyOn(services, services.getCompaniesFromCsvAndStoreInDb).mockResolvedValue();
        });
    });
});