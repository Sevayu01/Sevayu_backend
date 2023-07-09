const admin = require('firebase-admin');
const serviceAccount = require('./sevayu-92a5c-firebase-adminsdk-ylzkj-f94d416391.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
