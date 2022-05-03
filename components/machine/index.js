const AdminApp = require('./admin.routes');

module.exports = app => {
    app.use(AdminApp);
};