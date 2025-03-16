const mdb = require('mongoose')

const appointmentsSchema=mdb.Schema({
    hospital:String,
    date:String,
    reason:String,
})

const AppointmentCard = mdb.model("AppointmentCard",appointmentsSchema)
module.exports = AppointmentCard 