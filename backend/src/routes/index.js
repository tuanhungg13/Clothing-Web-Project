import userApi from './userApi';
import productApi from './productApi';
const initRoutes = (app) => {
    app.use('/api/user', userApi);
    app.use("/api/product", productApi);
}

module.exports = initRoutes