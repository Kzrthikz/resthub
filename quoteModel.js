var mongoose = require('mongoose');
// Setup schema
var quoteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Quote model
var Quote = module.exports = mongoose.model('quote', quoteSchema);
module.exports.get = function (callback, limit) {
    Quote.find(callback).limit(limit);
}