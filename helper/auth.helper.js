const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await new Promise((resolve, reject) => {
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

const comparePassword = async (password, hashPassword) => {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(password, hashPassword, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};
