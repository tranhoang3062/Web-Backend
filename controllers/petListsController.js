const petListsModel = require('../models/petlists.model');

const petListsController = {
    getAll: (req, res) => {
        petListsModel.getAllPetlist(req.query, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getById: (req, res) => {
        petListsModel.getPetlistById(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getByName: (req, res) => {
        petListsModel.getSearchPetlistByName(req.params.name, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    create: (req, res) => {
        petListsModel.createPetlist(req.body, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    update: (req, res) => {
        petListsModel.updatePetlist(req.params.id, req.body, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    softDelete: (req, res) => {
        petListsModel.softDeletePetlist(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    delete: (req, res) => {
        petListsModel.deletePetlist(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    }
}

module.exports = petListsController;