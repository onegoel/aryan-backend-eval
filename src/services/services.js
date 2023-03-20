const externalApiUtils = require('../utils/externalApi.utils');
const { Companies, CompanyScores } = require('../../db/models');
const createHttpError = require('http-errors');

const getCompaniesFromCsvAndStoreInDb = async (urlLink) => {
    const companyIdSectorJson = await externalApiUtils.getCompaniesCsvAsJson(urlLink);
    if(!companyIdSectorJson) {
        throw new createHttpError.NotFound('No company data found');
    }
    companyIdSectorJson.forEach(async (company) => {
        const companyId = company.company_id;
        const companySector = company.company_sector;
        const companyFullData = await externalApiUtils.getCompanyByIdFromExternal(companyId);
        if(!companyFullData) {
            throw new createHttpError.NotFound('No company data found');
        }
        const companyRecord = {
            companyId: companyId,
            ...companyFullData
        };
        const createCompanyRecord = await Companies.create(companyRecord);
    
        const companyScore = await externalApiUtils.getCompanyPiBySectorAndCalcScore(companySector, companyId);
        if(!companyScore) {
            throw new createHttpError.NotFound('No company score found');
        }
        const companyScoreRecord = {
            CompanyId: companyId,
            sector: companySector,
            score: companyScore,
            // id: companyId,
            name: companyFullData.name
        };
        const createCompanyScoresRecord = await CompanyScores.create(companyScoreRecord);
        if(!createCompanyScoresRecord) {
            throw new createHttpError.NotFound('No company score record found');
        }
    });
};

const getCompanyIdNameScore = async () => {
    const companyScoreRecords = await CompanyScores.findAll(
        {
            attributes: ['CompanyId', 'name', 'score'],
            order: [['score', 'DESC']]
        }
    );
    if(!companyScoreRecords) {
        throw new createHttpError.NotFound('No company score records found');     
    }
    return companyScoreRecords;
};

const truncateTables = async () => {
    await Companies.destroy({ truncate: true, cascade: true });
    await CompanyScores.destroy({ truncate: true });
};

const getTopRankedCompaniesBySector = async (sectorFromQuery) => {
    const companyScoreRecords = await CompanyScores.findAll(
        {
            attributes: ['CompanyId', 'name', 'score', 
                // [sequelize.literal(`select rank() over (order by "CompanyScores"."score" desc) from "CompanyScores" where "CompanyScores"."sector" = "${sectorFromQuery}"`), 'rank'
                // ]
            ],
            // ceo from Companies

            where: { 
                sector: sectorFromQuery,
            },
            order: [['score', 'DESC']],
        }
    );
    if(!companyScoreRecords) {
        throw new createHttpError.NotFound('No company score records found');
    }
    return companyScoreRecords;
};

const updateCompanyRecordInDb = async (companyId, dataToUpdate) => {
    const companyRecord = await Companies.findOne(
        {
            where: {
                companyId: companyId
            }
        }
    );
    if(!companyRecord) {
        throw new createHttpError.NotFound('No company record found');
    }
    const updatedCompanyRecord = await companyRecord.update(
        {
            ...dataToUpdate
        }
    );

    return updatedCompanyRecord;
};

module.exports = {
    getCompaniesFromCsvAndStoreInDb,
    getCompanyIdNameScore,
    truncateTables,
    getTopRankedCompaniesBySector,
    updateCompanyRecordInDb
};