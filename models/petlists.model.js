const conn = require('../configs/connect_db');
const {handleQuery} = require('../helpers/handleQuery');

const petListsModel = {
  getAllPetlist: (query, callback) => {
    let sql = 'select pl.*, ct.name as "nameCategory" from pet_lists pl join categories ct on pl.category_id = ct.id order by id desc';
    if(Object.keys(query).length) {
      sql = `select * from pet_lists where ${handleQuery(query)} order by id desc`;
    }
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getPetlistById: (id, callback) => {
    let sql = 'select * from pet_lists where id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getSearchPetlistByName: (name, callback) => {
    let sql = `select pl.*, ct.name as "nameCategory" from pet_lists pl join categories ct on pl.category_id = ct.id where pl.name like "%${name}%"`;
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  createPetlist: (newData, callback) => {
    const sql = 'insert into pet_lists set ?';
    conn.query(sql, newData, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  updatePetlist: (id, newData, callback) => {
    const sql = 'update pet_lists set ? where id = ?';
    conn.query(sql, [newData, id], (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  softDeletePetlist: (id, callback) => {
    const sql = 'update pet_lists set deleted_at = ? where id = ?';
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

  deletePetlist: (id, callback) => {
    deletePetlistsAndPets(id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
}

function deletePetlistsAndPets(petListId, callback) {
  conn.beginTransaction((err) => {
    if (err) {
      callback(err, null);
      console.error('Lỗi khi bắt đầu giao dịch:', err);
      throw err;
    }

    // Xóa pets thuộc category
    conn.query('DELETE FROM pets WHERE pet_list_id = ?', [petListId], (err, result) => {
      if (err) {
        return conn.rollback(() => {
          callback(err, null);
          console.error('Lỗi khi xóa pets:', err);
          throw err;
        });
      }

      // Xóa pet_lists
      conn.query('DELETE FROM pet_lists WHERE id = ?', [petListId], (err, result) => {
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
          console.log('Xóa petlists và các mục liên quan thành công');
        });
      });
    });
  });
}

module.exports = petListsModel;