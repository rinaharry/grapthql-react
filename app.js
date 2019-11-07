const express =  require('express');
const bodyParser = require ('body-parser');
const graphqlHttp =  require ('express-graphql');
const { buildSchema}  = require ('graphql');

  const app =  express();
  app.use(bodyParser.json());
  app.listen(3002,()=>{
    console.log("app listen in port 3002")
})
const events= []

  app.use('/graphql',graphqlHttp({
       schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            price : Float!
            date :  String!
        }
        input EventInput {
            title: String!
            price: Float!
            date:  String!
        }
         type RootQuery {
             events: [Event!]!
         }

         type RootMutation {
            createEvent(eventinput: EventInput): Event

         }
         schema {
             query: RootQuery
             mutation: RootMutation
         }
       `
       ),
       rootValue: {
        events: () =>{
            return events
        },
        createEvent : (args)=>{
        
            const newevent= {
                _id: Math.random().toString(),
                title: args.eventinput.title,
                price: args.eventinput.price,
                date: args.eventinput.date
            }
            events.push(newevent)
            return newevent
            
        }
       },
      graphiql: true
  }));

 