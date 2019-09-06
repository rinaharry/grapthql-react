const express      = require ('express');
const bodyParse    = require ('body-parser')

const graphqlhttp  = require("express-graphql");
const dbconnect    = require ('./configs/mongooseConnect')
const environement = require ('./configs/environement');
const graphschema  = require ('./grapthql/shema')
const rootResolver = require ('./grapthql/resolver')
const islogin      = require('./midelware/isloggin')

const app = express();
app.use(bodyParse.json());
app.use(islogin)

dbconnect(() => {
    const srv = app.listen(environement.port,()=> {
    console.log(`on a bien ecoute sur le port ${environement.port}`);
   })
})

app.use('/graphql', graphqlhttp({
    schema: graphschema,
    rootValue:  rootResolver,
    graphiql: true
   },)
)
