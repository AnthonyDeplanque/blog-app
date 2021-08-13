const usersRouter = require('./users');
const categoriesRouter = require('./categories');

const router = (app) =>{
  app.use('/api/users', usersRouter);
  app.use('/api/categories', categoriesRouter);
}

module.exports={router};