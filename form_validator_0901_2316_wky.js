// 代码生成时间: 2025-09-01 23:16:29
// Import required modules
const Joi = require('@hapi/joi');

// Define a schema for form data validation
const formSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  confirm_password: Joi.string().valid(Joi.ref('password'))
});

/**
 * Validates the form data against the schema
 * @param {Object} formData - The form data to be validated
 * @returns {Promise} Resolves with validation result or rejects with error
 */
function validateFormData(formData) {
  return new Promise((resolve, reject) => {
    // Validate the form data
    formSchema.validate(formData, { abortEarly: false }, (err, value) => {
      if (err) {
        // Reject the promise if validation fails
        reject(err.details.map(detail => detail.message));
      } else {
        // Resolve the promise with the validated data
        resolve(value);
      }
    });
  });
}

// Example usage
const formData = {
  username: 'johndoe',
  email: 'john.doe@example.com',
  password: 'secure123',
  confirm_password: 'secure123'
};

validateFormData(formData)
  .then(data => {
    console.log('FormData is valid:', data);
  })
  .catch(err => {
    console.error('Validation errors:', err);
  });

// Export the validateFormData function for use in other modules
module.exports = validateFormData;