const express = require('express');
const router = express.Router();
const licenseController = require('../controllers/licenseController');

// POST: Verify license
router.post('/verify-license', licenseController.verifyLicense);

// GET: Admin panel
router.get('/admin', licenseController.getAdminPage);

// POST: Add new license
router.post('/admin/add', licenseController.addLicense);

// GET: Delete license
router.get('/admin/delete/:id', licenseController.deleteLicense);

module.exports = router;
