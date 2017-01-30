var mongoose = require('mongoose');
var Categories = mongoose.model('Categories');
var Codes = mongoose.model('Codes');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET the Reference Data category List */
module.exports.referenceDataCategoryList = function(req, res) {
   Categories.find({},req.query.fields,function(err, categoryList){
     //console.log(categoryList);
     if(!categoryList) {
       sendJSONresponse(res, 404, {"message":"No categories found! - that doesn't seem right check the DB"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {categoryList});
   });
};

/* GET the details of a Reference Data category details by the name (categoryName) and version (categoryVersion) */
module.exports.referenceDataCategoryDetails = function(req, res) {
 if (req.params.categoryName && req.params.categoryVersion) {
   Categories.aggregate([{$match:{"category":req.params.categoryName,"version":req.params.categoryVersion}},{$lookup:{from:"codes",localField:"category",foreignField:"category",as:"codes"}}], function (err, category) {
     if(!category) {
       sendJSONresponse(res, 404, {"message":"No reference data category record found for categoryName("+req.params.categoryVersion+") and categoryVersion("+req.params.categoryVersion+")"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {category});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"categoryName or/and categoryVersion param missing"});
 }
};

/* GET the details of a Reference Data category codes by the name (categoryName) and version (categoryVersion) */
module.exports.referenceDataCategoryCodes = function(req, res) {
 if (req.params.categoryName && req.params.categoryVersion) {
   var query = {
     "category":req.params.categoryName,
     "version":req.params.categoryVersion
   }
   if (req.query.parentCode) {
     query.parentCode=req.query.parentCode;
   }
   
   var options = {
     "fields":req.query.fields
   }
   if (req.query.offset) {
     options.offset=req.query.offset;
   }
   if (req.query.limit) {
     options.limit=req.query.limit;
   }

   Codes.find(query,req.query.fields,function(err, codes){
     if(!codes) {
       sendJSONresponse(res, 404, {"message":"No codes found for categoryName("+req.params.categoryVersion+") and categoryVersion("+req.params.categoryVersion+")"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {codes});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"categoryName or/and categoryVersion param missing"});
 }
}; 

/* GET the details of a Reference Data category codes by the name (categoryName) and version (categoryVersion) */
module.exports.referenceDataCategoryCodesCode = function(req, res) {
 if (req.params.categoryName && req.params.categoryVersion && req.params.code) {
   
   var query = {
     "category":req.params.categoryName,
     "version":req.params.categoryVersion
   }
   if (req.query.sourceCodeTypeQualifer){
     var parameterName = req.query.sourceCodeTypeQualifer;
     query[parameterName]=req.params.code;
   } else {
     query.canonicalCode=req.params.code;
   }
   
   var options = {
     "fields":req.query.fields
   }
   if (req.query.offset) {
     options.offset=req.query.offset;
   }
   if (req.query.limit) {
     options.limit=req.query.limit;
   }
   
   Codes.find(query,req.query.fields,function(err, codes){
     if(!codes) {
       sendJSONresponse(res, 404, {"message":"No codes found for categoryName("+req.params.categoryVersion+") and categoryVersion("+req.params.categoryVersion+")"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {codes});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"categoryName or/and categoryVersion param missing"});
 }
};