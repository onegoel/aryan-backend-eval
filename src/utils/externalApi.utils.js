const csvToJson = require('csvtojson');
const { default: axios } = require('axios');

const getCompaniesCsvAsJson = async (urlLink) => {
    const csvData = await axios.get(urlLink);
    const jsonData = await csvToJson().fromString(csvData.data);
    return jsonData;
};

const getCompanyByIdFromExternal = async (companyId) => {
    const company = await axios.get(`http://54.167.46.10/company/${companyId}`);
    return company.data;
};

const getCompanyPiBySectorAndCalcScore = async (sector, id) => {
    const companyIdAndPi = await axios.get(`http://54.167.46.10/sector?name=${sector}`);
    const targetCompany = companyIdAndPi.data.find(company => company.companyId === id);
    const targetCompanyPi = targetCompany['performanceIndex'];
    const performanceIndex = { };
    targetCompanyPi.forEach((criteria) => {
        performanceIndex[criteria['key']] = criteria['value'];
    });
    const { cpi, cf, mau, roic } = performanceIndex;
    const score = ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4;
    return score;
};

module.exports = {
    getCompaniesCsvAsJson,
    getCompanyByIdFromExternal,
    getCompanyPiBySectorAndCalcScore
};
