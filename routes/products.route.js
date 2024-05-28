const upload = require("../configs/uploadFile");
const productsController = require("../controllers/productsController");
const isAuth = require('../middlewares/isAuth');

const api_products = (app) => {
  app.get('/api/products', productsController.getAll);
  app.get('/api/products/:id', productsController.getById);
  app.get('/api/products/search/:name', productsController.getByName);
  app.get('/api/products/category/:category_id', productsController.getByCategoryId);
  app.get('/api/products/filter/query', productsController.getProductFilter);
  app.get('/api/products/slug_category/:slug_category', productsController.getProductsBySlugCategory);

  app.post('/api/products', isAuth, upload.array('upload-files', 10), productsController.create);

  app.put('/api/products/:id', isAuth, upload.array('upload-files', 10), productsController.update);
  
  app.delete('/api/products/:id', isAuth, productsController.delete);
}

module.exports = api_products;