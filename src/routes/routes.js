const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

router.use(express.json());

router.post('/save', controllers.getCompaniesScores);
router.get('/companies', controllers.getTopRankedCompanies);
router.patch('/companies/:companyId', controllers.updateCompanyRecord);

module.exports = router;