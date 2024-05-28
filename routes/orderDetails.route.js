const orderDetailsController = require("../controllers/orderDetailsController");
const isAuth = require('../middlewares/isAuth');

const api_ordersdetail = (app) => {
  app.get('/api/order-detail', isAuth, orderDetailsController.getAll);
  app.get('/api/order-detail/order/:order_id', isAuth, orderDetailsController.getByOrderId);
  app.get('/api/order-detail/user/:user_id', isAuth, orderDetailsController.getByUserId);

  app.post('/api/order-detail', isAuth, orderDetailsController.create);

  app.put('/api/order-detail/:id', isAuth, orderDetailsController.update);
  
  app.delete('/api/order-detail/:id', isAuth, orderDetailsController.delete);
  app.delete('/api/order-detail/order/:order_id', isAuth, orderDetailsController.deleteByOrderId);
}

module.exports = api_ordersdetail;