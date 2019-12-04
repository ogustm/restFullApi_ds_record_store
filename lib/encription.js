const bcrypt = require('bcript');

exports.encrypt = async pass => {
    return await bcrypt.has(pass, 11);
}