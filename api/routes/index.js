var express = require('express');
var router = express.Router();
var ctrlReferenceData = require('../controllers/referenceData');

// Reference Data routes
router.get('/categories', ctrlReferenceData.referenceDataCategoryList);
router.get('/categories/:categoryName/:categoryVersion', ctrlReferenceData.referenceDataCategoryDetails);
router.get('/categories/:categoryName/:categoryVersion/codes', ctrlReferenceData.referenceDataCategoryCodes);
router.get('/categories/:categoryName/:categoryVersion/codes/:code', ctrlReferenceData.referenceDataCategoryCodesCode);


module.exports = router;
