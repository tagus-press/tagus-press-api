const bcrypt = require("bcryptjs");

const comparePasswordHash = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// const generatePasswordHash = password => {
//   return bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//       if (err) throw err;
//       console.log(hash);
//       return hash;
//     });
//   });
// };

module.exports = { comparePasswordHash };
