const upload = require("../configs/uploadFile");
const brandsController = require("../controllers/brandsController");
const isAuth = require('../middlewares/isAuth');

const api_brands = (app) => {
    app.get('/api/brands', brandsController.getAll);
    app.get('/api/brands/:id', brandsController.getById);
    app.get('/api/brands/search/:name', brandsController.getByName);

    app.post('/api/brands', isAuth, upload.single('upload-file'), brandsController.create);

    app.put('/api/brands/:id', isAuth, upload.single('upload-file'), brandsController.update);

    app.delete('/api/brands/:id', isAuth, brandsController.delete);
}

module.exports = api_brands;