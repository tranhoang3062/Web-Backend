const conn = require("../configs/connect_db");
const {handleQuery} = require("../helpers/handleQuery");

const newspagesModel = {
  getAllNewspage: (query, callback) => {
    let sql = 'select * from newspages order by id desc';
    if(Object.keys(query).length) {
      sql = `select * from newspages where ${handleQuery(query)} order by id desc`;
    }
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getNewspageById: (id, callback) => {
    const sql = 'select * from newspages where id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getNewspageByTitle: (title, callback) => {
    const sql = `select * from newspages where title like "%${title}%"`;
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getThumbnailNewspage: (id, callback) => {
    const sql = 'select thumbnail from newspages where id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  createNewspage: (newData, callback) => {
    const sql = 'insert into newspages set ?';
    conn.query(sql, newData, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  updateNewspage: (id, newData, callback) => {
    const sql = 'update newspages set ? where id = ?';
    conn.query(sql, [newData, id], (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  deleteNewspage: (id, callback) => {
    const sql = 'delete from newspages where id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  }
}

module.exports = newspagesModel;