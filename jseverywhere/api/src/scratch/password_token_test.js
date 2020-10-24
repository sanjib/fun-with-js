const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Password
const saltRounds = 10;
const passwordEncrypt = async password =>
  await bcrypt.hash(password, saltRounds);
const checkPassword = async (plainPassword, hashedPassword) =>
  await bcrypt.compare(plainPassword, hashedPassword);

// Token
const jwtSign = 'xxxsecret';
const generateJWT = async user => await jwt.sign({ id: user._id }, jwtSign);
const validateJWT = async token => await jwt.verify(token, jwtSign);

// Test
// 1. Encrypt password foobar
passwordEncrypt('foobar').then(hashedPassword => {
  console.log(`--> hashedPassword: ${hashedPassword}`);
  // 2. See if password matches
  checkPassword('foobar', hashedPassword).then(passwordMatch => {
    console.log(`--> password match: ${passwordMatch}`);
    if (passwordMatch === true) {
      // 3. Password matched, so encrypt user _id in token
      const user = { _id: 'xxxid' };
      generateJWT(user).then(encryptedToken => {
        // 4. Token is encrypted
        console.log(`--> data to encrypt:`, user);
        console.log(`--> encryptedToken: ${encryptedToken}`);
        // 5. Validate token
        validateJWT(encryptedToken).then(decryptedToken => {
          // 6. Token is broken apart, inspect internals
          console.log('--> decryptedToken:', decryptedToken);
        });
      });
    }
  });
});
