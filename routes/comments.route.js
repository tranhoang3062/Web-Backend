const upload = require("../configs/uploadFile");
const commentsController = require("../controllers/commentsController");
const isAuth = require('../middlewares/isAuth');

const api_comments = (app) => {
    app.get('/api/comments', commentsController.getAll);
    app.get('/api/comments/:id', commentsController.getById);
    app.get('/api/comments/user/:user_id', isAuth, commentsController.getByUserId);
    app.get('/api/comments/product/:product_id', commentsController.getByProductId);

    app.post('/api/comments', isAuth, upload.array('upload-files', 10), commentsController.create);

    app.put('/api/comments/:id', isAuth, upload.array('upload-files', 10), commentsController.update);

    app.delete('/api/comments/:id', isAuth, commentsController.delete);
}

module.exports = api_comments;