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

app.all('/*', (req, res, next)=> {
    
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});


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
