const conn = require('../configs/connect_db');
const {handleQuery} = require('../helpers/handleQuery');

const orderDetailsModel = {
  getAllOrderDetail: (query, callback) => {
    let sql = 'select od.*, p.name as "nameProduct", p.slug as "slugProduct", p.resources as "resourcesProduct", br.name as "brandName", p.category_id as "category_id", c2.slug as "cate2Slug", c1.slug as "cate1Slug", c.slug as "cateSlug" from order_details od join products p on p.id = od.product_id join brands br on p.brand_id = br.id join categories c2 on c2.id = p.category_id join categories c1 on c1.id = c2.parent_id join categories c on c.id = c1.parent_id order by id desc';
    if(Object.keys(query).length) {
      sql = `select od.*, p.name as "nameProduct", p.slug as "slugProduct", p.resources as "resourcesProduct", br.name as "brandName", p.category_id as "category_id", c2.slug as "cate2Slug", c1.slug as "cate1Slug", c.slug as "cateSlug" from order_details od join products p on p.id = od.product_id join brands br on p.brand_id = br.id join categories c2 on c2.id = p.category_id join categories c1 on c1.id = c2.parent_id join categories c on c.id = c1.parent_id where ${handleQuery(query, 'od.')}`;
    }
    conn.query(sql, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getOrderDetailByOrderId: (order_id, callback) => {
    const sql = 'select od.*, p.name as "nameProduct", p.slug as "slugProduct", p.resources as "resourcesProduct", br.name as "brandName", p.category_id as "category_id", c2.slug as "cate2Slug", c1.slug as "cate1Slug", c.slug as "cateSlug" from order_details od join products p on p.id = od.product_id join brands br on p.brand_id = br.id join categories c2 on c2.id = p.category_id join categories c1 on c1.id = c2.parent_id join categories c on c.id = c1.parent_id where od.order_id = ? order by id desc';
    conn.query(sql, order_id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getOrderDetailByUser: (user_id, callback) => {
    const sql = 'select od.*, p.name as "nameProduct", p.slug as "slugProduct", p.resources as "resourcesProduct", br.name as "brandName", p.category_id as "category_id", c2.slug as "cate2Slug", c1.slug as "cate1Slug", c.slug as "cateSlug" from order_details od join products p on p.id = od.product_id join brands br on p.brand_id = br.id join categories c2 on c2.id = p.category_id join categories c1 on c1.id = c2.parent_id join categories c on c.id = c1.parent_id join orders o on od.order_id = o.id where o.user_id = ? order by id desc';
    conn.query(sql, user_id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  createOrderDetail: (newData, callback) => {
    const sql = 'insert into order_details set ?';
    conn.query(sql, newData, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  updateOrderDetail: (id, newData, callback) => {
    const sql = 'update order_details set ? where id = ?';
    conn.query(sql, [newData, id], (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  deleteOrderDetail: (id, callback) => {
    const sql = 'delete from order_details where id = ?';
    conn.query(sql, id, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  deleteOrderDetailByOrderId: (order_id, callback) => {
    const sql = 'delete from order_details where order_id = ?';
    conn.query(sql, [order_id], (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
}

module.exports = orderDetailsModel;

// select od.*, p.name as "nameProduct", p.slug as "slugProduct", p.resources as "resourcesProduct", br.name as "nameBrand", p.category_id as "category_id", c2.slug as "cate2Slug", c1.slug as "cate1Slug", c.slug as "cateSlug" from order_details od join products p on p.id = od.product_id join brands br on p.brand_id = br.id join categories c2 on c2.id = p.category_id join categories c1 on c1.id = c2.parent_id join categories c on c.id = c1.parent_id order by id desc