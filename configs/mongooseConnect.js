const mongoose= require('mongoose');
const environement = require('./environement');
function mongooseConnection(cb){
    mongoose.promise= global.promise;
    
    mongoose.connect(environement.database ,{useNewUrlParser: true});
    mongoose.connection.on('connected',()=>{
    console.log('connection database: mongodb://localhost/graphqlReact'); 
    });
    mongoose.connection.once('open',()=>{
         cb ();
    });
    mongoose.connection.on('error',()=>{
    throw new Error('Unable to connect to database:');
    });
     mongoose.connection.on('disconnected',()=>{
         console.log(`database is disconnected: ${environement.database}`);
     });

}
module.exports = mongooseConnection;