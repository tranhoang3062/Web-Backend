require('dotenv').config();
require('./configs/connect_db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const api_user = require("./routes/users.route");
const api_categories = require("./routes/categories.route");
const api_petlists = require("./routes/petlist.route");
const api_pets = require("./routes/pets.route");
const api_brands = require("./routes/brands.route");
const api_products = require('./routes/products.route');
const api_orders = require('./routes/orders.route');
const api_ordersdetail = require('./routes/orderDetails.route');
const api_wishlist = require('./routes/wishlists.route');
const api_newspages = require('./routes/newspages.route');
const api_comments = require('./routes/comments.route');

const app = express();
const port = process.env.PORT_SERVER || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.set(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

api_user(app);
api_categories(app);
api_petlists(app);
api_pets(app);
api_brands(app);
api_products(app);
api_orders(app);
api_ordersdetail(app);
api_wishlist(app);
api_newspages(app);
api_comments(app);

app.listen(port, () => console.log('Server running at http://localhost:' + port));
