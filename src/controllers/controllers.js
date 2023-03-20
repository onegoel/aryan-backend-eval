const services = require('../services/services');
const Joi = require('joi');
const createHttpError = require('http-errors');
const { errorHandler } = require('../utils/httpError');

const getCompaniesScores = async (req, res) => {
    try {
        const schema = Joi.object({
            urlLink: Joi.string().required()
        });
        const { error } = schema.validate(req.body);
        if(error) {
            throw new createHttpError.BadRequest(error.message);
        }
        const { urlLink } = req.body;
        await services.getCompaniesFromCsvAndStoreInDb(urlLink);
        const companyScoreRecords = await services.getCompanyIdNameScore();
        return res.status(200).json(companyScoreRecords);
    } catch (error) {
        errorHandler(error, res);
    }
};

const getTopRankedCompanies = async (req, res) => {
    try {
        const { sector } = req.query;
        console.log(sector);  
        const topRankedCompanies = await services.getTopRankedCompaniesBySector(sector);
        return res.status(200).json(topRankedCompanies);
    } catch (error) {
        errorHandler(error, res);
    }
};

const updateCompanyRecord = async (req, res) => {
    try {
        const { companyId } = req.params;
        const { body } = req;
        const schema = Joi.object({
            name: Joi.string().required(),
            ceo: Joi.string().required(),
        });
        const { error } = schema.validate(body);
        if(error) {
            throw new createHttpError.BadRequest(error.message);
        }
        const updatedCompanyRecord = await services.updateCompanyRecordInDb(companyId, body);
        return res.status(200).json(updatedCompanyRecord);
    } catch (error) {
        errorHandler(error, res);
    }
};

module.exports = {
    getCompaniesScores,
    getTopRankedCompanies,
    updateCompanyRecord
};