const categoriesController = require('../controllers/categoriesController');
const isAuth = require('../middlewares/isAuth');

const api_categories = (app) => {
    app.get('/api/categories', categoriesController.getAll);
    app.get('/api/categories/:id', categoriesController.getById);
    app.get('/api/categories/search/:name', categoriesController.getByName);
    // app.get('/api/categories/parent', isAuth, categoriesController.getParent);

    app.post('/api/categories', isAuth, categoriesController.create);

    app.put('/api/categories/:id', isAuth, categoriesController.update);
    app.put('/api/categories/softdelete/:id', isAuth, categoriesController.softDelete);

    app.delete('/api/categories/:id', isAuth, categoriesController.delete);
}

module.exports = api_categories;