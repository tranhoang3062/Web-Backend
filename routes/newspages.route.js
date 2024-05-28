const upload = require("../configs/uploadFile");
const newspagesController = require("../controllers/newspagesController");
const isAuth = require('../middlewares/isAuth');

const api_newspages = (app) => {
  app.get('/api/newspages', newspagesController.getAll);
  app.get('/api/newspages/:id', newspagesController.getById);
  app.get('/api/newspages/search/:title', newspagesController.getByTitle);

  app.post('/api/newspages', isAuth, upload.single('upload-file'), newspagesController.create);

  app.put('/api/newspages/:id', isAuth, upload.single('upload-file'), newspagesController.update);
  
  app.delete('/api/newspages/:id', isAuth, newspagesController.delete);
}

module.exports = api_newspages;