const conn = require('../configs/connect_db');
const {handleQuery} = require('../helpers/handleQuery');

const ordersModel = {
  getAllOrder: (query, callback) => {
    let sql = 'select * from orders order by id desc';
    if(Object.keys(query).length) {
      sql = `select * from orders where ${handleQuery(query)} order by id desc`;
    }
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getOrderById: (id, callback) => {
    const sql = 'select * from orders where id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getOrderByUser: (user_id, callback) => {
    const sql = 'select * from orders where user_id = ? order by id desc';
    conn.query(sql, [user_id], (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  createOrder: (newData, callback) => {
    const sql = 'insert into orders set ?';
    conn.query(sql, newData, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  updateOrder: (id, newData, callback) => {
    const sql = 'update orders set ? where id = ?';
    conn.query(sql, [newData, id], (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  deleteOrder: (id, callback) => {
    const sql = 'delete from orders where id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
}

module.exports = ordersModel;

// select * from