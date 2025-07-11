const db = require('../models/db');

exports.verifyLicense = async (req, res) => {
  const { license } = req.body;
  if (!license) return res.status(400).json({ status: 'error', message: 'Missing license key' });

  try {
    const [rows] = await db.query('SELECT * FROM licenses WHERE license_key = ?', [license]);
    if (rows.length === 0) return res.json({ status: 'invalid', message: 'License not found' });

    const licenseData = rows[0];
    if (licenseData.status !== 'active') {
      return res.json({ status: 'invalid', message: 'License inactive or banned' });
    }

    res.json({ status: 'valid', message: 'License is active' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.getAdminPage = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM licenses');
  res.render('admin', { licenses: rows });
};

exports.addLicense = async (req, res) => {
  const { license_key, status } = req.body;
  await db.query('INSERT INTO licenses (license_key, status) VALUES (?, ?)', [license_key, status]);
  res.redirect('/admin');
};

exports.deleteLicense = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM licenses WHERE id = ?', [id]);
  res.redirect('/admin');
};
