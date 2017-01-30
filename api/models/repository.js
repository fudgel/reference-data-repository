var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    id: String,
    category: String,
    version: String,
    description: String,
    parentCategory: String
});

var codeSchema = new mongoose.Schema ({
    id: String,
    category: String,
    version: String,
    parentCode: String,
    canonicalCode: String,
    description: String,
    system1Code: String,
    system2Code: String
});

mongoose.model('Categories', categorySchema);
mongoose.model('Codes', codeSchema);
