  
const authResolver = require('./user');
const eventsResolver = require('./event');
const bookingResolver = require('./booking');
const logginResolver = require ('./login')

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...logginResolver
};

module.exports = rootResolver;