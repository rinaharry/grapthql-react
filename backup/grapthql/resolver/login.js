const User = require('../../models/user')
const bcrypt= require ('bcryptjs')
const jwt = require ('jsonwebtoken')

module.exports = {
    loggin : async ({email, password}) => {
        const user = await User.findOne({email: email})
        if(! user){
            throw new Error ('user not existe')
        } else{
           const equal = await bcrypt.compare(password,user.password)
           // console.log(equal)
           if (! equal){
               throw new Error ('invalide password')
           }else {
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                'somesupersecretkey',
                {
                  expiresIn: '1h'
                }
              );
              return { userId: user.id, token: token, tokenExpiration: 1 };
           }

        }
      
    }
}