const express = require('express');
const router = express.Router();
const licenseController = require('../controllers/licenseController');

router.post('/verify-license', licenseController.verifyLicense);
router.get('/admin', licenseController.getAdminPage);
router.post('/admin/add', licenseController.addLicense);
router.get('/admin/delete/:id', licenseController.deleteLicense);

module.exports = router;
