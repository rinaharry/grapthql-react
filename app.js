const express = require ('express');
const bodyParse = require ('body-parser')
const app = express();
const graphqlhttp = require("express-graphql");
const {buildSchema} = require ("graphql");
const dbconnect = require ('./configs/mongooseConnect')
const environement = require ('./configs/environement');
const Event = require('./models/event')
const User = require('./models/user')


app.use(bodyParse.json());

dbconnect(() => {
    const srv = app.listen(environement.port,()=> {
    console.log(`on a bien ecoute sur le port ${environement.port}`);
   })
})

const events= [];
app.use('/graphql', graphqlhttp({
    schema: buildSchema (`
       type Event {
         _id: ID!
         title: String!
         description : String!
         price: Float!
         date : String!
       }
      type User {
          _id: ID!
          email: String!
          password: String  
      }
      input UserInput {
         email: String!
         password: String 
      }

      input EventInput {
            title: String!
            description : String!
            price: Float!
            date : String!
        }
       type RootQuery{
           events : [Event!]!
           users: [User!]!
       }

       type RootMutation {
           createEvent(eventInput: EventInput): Event
           createUser (userInput: UserInput ): User
       }

       schema {
           mutation: RootMutation,
           query: RootQuery
       }
    `
    ),

  rootValue:{
    
       events: () => {
       return  Event.find().then(
            res => {
                return res
            }
        )
        .catch(err=>{
            console.log("errr")
        })
        },
        createEvent: (args) => {
          
            const event = new Event({
                title: args.eventInput.title,
                description : args.eventInput.description,
                price: + args.eventInput.price, 
                date :new Date(args.eventInput.date) 
            })
            return event.save().then(
                res => {
                  return {...res._doc}
                }

            ).catch(err=>{
                console.log(err)
            });
            
           },
           users: async () => {
            try {
              const users = await User.find();
                  return users
            }
            catch(err){
                throw err
            }

           },
           createUser : async (args, req,res) => {
               newUser  =  new User({
                   ...args.userInput
               })

               try {
                    const user = await newUser.save();
                    console.log(newUser)
                    return {...user._doc}
                }

               catch(err){
                    throw err
                }  
          }  
  },
  graphiql: true

})

)
