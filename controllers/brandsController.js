const brandsModel = require("../models/brands.model");
const generateLinkFiles = require('../helpers/generateLinkFiles');
const unlinkFiles = require('../helpers/unlinkFile');

const brandsController = {
    getAll: (req, res) => {
        brandsModel.getAllBrands(req.query, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getById: (req, res) => {
        brandsModel.getBrandsById(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getByName: (req, res) => {
        brandsModel.getSearchBrandsByName(req.params.name, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    create: (req, res) => {
        req.body = { ...req.body, thumbnail: generateLinkFiles(req.file) };
        brandsModel.createBrands(req.body, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    update: (req, res) => {
        if (req.file) {
            brandsModel.getThumbnailBrands(req.params.id, (err, data) => {
                if (!err) {
                    unlinkFiles(data[0].thumbnail);
                }
            });
            req.body = { ...req.body, thumbnail: generateLinkFiles(req.file) };
        }
        brandsModel.updateBrands(req.params.id, req.body, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    delete: async (req, res) => {
        brandsModel.getThumbnailBrands(req.params.id, (err, data) => {
            if (!err) {
                unlinkFiles(data[0].thumbnail);
            }
        });
        brandsModel.deleteBrands(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    }
}

module.exports = brandsController;