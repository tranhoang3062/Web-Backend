const conn = require('../configs/connect_db');
const {handleQuery} = require('../helpers/handleQuery');

const petsModel = {
  getAllPets: (query, callback) => {
    let sql = 'select p.*, pl.name as "petlistName", ct.name as "categoryName" from pets p join pet_lists pl on p.pet_list_id = pl.id join categories ct on pl.category_id = ct.id order by id desc';
    if(Object.keys(query).length) {
      sql = `select p.*, pl.name as "petlistName", ct.name as "categoryName" from pets p join pet_lists pl on p.pet_list_id = pl.id join categories ct on pl.category_id = ct.id where ${handleQuery(query, 'p.')} order by id desc`;
    }
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getPetsById: (id, callback) => {
    const sql = 'select p.*, pl.name as "petlistName", ct.name as "categoryName" from pets p join pet_lists pl on p.pet_list_id = pl.id join categories ct on pl.category_id = ct.id where p.id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getPetsByName: (name, callback) => {
    const sql = `select p.*, pl.name as "petlistName", ct.name as "categoryName" from pets p join pet_lists pl on p.pet_list_id = pl.id join categories ct on pl.category_id = ct.id where p.name like "%${name}%"`;
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getPetsByPetlistId: (pet_list_id, callback) => {
    const sql = `select * from pets where pet_list_id = ? order by id desc`;
    conn.query(sql, pet_list_id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getResourcesPets: (id, callback) => {
    const sql = `select resources from pets where id = ?`;
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  createPets: (newData, callback) => {
    const sql = 'insert into pets set ?';
    conn.query(sql, newData, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    }); 
  },

  updatePets: (id, newData, callback) => {
    const sql = 'update pets set ? where id = ?';
    conn.query(sql, [newData, id], (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  deletePets: (id, callback) => {
    const sql = 'delete from pets where id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
}

module.exports = petsModel;