import userApi from './userApi';
import productApi from './productApi';
import productCategory from "./productCategoryApi";
import blogApi from "./blogApi";
const initRoutes = (app) => {
    app.use('/api/user', userApi);
    app.use("/api/product", productApi);
    app.use("/api/productCategory", productCategory)
    app.use("/api/blog", blogApi)
}

module.exports = initRoutes