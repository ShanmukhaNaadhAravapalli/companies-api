const express = require('express');
const router = express.Router();
const {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getFilterOptions
} = require('../controllers/companyController');

// Routes
router.get('/', getAllCompanies);
router.get('/filter-options', getFilterOptions);
router.get('/:id', getCompanyById);
router.post('/', createCompany);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

module.exports = router;