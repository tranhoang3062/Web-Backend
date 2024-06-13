require('dotenv').config();
const userModels = require('../models/users.model');
const generateToken = require('../helpers/generateToken');
const generateLinkFiles = require('../helpers/generateLinkFiles');
const bcrypt = require('bcrypt');
const saltRount = 10;
const jwt = require('jsonwebtoken');

const userControllers = {
    getAll: (req, res) => {
        userModels.getAllUser(req.query, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    getById: (req, res) => {
        userModels.getUserById(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    register: (req, res) => {
        bcrypt.genSalt(saltRount, (err, salt) => {
            if (err) {
                res.status(500).json(err);
            } else {
                bcrypt.hash(req.body.password, salt, (err, hastedPass) => {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        req.body.password = hastedPass;
                        if (req.file) req.body.thumbnail = generateLinkFiles(req.file);
                        userModels.register(req.body, (err, data) => {
                            if (err) {
                                res.status(500).json(err);
                            } else {
                                res.status(200).json(data);
                            }
                        });
                    }
                });
            }
        });
    },

    login: (req, res) => {
        userModels.checkUser(req.body.email, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                if (!data[0]) {
                    res.status(401).json({ message: "Account does not exist!" });
                } else {
                    bcrypt.compare(req.body.password, data[0].password, (err, result) => {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            if (!result) {
                                res.status(401).json({ message: "Incorrect password!" });
                            } else {
                                const token = generateToken({ id: data[0].id });
                                userModels.setRefreshtoken(data[0].id, token.refresh_token, (err, result) => {
                                    if (err) {
                                        res.status(500).json(err);
                                    } else {
                                        res.status(200).json({ data, token });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    },

    update: (req, res) => {
        if (req.file) req.body.thumbnail = generateLinkFiles(req.file);
        bcrypt.genSalt(saltRount, (err, salt) => {
            if (err) {
                res.status(500).json(err);
            } else {
                bcrypt.hash(req.body.password, salt, (err, hastedPass) => {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        req.body.password = hastedPass;
                        userModels.updateUser(req.params.id, req.body, (err, data) => {
                            if (err) {
                                res.status(500).json(err);
                            } else {
                                res.status(200).json(data);
                            }
                        });
                    }
                });
            }
        });
    },

    delete: (req, res) => {
        userModels.deleteUser(req.params.id, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(data);
            }
        });
    },

    refreshToken: (req, res) => {
        const authorization = req.headers.authorization ? JSON.parse(req.headers.authorization) : {};
        if (!authorization.access_token) {
            res.status(401).json({ message: 'No token provided!' });
        } else {
            const id = jwt.decode(authorization.access_token).id;
            userModels.getRefreshToken(id, (err, data) => {
                if (err || !data[0]) {
                    res.status(500).json(err);
                } else {
                    try {
                        const refresh_token = data[0].refresh_token;
                        const decoded = jwt.verify(refresh_token, process.env.REFRESHTOKEN_SECRET_KEY);
                        const token = generateToken({ id: decoded.id });
                        userModels.setRefreshtoken(data[0].id, token.refresh_token, (err, result) => {
                            if (err) {
                                res.status(500).json(err);
                            } else {
                                console.log(token);
                                res.status(200).json(token);
                            }
                        });
                    } catch (err) {
                        res.status(500).json(err);
                    }
                }
            });
        }
    }

}

module.exports = userControllers;