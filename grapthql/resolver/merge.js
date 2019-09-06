const bcrypt = require ('bcryptjs');
const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helper/date');

async  function event (eventId) {
   try {
      const events = await Event.find({_id: {$in:eventId}})
        return events.map(event => {
        return {...event._doc, _id: event.id,date:dateToString(event.date),  creator: user.bind(this,event.creator)}
     })
    } catch (error) {
      throw  error 
   }
 } 
 
async function singlEvent(eventId) {

 try {
    const event = await Event.findOne({_id:eventId})
       return {...event._doc, _id: event.id, creator: user.bind(this,event.creator)}
 } catch (error) {
    throw error 
}
} 
 
//  const user =  async  userId => {

//    try {
//       const user = await User.findById(userId)
//       console.log('usrer',user)
//         return {...user._doc, _id: user.id ,createEvents: event.bind(this, user.createEvents)}
//       } catch (error) {
//          throw error
//   }
//  }
   async function user (userId) {

    try {
       const user = await User.findById(userId)
       console.log('usrer',user)
         return {...user._doc, _id: user.id ,password:null,createEvents: event.bind(this, user.createEvents)}
       } catch (error) {
          throw error
   }
  }
  module.exports = {user,event, singlEvent};