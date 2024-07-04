import userApi from './userApi';
import productApi from './productApi';
import productCategory from "./productCategoryApi";
import blogApi from "./blogApi";
import couponApi from "./couponApi";
import billApi from "./billApi";
const initRoutes = (app) => {
    app.use('/api/user', userApi);
    app.use("/api/product", productApi);
    app.use("/api/productCategory", productCategory)
    app.use("/api/blog", blogApi)
    app.use("/api/coupon", couponApi)
    app.use("/api/bill", billApi)
}

module.exports = initRoutes