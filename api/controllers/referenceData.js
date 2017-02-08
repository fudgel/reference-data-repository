var mongoose = require('mongoose');
var Categories = mongoose.model('Categories');
var Codes = mongoose.model('Codes');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


/* GET the Reference Data category List */
module.exports.referenceDataCategoryList = function(req, res) {
   Categories.find({},req.query.fields)
             .skip(parseInt(req.query.offset))
             .limit(parseInt(req.query.limit))
             .exec()
             .then((categoryList) => {
                // if no data - then respond with error
                if(!categoryList) {
                  sendJSONresponse(res, 204, {"message":"No categories found! - that doesn't seem right check the DB"});
                  return;
                }
                // else send data
                sendJSONresponse(res, 200, {categoryList});
             })
             .catch((err) => {
               // if error - respond with error details
               sendJSONresponse(res, 500, err);
             });
};

/* GET the details of a Reference Data category details by the name (categoryName) and version (categoryVersion) */
module.exports.referenceDataCategoryDetails = function(req, res) {
  if (req.params.categoryName) {
    
    // Construct the query array for mongodb aggregate()
    var query = {
     "category":req.params.categoryName
    }

    if (req.query.categoryVersion) {
      query.version=req.query.categoryVersion;
    }

    Categories.aggregate([{$match:query},{$lookup:{from:"codes",localField:"category",foreignField:"category",as:"codes"}}])
              .exec()
              .then ((categories) => {
                if(!categories) {
                  sendJSONresponse(res, 204, {"message":"No reference data category record found for categoryName("+req.params.categoryName+")"});
                  return;
                }
                sendJSONresponse(res, 200, {categories});
              })
              .catch((err) => {
                sendJSONresponse(res, 500, err);
              });
 } else {
   sendJSONresponse(res, 400, {"message":"Mandatory categoryName param missing"});
 }
};

/* GET the details of a Reference Data category codes by the name (categoryName) and version (categoryVersion) */
module.exports.referenceDataCategoryCodes = function(req, res) {
 if (req.params.categoryName) {
   var query = {
     "category":req.params.categoryName
   }
   if (req.query.categoryVersion) {
      query.version=req.query.categoryVersion;
   }
   if (req.query.parentCode) {
     query.parentCode=req.query.parentCode;
   }
   
   Codes.find(query,req.query.fields)
        .skip(parseInt(req.query.offset))
        .limit(parseInt(req.query.limit))
        .exec()
        .then((codes) => {
          if(!codes) {
            sendJSONresponse(res, 204, {"message":"No codes found for categoryName("+req.params.categoryName+")"});
            return;
          }
          sendJSONresponse(res, 200, {codes}); 
        })
        .catch((err) => {
          sendJSONresponse(res, 500, err);
        });
  } else {
    sendJSONresponse(res, 400, {"message":"Mandatory categoryName param missing"});
  };
};     

/* GET the details of a Reference Data category codes by the name (categoryName) and version (categoryVersion) */
module.exports.referenceDataCategoryCodesCode = function(req, res) {
 if (req.params.categoryName && req.params.code) {
   
   var query = {
     "category":req.params.categoryName
   }
   if (req.query.categoryVersion) {
      query.version=req.query.categoryVersion;
   }
   if (req.query.sourceCodeTypeQualifer){
     var parameterName = req.query.sourceCodeTypeQualifer;
     query[parameterName]=req.params.code;
   } else {
     query.canonicalCode=req.params.code;
   }
   
   Codes.find(query,req.query.fields)
        .skip(parseInt(req.query.offset))
        .limit(parseInt(req.query.limit))
        .exec()
        .then((codes) => {
          if(!codes) {
            sendJSONresponse(res, 204, {"message":"No codes found for categoryName("+req.params.categoryName+")"});
          }
          sendJSONresponse(res, 200, {codes});
        })
        .catch((err) => {
          sendJSONresponse(res, 500, err);
        });
 } else {
   sendJSONresponse(res, 400, {"message":"Mandatory categoryName param missing"});
 }
};
