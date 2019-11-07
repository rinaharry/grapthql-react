 const bcrypt = require ('bcryptjs');
 const Event = require('../../models/event');
 const User = require('../../models/user');
 
module.exports = {

users: async () => {
        try {
          const users = await User.find().select('-password');
          return users.map(user => {
              return {...user._doc, vazo : "okok"}
          })

        } catch (err) {
            throw err
        }
}, 

createUser: async (args) => {
    
  try {
       const userExiste = await User.findOne({email:args.userInput.email})
        if (userExiste) {
             throw new Error('User Already Existe')
       } else { bcryptpass = await bcrypt.hash(args.userInput.password, 10)
             args.userInput.password = bcryptpass
             newUser  =  new User({
                    ...args.userInput
               })
       const user = await newUser.save();
                return {...user._doc, password: null}
       } 
       } catch (err) {
                throw err
        }  
 }  
}