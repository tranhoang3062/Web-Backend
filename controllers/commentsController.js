const generateLinkFiles = require('../helpers/generateLinkFiles');
const unlinkFiles = require('../helpers/unlinkFile');
const commentsModel = require('../models/comments.model');

const commentsController = {
    getAll: (req, res) => {
        commentsModel.getAllComment(req.query, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getById: (req, res) => {
        commentsModel.getCommentById(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getByUserId: (req, res) => {
        commentsModel.getCommentByUserId(req.params.user_id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getByProductId: (req, res) => {
        commentsModel.getCommentByProductId(req.params.product_id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    create: (req, res) => {
        if (req.files.length !== 0) req.body = { ...req.body, resources: generateLinkFiles(req.files) };
        commentsModel.createComment(req.body, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    update: (req, res) => {
        if (req.files.length) {
            commentsModel.getResourcesComment(req.params.id, (err, data) => {
                if (!err) {
                    unlinkFiles(data[0].resources);
                }
            });
            req.body = { ...req.body, resources: generateLinkFiles(req.files) };
        }
        commentsModel.updateComment(req.params.id, req.body, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    delete: (req, res) => {
        commentsModel.getResourcesComment(req.params.id, (err, data) => {
            if (!err) {
                unlinkFiles(data[0].resources);
            }
        });
        commentsModel.deleteComment(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    }
}

module.exports = commentsController;