const log = console.log;
const server = require('server');
const { MongoClient } = require('mongodb');
const config = require('./api/config');
const router = require('./api/router');

MongoClient.connect(config.mongodb_url, { useNewUrlParser: true }, function(
  err,
  mongoClient
) {
  if (err) throw err;
  var db = mongoClient.db(config.database_name);
  log('Connected to Database');

  server(router);
  //   .then(ctx => {
  //     log(`Server launched on http://localhost:${ctx.options.port}/`);
  //   });
});
