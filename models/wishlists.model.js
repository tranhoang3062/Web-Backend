const conn = require('../configs/connect_db');
const {handleQuery} = require('../helpers/handleQuery');

const wishlistsModel = {
  getAllWishlist: (query, callback) => {
    let sql = 'select * from wishlists';
    if(Object.keys(query).length) {
      sql = `select * from wishlists where ${handleQuery(query)}`;
    }
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getWishlistById: (id, callback) => {
    const sql = 'select * from wishlists where id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getWishlistByUserId: (user_id, callback) => {
    const sql = 'select * from wishlists where user_id = ?';
    conn.query(sql, user_id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getWishlistByProductId: (product_id, callback) => {
    const sql = 'select * from wishlists where product_id = ?';
    conn.query(sql, product_id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  createWishlist: (newData, callback) => {
    const sql = 'insert into wishlists set ?';
    conn.query(sql, newData, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  updateWishlist: (id, newData, callback) => {
    const sql = 'update wishlists set ? where id = ?';
    conn.query(sql, [newData, id], (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  deleteWishlist: (id, callback) => {
    const sql = 'delete from wishlists where id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  deleteWishlistByProduct: (id, callback) => {
    const sql = 'delete from wishlists where id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
}

module.exports = wishlistsModel;