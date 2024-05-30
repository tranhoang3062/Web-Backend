const conn = require("../configs/connect_db");
const { handleQuery } = require("../helpers/handleQuery");

const commentsModel = {
    getAllComment: (query, callback) => {
        let sql = 'select c.*, u.fullname as "nameUser", u.thumbnail as "thumbnail" from comments c join users u on c.user_id = u.id order by id desc';
        if (Object.keys(query).length) {
            sql = `select c.*, u.fullname as "nameUser", u.thumbnail as "thumbnail" from comments c join users u on c.user_id = u.id where ${handleQuery(query, 'c.')} order by id desc`;
        }
        conn.query(sql, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    getCommentById: (id, callback) => {
        const sql = 'select c.*, u.fullname as "nameUser", u.thumbnail as "thumbnail" from comments c join users u on c.user_id = u.id where c.id = ?';
        conn.query(sql, id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    getCommentByUserId: (user_id, callback) => {
        const sql = `select c.*, u.fullname as "nameUser", u.thumbnail as "thumbnail" from comments c join users u on c.user_id = u.id where c.user_id = ? order by id desc`;
        conn.query(sql, user_id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    getCommentByProductId: (product_id, callback) => {
        const sql = `select c.*, u.fullname as "nameUser", u.thumbnail as "thumbnail" from comments c join users u on c.user_id = u.id where c.product_id = ? order by id desc`;
        conn.query(sql, product_id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    getResourcesComment: (id, callback) => {
        const sql = 'select resources from comments where id = ?';
        conn.query(sql, id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    createComment: (newData, callback) => {
        const sql = 'insert into comments set ?';
        conn.query(sql, newData, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    updateComment: (id, newData, callback) => {
        const sql = 'update comments set ? where id = ?';
        conn.query(sql, [newData, id], (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    deleteComment: (id, callback) => {
        const sql = 'delete from comments where id = ?';
        conn.query(sql, id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        })
    }
}

module.exports = commentsModel;