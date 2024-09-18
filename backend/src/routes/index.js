const userApi = require('./userApi.js');
const productApi = require('./productApi.js');
const productCategory = require("./productCategoryApi.js");
const blogApi = require("./blogApi.js");
const couponApi = require("./couponApi.js");
const orderApi = require("./orderApi.js");
const initRoutes = (app) => {
    app.use('/api/user', userApi);
    app.use("/api/product", productApi);
    app.use("/api/productCategory", productCategory)
    app.use("/api/blog", blogApi)
    app.use("/api/coupon", couponApi)
    app.use("/api/order", orderApi)
}

module.exports = initRoutes