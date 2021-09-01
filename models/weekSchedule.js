const mongoose = require('mongoose');
const { FoodSchema } = require('./commonModels');

const Content = mongoose.Schema({
    item : FoodSchema,
    quantity : { type : Number, default : 1 }
})

const Datetime = mongoose.Schema({
    date : Date,
    time : String,
    active : { type : Boolean, default : true }
})

const WeekScheduleSchema = mongoose.Schema({
    id : { type : String, unique : true },
    customer_id : { type : String },
    breakfast : [Content],
    breakfastTimetable : [Datetime],
    lunch : [Content],
    lunchTimetable : [Datetime],
    dinner : [Content],
    dinnerTimetable : [Datetime]
}, {timestamps : true})

const WeekSchedule = mongoose.model('weekschedule', WeekScheduleSchema);

module.exports = {
    WeekSchedule
}

// 'id' should be generated with prefix 'WS'
// a new WeekSchedule is created when a customer schedules his/her meals for whole week.
// 'customer_id' is the id of the customer who created this schedule.
// 'breakfast', 'lunch' and 'dinner' are the array of food items and their quantities which were selected by the user at the time of scheduling.
// 'breakfastTimetable', 'lunchTimetable' and 'dinnerTimetable' are the date, time and status, which were scheduled by the user.
// each of the '_Timetable' should hold exactly 7 itmes corresponding to each day of a week
// 'status' in 'Datetime' is true when the order is on, can be turned of by the user at any time.