const conn = require('../configs/connect_db');
const {handleQuery} = require('../helpers/handleQuery');

const brandsModel = {
  getAllBrands: (query, callback) => {
    let sql = 'select * from brands order by id desc';
    if(Object.keys(query).length) {
      sql = `select * from brands where ${handleQuery(query)} order by id desc`;
    }
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getBrandsById: (id, callback) => {
    const sql = 'select * from brands where id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getSearchBrandsByName: (name, callback) => {
    const sql = `select * from brands where name like "%${name}%"`;
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getThumbnailBrands: (id, callback) => {
    const sql = 'select thumbnail from brands where id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  createBrands: (newData, callback) => {
    const sql = 'insert into brands set ?';
    conn.query(sql, newData, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    }); 
  },

  updateBrands: (id, newData, callback) => {
    const sql = 'update brands set ? where id = ?';
    conn.query(sql, [newData, id], (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  deleteBrands: (id, callback) => {
    deleteBrandAndRelatedItems(id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
}

function deleteBrandAndRelatedItems(brandId, callback) {
  conn.beginTransaction((err) => {
    if (err) {
      callback(err, null);
      console.error('Lỗi khi bắt đầu giao dịch:', err);
      throw err;
    }

    conn.query('DELETE FROM comments WHERE product_id IN (SELECT id FROM products WHERE brand_id = ?)', [brandId], (err, result) => {
      if (err) {
        return conn.rollback(() => {
          callback(err, null);
          console.error('Lỗi khi xóa comments:', err);
          throw err;
        });
      }

      conn.query('SELECT order_id FROM order_details WHERE product_id IN (SELECT id FROM products WHERE brand_id = ?)', [brandId], (err, result) => {
        if (err) {
          return conn.rollback(() => {
            callback(err, null);
            console.error('Lỗi khi xóa orders:', err);
            throw err;
          });
        }
        
        const arr = result.map(item=>item.order_id).join(',');
        // Xóa order_details của sản phẩm thuộc category
        conn.query('DELETE FROM order_details WHERE product_id IN (SELECT id FROM products WHERE brand_id = ?)', [brandId], (err, result) => {
          if (err) {
            return conn.rollback(() => {
              callback(err, null);
              console.error('Lỗi khi xóa order_details:', err);
              throw err;
            });
          }
          conn.query('DELETE FROM orders WHERE id IN (?)', [arr !== '' ? arr : ' '], (err, result) => {
            if (err) {
              return conn.rollback(() => {
                callback(err, null);
                console.error('Lỗi khi xóa orders:', err);
                throw err;
              });
            }
            
            // Xóa wishlist có chứa sản phẩm thuộc category
            conn.query('DELETE FROM wishlists WHERE product_id IN (SELECT id FROM products WHERE brand_id = ?)', [brandId], (err, result) => {
              if (err) {
                return conn.rollback(() => {
                  callback(err, null);
                  console.error('Lỗi khi xóa wishlists:', err);
                  throw err;
                });
              }
    
              // Xóa products thuộc category
              conn.query('DELETE FROM products WHERE brand_id = ?', [brandId], (err, result) => {
                if (err) {
                  return conn.rollback(() => {
                    callback(err, null);
                    console.error('Lỗi khi xóa products:', err);
                    throw err;
                  });
                }
                
                // Cuối cùng, xóa brand chính
                conn.query('DELETE FROM brands WHERE id = ?', [brandId], (err, result) => {
                  if (err) {
                    return conn.rollback(() => {
                      callback(err, null);
                      console.error('Lỗi khi xóa category:', err);
                      throw err;
                    });
                  }
  
                  conn.commit((err) => {
                    if (err) {
                      return conn.rollback(() => {
                        console.error('Lỗi khi commit giao dịch:', err);
                        throw err;
                      });
                    }
                    callback(null, {message: 'successfully'});
                    console.log('Xóa thương hiệu và các mục liên quan thành công');
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

module.exports = brandsModel;