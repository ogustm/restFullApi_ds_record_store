const bcrypt = require('bcrypt');

exports.encrypt = async pass => {
    if(!pass)return '';
    return await bcrypt.has(pass, 11);
}

exports.compare = async(password, hash){
    return await bcrypt.compare(password, hash);
}