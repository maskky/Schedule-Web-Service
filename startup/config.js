const config = require('config');

module.exports = function(app) {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FETAL ERROR: jwtPrivateKey is not defined.');
    }
}