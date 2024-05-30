const upload = require('../configs/uploadFile');
const userControllers = require("../controllers/usersController");
const isAuth = require('../middlewares/isAuth');

const api_user = (app) => {
    app.get('/api/user', userControllers.getAll);
    app.get('/api/user/:id', isAuth, userControllers.getById);
    app.get('/api/refresh-token', userControllers.refreshToken);

    app.post('/api/user/register', upload.single('upload-file'), userControllers.register);
    app.post('/api/user/login', userControllers.login);
    app.put('/api/user/:id', isAuth, upload.single('upload-file'), userControllers.update);

    app.delete('/api/user/:id', isAuth, userControllers.delete);
}

module.exports = api_user;