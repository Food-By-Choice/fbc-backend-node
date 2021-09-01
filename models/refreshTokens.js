const mongoose = require('mongoose');

const RefreshTokenSchema = mongoose.Schema({
    token : String
}, { timestamp : true })

const RefTokens = mongoose.model('refreshtoken', RefreshTokenSchema)

module.exports = {
    RefTokens    
}