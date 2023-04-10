const services = require('../../services/index');
const controllers = {
    UserController : require('./UserController')(services)
}

module.exports = controllers