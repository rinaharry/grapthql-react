
 const Event = require('../../models/event');
 const User = require('../../models/user');
 const { dateToString } = require('../../helper/date');
 const {user} = require ('./merge')

module.exports = {

    events: async  () => {
        try {
          const events = await Event.find()
            return  events.map(event => {   
               return {
                 ...event._doc, _id: event.id,
                 creator : user(event.creator),
                 date: dateToString(event.date)
                 }
            })} catch (error) {
            throw error
        }
     },
    
     createEvent:  async (args, req) => {
       // console.log(req.body)
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
       
      try {
          const id = "5d6f9e298e63651e50b71498";
          const  event = new Event({
                 title: args.eventInput.title,
                 description : args.eventInput.description,
                 price: + args.eventInput.price, 
                 creator: id, 
                 date :dateToString(args.eventInput.date),
            })
           const newEvent = await event.save(); 
           const userF = await User.findById(id);
                if (!userF) {
                     throw new Error('user not found')
                 } else { 
                     userF.createEvents.push(event)
                     const useEvent = await userF.save()     
                  }
                    return {...newEvent._doc, creator: user(newEvent.creator)}
                } catch (err) {
                    throw  err
            } 
        },
}