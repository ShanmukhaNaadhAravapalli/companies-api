const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  industry: {
    type: String,
    required: [true, 'Industry is required'],
    trim: true,
    maxlength: [50, 'Industry cannot exceed 50 characters']
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    maxlength: [50, 'Country cannot exceed 50 characters']
  },
  place: {
    type: String,
    required: [true, 'Place is required'],
    trim: true,
    maxlength: [100, 'Place cannot exceed 100 characters']
  },
  employeeCount: {
    type: Number,
    required: [true, 'Employee count is required'],
    min: [1, 'Employee count must be at least 1']
  },
  foundedYear: {
    type: Number,
    required: [true, 'Founded year is required'],
    min: [1800, 'Founded year must be after 1800'],
    max: [new Date().getFullYear(), 'Founded year cannot be in the future']
  },
  revenue: {
    type: Number,
    required: false,
    min: [0, 'Revenue cannot be negative']
  },
  website: {
    type: String,
    required: false,
    trim: true,
    maxlength: [200, 'Website URL cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: false,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});


companySchema.index({ name: 'text', industry: 'text', country: 'text', place: 'text' });

module.exports = mongoose.model('Company', companySchema);