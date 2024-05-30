const conn = require("../configs/connect_db");
const { handleQuery, handleQueryProduct } = require("../helpers/handleQuery");

const productsModel = {
    getAllProduct: (query, callback) => {
        let sql = 'select p.*, c2.name as "categoryName", c2.slug as "cate2Slug", c2.id as "cate2Id", c1.slug as "cate1Slug", c1.id as "cate1Id", c.slug as "cateSlug", c.id as "cateId", b.name as "brandName", sum(cmt.evaluate) as "totalEvaluate", count(cmt.product_id) as "totalCmt" from products p join categories c2 on p.category_id = c2.id join categories c1 on c1.id = c2.parent_id join categories c on c.id = c1.parent_id join brands b on p.brand_id = b.id left join comments cmt on p.id = cmt.product_id group by p.id order by id desc';
        if (Object.keys(query).length) {
            sql = `select p.*, c2.name as "categoryName", c2.slug as "cate2Slug", c2.id as "cate2Id", c1.slug as "cate1Slug", c1.id as "cate1Id", c.slug as "cateSlug", c.id as "cateId", b.name as "brandName", sum(cmt.evaluate) as "totalEvaluate", count(cmt.product_id) as "totalCmt" from products p join categories c2 on p.category_id = c2.id join categories c1 on c1.id = c2.parent_id join categories c on c.id = c1.parent_id join brands b on p.brand_id = b.id left join comments cmt on p.id = cmt.product_id where ${handleQuery(query, 'p.')} group by p.id order by id desc`;
        }
        conn.query(sql, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    getProductById: (id, callback) => {
        const sql = 'select p.*, c2.name as "categoryName", c2.slug as "cate2Slug", c2.id as "cate2Id", c1.slug as "cate1Slug", c1.id as "cate1Id", c.slug as "cateSlug", c.id as "cateId", b.name as "brandName", sum(cmt.evaluate) as "totalEvaluate", count(cmt.product_id) as "totalCmt" from products p join categories c2 on p.category_id = c2.id join categories c1 on c1.id = c2.parent_id join categories c on c.id = c1.parent_id join brands b on p.brand_id = b.id left join comments cmt on p.id = cmt.product_id where p.id = ? group by p.id';
        conn.query(sql, id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    getProductByName: (name, callback) => {
        const sql = `select p.*, c2.name as "categoryName", c2.slug as "cate2Slug", c2.id as "cate2Id", c1.slug as "cate1Slug", c1.id as "cate1Id", c.slug as "cateSlug", c.id as "cateId", b.name as "brandName", sum(cmt.evaluate) as "totalEvaluate", count(cmt.product_id) as "totalCmt" from products p join categories c2 on p.category_id = c2.id join categories c1 on c1.id = c2.parent_id join categories c on c.id = c1.parent_id join brands b on p.brand_id = b.id left join comments cmt on p.id = cmt.product_id where p.name like "%${name}%" group by p.id`;
        conn.query(sql, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    getProductByCategoryId: (category_id, callback) => {
        const sql = `select p.*, c2.name as "categoryName", c2.slug as "cate2Slug", c2.id as "cate2Id", c1.slug as "cate1Slug", c1.id as "cate1Id", c.slug as "cateSlug", c.id as "cateId", b.name as "brandName", sum(cmt.evaluate) as "totalEvaluate", count(cmt.product_id) as "totalCmt" from products p join categories c2 on p.category_id = c2.id join categories c1 on c1.id = c2.parent_id join categories c on c.id = c1.parent_id join brands b on p.brand_id = b.id left join comments cmt on p.id = cmt.product_id where p.category_id = ? group by p.id order by id desc`;
        conn.query(sql, category_id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    getProductFilter: (query, callback) => {
        let sql = 'select p.*, c2.name as "categoryName", c2.slug as "cate2Slug", c2.id as "cate2Id", c1.slug as "cate1Slug", c1.id as "cate1Id", c.slug as "cateSlug", c.id as "cateId", b.name as "brandName", sum(cmt.evaluate) as "totalEvaluate", count(cmt.product_id) as "totalCmt" from products p join categories c2 on p.category_id = c2.id join categories c1 on c1.id = c2.parent_id join categories c on c.id = c1.parent_id join brands b on p.brand_id = b.id left join comments cmt on p.id = cmt.product_id group by p.id order by id desc';
        if (Object.keys(query).length) {
            sql = `select p.*, c2.name as "categoryName", c2.slug as "cate2Slug", c2.id as "cate2Id", c1.slug as "cate1Slug", c1.id as "cate1Id", c.slug as "cateSlug", c.id as "cateId", b.name as "brandName", sum(cmt.evaluate) as "totalEvaluate", count(cmt.product_id) as "totalCmt" from products p join categories c2 on p.category_id = c2.id join categories c1 on c1.id = c2.parent_id join categories c on c.id = c1.parent_id join brands b on p.brand_id = b.id left join comments cmt on p.id = cmt.product_id ${handleQueryProduct(query)} group by p.id order by id desc`;
        }
        // console.log(sql);
        conn.query(sql, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    getProductsBySlugCategory: (category_slug, callback) => {
        let sql = 'select p.*, c2.name as "categoryName", c2.slug as "cate2Slug", c2.id as "cate2Id", c1.slug as "cate1Slug", c1.id as "cate1Id", c.slug as "cateSlug", c.id as "cateId", b.name as "brandName", sum(cmt.evaluate) as "totalEvaluate", count(cmt.product_id) as "totalCmt" from products p join categories c2 on p.category_id = c2.id join categories c1 on c1.id = c2.parent_id join categories c on c.id = c1.parent_id join brands b on p.brand_id = b.id left join comments cmt on p.id = cmt.product_id where c2.slug = ? group by p.id order by id desc';
        // console.log(sql);
        conn.query(sql, [category_slug], (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    getResourcesProduct: (id, callback) => {
        const sql = 'select resources from products where id = ?';
        conn.query(sql, id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    createProduct: (newData, callback) => {
        const sql = 'insert into products set ?';
        conn.query(sql, newData, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    updateProduct: (id, newData, callback) => {
        const sql = 'update products set ? where id = ?';
        conn.query(sql, [newData, id], (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

    deleteProduct: (id, callback) => {
        deleteProductAndRelatedItems(id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    },

}

// Hàm xóa sản phẩm và các mục liên quan
function deleteProductAndRelatedItems(productId, callback) {
    conn.beginTransaction((err) => {
        if (err) {
            callback(err, null);
            console.error('Lỗi khi bắt đầu giao dịch:', err);
            throw err;
        }

        // Xóa comments của sản phẩm thuộc category
        conn.query('DELETE FROM comments WHERE product_id = ?', [productId], (err, result) => {
            if (err) {
                return conn.rollback(() => {
                    callback(err, null);
                    console.error('Lỗi khi xóa comments:', err);
                    throw err;
                });
            }

            conn.query('SELECT order_id FROM order_details WHERE product_id = ?', [productId], (err, result) => {
                if (err) {
                    return conn.rollback(() => {
                        callback(err, null);
                        console.error('Lỗi khi xóa orders:', err);
                        throw err;
                    });
                }

                const arr = result.map(item => item.order_id).join(',');
                // Xóa order_details của sản phẩm thuộc category
                conn.query('DELETE FROM order_details WHERE product_id = ?', [productId], (err, result) => {
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
                        conn.query('DELETE FROM wishlists WHERE product_id  = ?', [productId], (err, result) => {
                            if (err) {
                                return conn.rollback(() => {
                                    callback(err, null);
                                    console.error('Lỗi khi xóa wishlists:', err);
                                    throw err;
                                });
                            }

                            // Xóa products thuộc category
                            conn.query('DELETE FROM products WHERE id = ?', [productId], (err, result) => {
                                if (err) {
                                    return conn.rollback(() => {
                                        callback(err, null);
                                        console.error('Lỗi khi xóa products:', err);
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
                                    callback(null, { message: 'successfully' });
                                    console.log('Xóa sản phẩm và các mục liên quan thành công');
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

module.exports = productsModel;