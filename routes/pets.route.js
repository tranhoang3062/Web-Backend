const upload = require("../configs/uploadFile");
const petsController = require("../controllers/petsController");
const isAuth = require('../middlewares/isAuth');

const api_pets = (app) => {
  app.get('/api/pets', petsController.getAll);
  app.get('/api/pets/:id', petsController.getById);
  app.get('/api/pets/search/:name', petsController.getByName);
  app.get('/api/pets/petlist/:pet_list_id', petsController.getByPetlistId);

  app.post('/api/pets', isAuth, upload.array('upload-files', 10), petsController.create);

  app.put('/api/pets/:id', isAuth, upload.array('upload-files', 10), petsController.update);

  app.delete('/api/pets/:id', isAuth, petsController.delete);
}

module.exports = api_pets;