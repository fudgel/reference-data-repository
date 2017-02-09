var express = require('express');
var router = express.Router();
var ctrlReferenceData = require('../controllers/referenceData');

// Reference Data routes
router.get('/categories', ctrlReferenceData.referenceDataCategoryList);
router.get('/categories/:categoryName', ctrlReferenceData.referenceDataCategoryDetails);
router.get('/categories/:categoryName/codes', ctrlReferenceData.referenceDataCategoryCodes);
router.get('/categories/:categoryName/codes/:code', ctrlReferenceData.referenceDataCategoryCodesCode);

router.get('*', ctrlReferenceData.defaulError);

module.exports = router;
