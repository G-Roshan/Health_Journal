const mdb = require('mongoose')

const historySchema=mdb.Schema({
    text:String,
    reason:String,
    date:String,
    image:String,  
    
})

const HistoryCard = mdb.model("HistoryCard",historySchema)
module.exports = HistoryCard 

