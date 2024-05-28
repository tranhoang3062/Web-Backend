const ordersController = require("../controllers/ordersController");
const isAuth = require('../middlewares/isAuth');

const api_orders = (app) => {
  app.get('/api/orders', isAuth, ordersController.getAll);
  app.get('/api/orders/:id', isAuth, ordersController.getById);
  app.get('/api/orders/user/:user_id', isAuth, ordersController.getByUser);

  app.post('/api/orders', isAuth, ordersController.create);

  app.put('/api/orders/:id', isAuth, ordersController.update);
  
  app.delete('/api/orders/:id', isAuth, ordersController.delete);
}

module.exports = api_orders;