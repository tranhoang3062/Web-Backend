const wishlistsController = require("../controllers/wishlistsController");
const isAuth = require('../middlewares/isAuth');

const api_wishlist = (app) => {
    app.get('/api/wishlist', isAuth, wishlistsController.getAll);
    app.get('/api/wishlist/:id', isAuth, wishlistsController.getById);
    app.get('/api/wishlist/user/:user_id', isAuth, wishlistsController.getByUserId);
    app.get('/api/wishlist/product/:product_id', wishlistsController.getByProductId);

    app.post('/api/wishlist', isAuth, wishlistsController.create);

    app.put('/api/wishlist/:id', isAuth, wishlistsController.update);

    app.delete('/api/wishlist/:id', isAuth, wishlistsController.delete);
}

module.exports = api_wishlist;