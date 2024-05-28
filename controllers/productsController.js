const generateLinkFiles = require('../helpers/generateLinkFiles');
const unlinkFiles = require('../helpers/unlinkFile');
const productsModel = require('../models/products.model');

const productsController = {
    getAll: (req, res) => {
        productsModel.getAllProduct(req.query, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getById: (req, res) => {
        productsModel.getProductById(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getByName: (req, res) => {
        productsModel.getProductByName(req.params.name, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getByCategoryId: (req, res) => {
        productsModel.getProductByCategoryId(req.params.category_id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getProductFilter: (req, res) => {
        productsModel.getProductFilter(req.query, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getProductsBySlugCategory: (req, res) => {
        productsModel.getProductsBySlugCategory(req.params.slug_category, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    create: (req, res) => {
        req.body = { ...req.body, resources: generateLinkFiles(req.files) };
        productsModel.createProduct(req.body, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    update: (req, res) => {
        if (req.files.length) {
            productsModel.getResourcesProduct(req.params.id, (err, data) => {
                if (!err) {
                    unlinkFiles(data[0].resources);
                }
            });
            req.body = { ...req.body, resources: generateLinkFiles(req.files) };
        }
        productsModel.updateProduct(req.params.id, req.body, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    delete: (req, res) => {
        productsModel.getResourcesProduct(req.params.id, (err, data) => {
            if (!err) {
                unlinkFiles(data[0].resources);
            }
        });
        productsModel.deleteProduct(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    }
}

module.exports = productsController;