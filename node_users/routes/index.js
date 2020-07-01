const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController.js');
const checkDBStatus = require('../helpers/dbStatus.js');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkToken', UserController.checkToken);

router.get('/healthCheck', (req, res) => {
  const serverTime = new Date().toISOString();
  checkDBStatus()
    .then((_) => {
      res.status(200).json({
        time: serverTime,
        dbStatus: 'USER_DB_OK',
      });
    })
    .catch((_) => {
      res.status(500).json({
        time: serverTime,
        dbStatus: 'USER_DB_NO_CONNECTION',
      });
    });
});


module.exports = router;
