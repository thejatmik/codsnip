const router = require('express').Router();
const snipController = require('../controllers/snipController.js');
const userMiddleware = require('../middlewares/userMiddleware.js');

router.get('/healthCheck', (req, res, next) => {
  const currentTime = new Date().toISOString();
  res.status(200).json({
    time: currentTime,
  });
});

router.get('/allSnip', snipController.getAllSnip);
router.get('/snips/:id', snipController.getSnipId);
router.use(userMiddleware.authenticator);
router.delete('/snips/:id', snipController.removeSnipId);
router.patch('/snips/:id', snipController.patchSnipId);
router.post('/newSnips', snipController.createSnip);

module.exports = router;
