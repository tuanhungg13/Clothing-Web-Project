import userApi from './userApi';
import productApi from './productApi';
import productCategory from "./productCategoryApi";
const initRoutes = (app) => {
    app.use('/api/user', userApi);
    app.use("/api/product", productApi);
    app.use("/api/productCategory", productCategory)
}

module.exports = initRoutes