const conn = require('../configs/connect_db');
const {handleQuery} = require('../helpers/handleQuery');
const productsModel = require('./products.model');
const petlistModel = require('./petlists.model');

const categoriesModel = {
  getAllCategories: (query, callback) => {
    let sql = 'select c1.*, c2.name as "parentName", c3.name as "parentName2" from categories c1 left join categories c2 on c1.parent_id = c2.id left join categories c3 on c3.id = c2.parent_id order by id desc';
    if(Object.keys(query).length) {
      sql = `select c1.*, c2.name as "parentName", c3.name as "parentName2" from categories c1 left join categories c2 on c1.parent_id = c2.id left join categories c3 on c3.id = c2.parent_id where ${handleQuery(query, 'c1.')} order by id desc`;
    }
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getCategoryById: (id, callback) => {
    let sql = 'select c1.*, c2.name as "parentName", c3.name as "parentName2" from categories c1 left join categories c2 on c1.parent_id = c2.id left join categories c3 on c3.id = c2.parent_id where id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getSearchCategoryByName: (name, callback) => {
    let sql = `select c1.*, c2.name as "parentName", c3.name as "parentName2" from categories c1 left join categories c2 on c1.parent_id = c2.id left join categories c3 on c3.id = c2.parent_id where c1.name like "%${name}%"`;
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getCategoriesParent: (callback) => {
    let sql = 'select c1.*, c2.name as "parentName", c3.name as "parentName2" from categories c1 left join categories c2 on c1.parent_id = c2.id left join categories c3 on c3.id = c2.parent_id where parent_id = 0 or parent_id = null order by id desc';
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  createCategory: (newData, callback) => {
    const sql = 'insert into categories set ?';
    conn.query(sql, newData, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  updateCategory: (id, newData, callback) => {
    const sql = 'update categories set ? where id = ?';
    conn.query(sql, [newData, id], (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  softdeleteCategory: (id, callback) => {
    const sql = 'update categories set deleted_at = ? where id = ?';
    const d = new Date();
    const dateNow = d.getFullYear() + '-' + Number(d.getMonth() + 1) + '-' + d.getDate();
    conn.query(sql, [dateNow, id], (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  deleteCategory: (id, callback) => {
    const sql0 = 'select * from categories where id = ?';
    conn.query(sql0, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        if(data[0].lever == 1) {
          deletePetlistsAndPets(id, (err, data) => {
            if(err) {
              callback(err, null);
            } else {
              conn.query('select id from categories where parent_id in (select id from categories where parent_id = ?)', [id], (err, data) => {
                if(err) {
                  callback(err, null);
                } else {
                  if(data.length !==0) {
                    const arr = data.map(item=>item.id);
                    deleteCategoryAndRelatedItems(arr, (err, data) => {
                      if(err) {
                        callback(err, null);
                      } else {
                        conn.query('delete from categories where parent_id = ?', id, (err, data) => {
                          if(err) {
                            callback(err, null);
                          } else {
                            conn.query('delete from categories where id = ?', [id], (err, data) => {
                              if(err) {
                                callback(err, null);
                              } else {
                                callback(null, data);
                              }
                            });
                          }
                        });
                      }
                    });
                  } else {
                    conn.query('delete from categories where parent_id = ?', id, (err, data) => {
                      if(err) {
                        callback(err, null);
                      } else {
                        conn.query('delete from categories where id = ?', [id], (err, data) => {
                          if(err) {
                            callback(err, null);
                          } else {
                            callback(null, data);
                          }
                        });
                      }
                    });
                  }
                }
              });
            }
          })
        } else if(data[0].lever == 2) {
          conn.query('select id from categories where parent_id = ?', [id], (err, data) => {
            if(err) {
              callback(err, null);
            } else {
              if(data.length !== 0) {
                const arr = data.map(item=>item.id);
                deleteCategoryAndRelatedItems(arr, (err, data) => {
                  if(err) {
                    callback(err, null);
                  } else {
                    conn.query('delete from categories where id = ?', [id], (err, data) => {
                      if(err) {
                        callback(err, null);
                      } else {
                        callback(null, data);
                      }
                    });
                  }
                });
              } else {
                conn.query('delete from categories where id = ?', [id], (err, data) => {
                  if(err) {
                    callback(err, null);
                  } else {
                    callback(null, data);
                  }
                });
              }
            }
          });
        } else {
          deleteCategoryAndRelatedItems([id], (err, data) => {
            if(err) {
              callback(err, null);
            } else {
              callback(null, data);
            }
          });
        }
      }
    });
  }
}

// Hàm xóa danh mục và các mục liên quan
function deleteCategoryAndRelatedItems(categoryIds, callback) {
  conn.beginTransaction((err) => {
    if (err) {
      callback(err, null);
      console.error('Lỗi khi bắt đầu giao dịch:', err);
      throw err;
    }
    
    categoryIds.forEach(categoryId => {
      // Xóa comments của sản phẩm thuộc category
      conn.query('DELETE FROM comments WHERE product_id IN (SELECT id FROM products WHERE category_id = ?)', [categoryId], (err, result) => {
        if (err) {
          return conn.rollback(() => {
            callback(err, null);
            console.error('Lỗi khi xóa comments:', err);
            throw err;
          });
        }
  
        conn.query('SELECT order_id FROM order_details WHERE product_id IN (SELECT id FROM products WHERE category_id = ?)', [categoryId], (err, result) => {
          if (err) {
            return conn.rollback(() => {
              callback(err, null);
              console.error('Lỗi khi xóa orders:', err);
              throw err;
            });
          }
          
          const arr = result.map(item=>item.order_id).join(',');
          // Xóa order_details của sản phẩm thuộc category
          conn.query('DELETE FROM order_details WHERE product_id IN (SELECT id FROM products WHERE category_id = ?)', [categoryId], (err, result) => {
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
              conn.query('DELETE FROM wishlists WHERE product_id IN (SELECT id FROM products WHERE category_id = ?)', [categoryId], (err, result) => {
                if (err) {
                  return conn.rollback(() => {
                    callback(err, null);
                    console.error('Lỗi khi xóa wishlists:', err);
                    throw err;
                  });
                }
      
                // Xóa products thuộc category
                conn.query('DELETE FROM products WHERE category_id = ?', [categoryId], (err, result) => {
                  if (err) {
                    return conn.rollback(() => {
                      callback(err, null);
                      console.error('Lỗi khi xóa products:', err);
                      throw err;
                    });
                  }
                  
                  // Cuối cùng, xóa category chính
                  conn.query('DELETE FROM categories WHERE id = ?', [categoryId], (err, result) => {
                    if (err) {
                      return conn.rollback(() => {
                        callback(err, null);
                        console.error('Lỗi khi xóa category:', err);
                        throw err;
                      });
                    }
    
                    if (categoryIds.indexOf(categoryId) === categoryIds.length - 1) {
                      conn.commit((err) => {
                        if (err) {
                          return conn.rollback(() => {
                            console.error('Lỗi khi commit giao dịch:', err);
                            throw err;
                          });
                        }
                        callback(null, {message: 'successfully'});
                        console.log('Xóa danh mục và các mục liên quan thành công');
                      });
                    }
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

function deletePetlistsAndPets(categoryId, callback) {
  conn.beginTransaction((err) => {
    if (err) {
      callback(err, null);
      console.error('Lỗi khi bắt đầu giao dịch:', err);
      throw err;
    }

    // Xóa pets thuộc category
    conn.query('DELETE FROM pets WHERE pet_list_id IN (SELECT id FROM pet_lists WHERE category_id = ?)', [categoryId], (err, result) => {
      if (err) {
        return conn.rollback(() => {
          callback(err, null);
          console.error('Lỗi khi xóa pets:', err);
          throw err;
        });
      }

      // Xóa pet_lists của category
      conn.query('DELETE FROM pet_lists WHERE category_id = ?', [categoryId], (err, result) => {
        if (err) {
          return conn.rollback(() => {
            callback(err, null);
            console.error('Lỗi khi xóa pet_lists:', err);
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
          console.log('Xóa danh mục và các mục liên quan thành công');
        });
      });
    });
  });
}

module.exports = categoriesModel;