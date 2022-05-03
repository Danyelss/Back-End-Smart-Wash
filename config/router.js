const machine = require('../components/machine');

module.exports = app => {
    const components = [machine];
    components.forEach(component => {
        component(app);
    });
};