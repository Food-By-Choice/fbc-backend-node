const mongoose = require('mongoose');
const { FoodSchema, ProductSchema } = require('./commonModels');

const Content = mongoose.Schema({
    item : FoodSchema,
    quantity : { type : Number, default : 1 }
})

const mealScheduleSchema = mongoose.Schema({
    id : { type : String, unique : true },
    customer_id : String,
    contents : [Content],
    scheduleDate : Date,
    scheduleTime : String
}, {timestamp : true})

const MealSchedule = mongoose.model('mealschedule', mealScheduleSchema);

module.exports = {
    MealSchedule
}

// 'id' should be generated with prefix 'MS'
// a new MealSchedule is created when a customer schedules a meal.
// 'customer_id' is the id of the customer who created this schedule.
// 'contents' are the food items and their quantities scheduled by customer
// 'scheduleDate' and 'scheduleTime' are date and time of delivery.
// date should be >= today, and time should be >= now   