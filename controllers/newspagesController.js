const generateLinkFiles = require('../helpers/generateLinkFiles');
const unlinkFiles = require('../helpers/unlinkFile');
const newspagesModel = require('../models/newspages.model');

const newspagesController = {
    getAll: (req, res) => {
        newspagesModel.getAllNewspage(req.query, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getById: (req, res) => {
        newspagesModel.getNewspageById(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getByTitle: (req, res) => {
        newspagesModel.getNewspageByTitle(req.params.title, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    create: (req, res) => {
        req.body = { ...req.body, thumbnail: generateLinkFiles(req.file) };
        newspagesModel.createNewspage(req.body, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    update: (req, res) => {
        if (req.file) {
            newspagesModel.getThumbnailNewspage(req.params.id, (err, data) => {
                if (!err) {
                    unlinkFiles(data[0].thumbnail);
                }
            });
            req.body = { ...req.body, thumbnail: generateLinkFiles(req.file) };
        }
        newspagesModel.updateNewspage(req.params.id, req.body, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    delete: (req, res) => {
        newspagesModel.getThumbnailNewspage(req.params.id, (err, data) => {
            if (!err) {
                unlinkFiles(data[0].thumbnail);
            }
        });
        newspagesModel.deleteNewspage(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    }
}

module.exports = newspagesController;