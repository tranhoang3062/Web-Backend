const conn = require('../configs/connect_db');
const { handleQuery } = require('../helpers/handleQuery');

const userModels = {
  getAllUser: (query, callback) => {
    let sql = 'select * from users order by id desc';
    if(Object.keys(query).length) {
      sql = `select * from users where ${handleQuery(query)} order by id desc`;
    }
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getUserById: (id, callback) => {
    const sql = 'select * from users where id = ? order by id desc';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  register: (newData, callback) => {
    const sql = 'INSERT INTO `users` SET ?';
    conn.query(sql, newData, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  checkUser: (email, callback) => {
    const sql = 'SELECT * FROM `users` WHERE email = ?';
    conn.query(sql, email, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  setRefreshtoken: (id, refresh_token, callback) => {
    const sql = 'update users set refresh_token = ? where id = ?';
    conn.query(sql, [refresh_token, id], (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  updateUser: (id, newData, callback) => {
    const sql = 'update users set ? where id = ?';
    conn.query(sql, [newData, id], (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  deleteUser: (id, callback) => {
    deleteUserAndRelatedItems(id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getRefreshToken:(id, callback) => {
    const sql = 'select `refresh_token` from `users` where id = ?';
    conn.query(sql, [id], (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
  
}

function deleteUserAndRelatedItems(userId, callback) {
  conn.beginTransaction((err) => {
    if (err) {
      callback(err, null);
      console.error('Lỗi khi bắt đầu giao dịch:', err);
      throw err;
    }

    // Xóa comments của người dùng
    conn.query('DELETE FROM comments WHERE user_id = ?', [userId], (err, result) => {
      if (err) {
        return conn.rollback(() => {
          callback(err, null);
          console.error('Lỗi khi xóa comments:', err);
          throw err;
        });
      }

      // Xóa wishlist của người dùng
      conn.query('DELETE FROM wishlists WHERE user_id = ?', [userId], (err, result) => {
        if (err) {
          return conn.rollback(() => {
            callback(err, null);
            console.error('Lỗi khi xóa wishlist:', err);
            throw err;
          });
        }

        // Xóa order_details của đơn hàng của người dùng
        conn.query('DELETE FROM order_details WHERE order_id IN (SELECT id FROM orders WHERE user_id = ?)', [userId], (err, result) => {
          if (err) {
            return conn.rollback(() => {
              callback(err, null);
              console.error('Lỗi khi xóa order_details:', err);
              throw err;
            });
          }

          // Xóa đơn hàng của người dùng
          conn.query('DELETE FROM orders WHERE user_id = ?', [userId], (err, result) => {
            if (err) {
              return conn.rollback(() => {
                callback(err, null);
                console.error('Lỗi khi xóa orders:', err);
                throw err;
              });
            }

            // Cuối cùng, xóa user chính
            conn.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
              if (err) {
                return conn.rollback(() => {
                  callback(err, null);
                  console.error('Lỗi khi xóa user:', err);
                  throw err;
                });
              }

              conn.commit((err) => {
                if (err) {
                  return conn.rollback(() => {
                    callback(err, null);
                    console.error('Lỗi khi commit giao dịch:', err);
                    throw err;
                  });
                }
                callback(null, {message: 'successfully!'});
                console.log('Xóa người dùng và các mục liên quan thành công');
              });
            });
          });
        });
      });
    });
  });
}

module.exports = userModels;