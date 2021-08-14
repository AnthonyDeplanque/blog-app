const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const newsRouter = require('./news');
const imagesRouter = require('./images');
const imagesUploadRouter = require('./imageFiles');

const router = (app) =>{
  app.use('/api/users', usersRouter);
  app.use('/api/categories', categoriesRouter);
  app.use('/api/news', newsRouter);
  app.use('/api/images', imagesRouter);
  app.use('/test/upload', imagesUploadRouter);
}

module.exports={router};