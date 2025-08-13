const Company = require('../models/Company');

// Get all companies with filtering and pagination
exports.getAllCompanies = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      industry,
      country,
      place,
      minEmployees,
      maxEmployees,
      minRevenue,
      maxRevenue,
      foundedYear,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    let filter = {};

    if (search) {
      filter.$text = { $search: search };
    }

    if (industry) {
      filter.industry = new RegExp(industry, 'i');
    }

    if (country) {
      filter.country = new RegExp(country, 'i');
    }

    if (place) {
      filter.place = new RegExp(place, 'i');
    }

    if (minEmployees || maxEmployees) {
      filter.employeeCount = {};
      if (minEmployees) filter.employeeCount.$gte = parseInt(minEmployees);
      if (maxEmployees) filter.employeeCount.$lte = parseInt(maxEmployees);
    }

    if (minRevenue || maxRevenue) {
      filter.revenue = {};
      if (minRevenue) filter.revenue.$gte = parseInt(minRevenue);
      if (maxRevenue) filter.revenue.$lte = parseInt(maxRevenue);
    }

    if (foundedYear) {
      filter.foundedYear = parseInt(foundedYear);
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const companies = await Company.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Company.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: companies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new company
exports.createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();

    res.status(201).json({
      success: true,
      data: company,
      message: 'Company created successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Update company
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      data: company,
      message: 'Company updated successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Delete company
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      message: 'Company deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get filter options for dropdowns
exports.getFilterOptions = async (req, res) => {
  try {
    const industries = await Company.distinct('industry');
    const countries = await Company.distinct('country');
    const places = await Company.distinct('place');

    res.json({
      success: true,
      data: {
        industries: industries.sort(),
        countries: countries.sort(),
        places: places.sort()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};