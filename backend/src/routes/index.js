import userApi from './userApi';
import productApi from './productApi';
import productCategory from "./productCategory";
const initRoutes = (app) => {
    app.use('/api/user', userApi);
    app.use("/api/product", productApi);
    app.use("/api/productCategory", productCategory)
}

module.exports = initRoutes