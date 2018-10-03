const crypto = require('crypto');

const generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

const encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

const isCorrectPassword = function(candidatePwd, salt, password) {
  return encryptPassword(candidatePwd, salt) === password;
};

module.exports = { generateSalt, encryptPassword, isCorrectPassword };
