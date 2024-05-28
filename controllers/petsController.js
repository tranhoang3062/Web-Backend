const petsModel = require("../models/pets.model");
const generateLinkFiles = require('../helpers/generateLinkFiles');
const unlinkFiles = require('../helpers/unlinkFile');

const petsController = {
    getAll: (req, res) => {
        petsModel.getAllPets(req.query, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getById: (req, res) => {
        petsModel.getPetsById(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getByName: (req, res) => {
        petsModel.getPetsByName(req.params.name, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getByPetlistId: (req, res) => {
        petsModel.getPetsByPetlistId(req.params.pet_list_id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    create: (req, res) => {
        req.body = { ...req.body, resources: generateLinkFiles(req.files) };
        petsModel.createPets(req.body, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    update: (req, res) => {
        if (req.files.length) {
            petsModel.getResourcesPets(req.params.id, (err, data) => {
                if (!err) {
                    unlinkFiles(data[0].resources);
                }
            });
            req.body = { ...req.body, resources: generateLinkFiles(req.files) };
        }
        petsModel.updatePets(req.params.id, req.body, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    delete: async (req, res) => {
        petsModel.getResourcesPets(req.params.id, (err, data) => {
            if (!err) {
                unlinkFiles(data[0].resources);
            }
        });
        petsModel.deletePets(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    }
}

module.exports = petsController;