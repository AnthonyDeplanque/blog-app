const usersRouter = require('./users');

const router = (app) =>{
  app.usersRouter('/api/users', usersRouter);
}

module.exports={router};