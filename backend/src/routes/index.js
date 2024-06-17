import userApi from './userApi';
const initRoutes = (app) => {
    app.use('/api/user', userApi);
}

module.exports = initRoutes