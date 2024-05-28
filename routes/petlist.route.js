const petListsController = require('../controllers/petListsController');
const isAuth = require('../middlewares/isAuth');

const api_petlists = (app) => {
  app.get('/api/petlists', petListsController.getAll);
  app.get('/api/petlists/:id', petListsController.getById);
  app.get('/api/petlists/search/:name', petListsController.getByName);
  
  app.post('/api/petlists', isAuth, petListsController.create);
  
  app.put('/api/petlists/:id', isAuth, petListsController.update);
  app.put('/api/petlists/softdelete/:id', isAuth, petListsController.softDelete);
  
  app.delete('/api/petlists/:id', isAuth, petListsController.delete);
} 

module.exports = api_petlists;