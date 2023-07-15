const admin = require('firebase-admin');
const serviceAccount = require('./sevayu-admin-sdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
