const mdb = require('mongoose')

const symptomsSchema=mdb.Schema({
    symptom:String,
    severity:String,
    duration:Number,
    notes:String,
})

const SymptomCard = mdb.model("SymptomCard",symptomsSchema)
module.exports = SymptomCard 