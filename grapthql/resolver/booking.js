 const Event = require('../../models/event');
 const Booking = require ('../../models/booking')
 const { dateToString } = require('../../helper/date');
 const {singlEvent , user} = require ('./merge')

module.exports = {

  bookings: async () => {
        try {
           const bookings = await Booking.find()
           return bookings.map(booking => {
           return {
            ... booking._doc,
            _id: booking.id,
            user: user.bind(this,booking.user),
            event : singlEvent.bind(this, booking.event),
            createdAt: dateToString (booking.createdAt),
            updatedAt: dateToString (booking.updatedAt),
           }
         })
        } catch (err) {
          throw err
        }
    },
    
  bookEvent: async (args)=> {
      try {
         const createBooking = await Event.findOne({_id: args.eventId});
         const booking = new Booking({
           user :"5d70967e5e44840aa4f48edd",
           event: createBooking
         })
         const result = await booking.save()
         return {
           ... result._doc,
           _id: result.id,
           createdAt: dateToString (result.createdAt),
           updatedAt: dateToString (result.updatedAt),
    
         };
        } catch (err){
          throw err
        }
      },
    
  cancelBooking: async (args) => {
        try {
          const booking = await Booking.findById(args.bookingId).populate('event')
          const event= {
            ...booking._doc.event._doc, 
             creator: user.bind(this, booking.event.creator)
         }; 
         console.log(event)
          if(booking){
            await Booking.deleteOne({_id:args.bookingId});
          } else {
            throw new Error ('booking not existe or deleted')
          }
                  
          return event
                
        } catch (error) {
          throw error
        }
    
       } ,
}