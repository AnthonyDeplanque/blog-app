const usersRouter = require('./users');

const router = (app) =>{
  app.use('/api/users', usersRouter);
}

module.exports={router};