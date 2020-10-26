// To test these functions, run from the shell:
// > node password_token_test.js
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
function test1() {
  // 1. Encrypt password foobar
  passwordEncrypt('foobar').then(hashedPassword => {
    console.log('--> plainPassword: foobar');
    console.log(`--> hashedPassword: ${hashedPassword}`);
    // 2. See if password matches
    checkPassword('foobar', hashedPassword).then(passwordMatch => {
      console.log(`--> password match: ${passwordMatch}`);
      if (passwordMatch === true) {
        // 3. Password matched, so encrypt user _id in token
        const user = { _id: 'xxxid' };
        generateJWT(user).then(encryptedToken => {
          // 4. Token is encrypted
          console.log(`--> data to encrypt:`, { id: user._id });
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
}

async function test2() {
  console.log('--> plain password:', 'foobar');
  // hash password
  const hashedPassword = await passwordEncrypt('foobar');
  console.log('--> hashed password:', hashedPassword);
  // match password, change foobar to test match
  const doesPasswordMatch = await checkPassword('foobar', hashedPassword);
  console.log('--> does password match:', doesPasswordMatch);
  // generate token
  const user = { _id: 'xxxid' };
  console.log('--> data to encrypt:', { id: user._id });
  const token = await generateJWT(user);
  console.log('--> encrypted token:', token);
  // unencrypt token
  const tokenDecrypted = await validateJWT(token);
  console.log('--> token decrypted:', tokenDecrypted);
}

// test1();
test2();
