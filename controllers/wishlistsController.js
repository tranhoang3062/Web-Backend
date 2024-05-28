const wishlistsModel = require("../models/wishlists.model");

const wishlistsController = {
    getAll: (req, res) => {
        wishlistsModel.getAllWishlist(req.query, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getById: (req, res) => {
        wishlistsModel.getWishlistById(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getByUserId: (req, res) => {
        wishlistsModel.getWishlistByUserId(req.params.user_id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getByProductId: (req, res) => {
        wishlistsModel.getWishlistByProductId(req.params.product_id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    create: (req, res) => {
        wishlistsModel.createWishlist(req.body, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    update: (req, res) => {
        wishlistsModel.updateWishlist(req.params.id, req.body, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    delete: (req, res) => {
        wishlistsModel.deleteWishlist(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    }
}

module.exports = wishlistsController;