const mongoose = require ('mongoose');

const Schema =  mongoose.Schema;
const UserShema = new Schema({
    email:{
        type:String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
   createEvents:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
       }
   ]
})
module.exports = mongoose.model('User', UserShema);
