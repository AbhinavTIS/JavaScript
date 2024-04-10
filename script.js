document.addEventListener('DOMContentLoaded', function() {
    const customerForm = document.getElementById('customerForm');
    customerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting to check validations
        if (validateForm()) {
            // If the form is valid, display a confirmation message
            alert('Form submitted successfully!');
            // You could also implement an AJAX request to submit the form data here.
        }
    });

    // Set up initial values
    generateCustomerId();
    setUpInputListeners();
});

function validateForm() {
    // Assuming all fields are required
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    let formIsValid = true; // Flag to determine if form should submit

    // Validate the first name
    if (firstName.length < 2) {
        showError('firstName', 'First name must be at least 2 characters.');
        formIsValid = false;
    } else {
        clearError('firstName');
    }

    // Validate the last name
    if (lastName.length < 2) {
        showError('lastName', 'Last name must be at least 2 characters.');
        formIsValid = false;
    } else {
        clearError('lastName');
    }

    // Validate the email address
    if (!validateEmail(email)) {
        showError('email', 'Enter a valid email address.');
        formIsValid = false;
    } else {
        clearError('email');
    }

    // Validate the phone number
    if (!validatePhoneNumber(phone)) {
        showError('phone', 'Phone number is not in the correct format.');
        formIsValid = false;
    } else {
        clearError('phone');
    }

    // Validate the password
    if (!validatePassword(password)) {
        showError('password', 'Password must meet the complexity requirements.');
        formIsValid = false;
    } else {
        clearError('password');
    }

    return formIsValid;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

function validatePhoneNumber(phone) {
    const re = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;
    return re.test(phone);
}

function validatePassword(password) {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{12,}/;
    return re.test(password);
}

function generateCustomerId() {
    document.getElementById('customerID').value = 'CUST-' + Math.random().toString(36).substr(2, 9);
}

function setUpInputListeners() {
    // Attach blur event listeners to input fields for real-time validation feedback
    ['firstName', 'lastName', 'email', 'phone', 'password'].forEach(function(id) {
        const inputElement = document.getElementById(id);
        inputElement.addEventListener('blur', function() {
            validateForm();
        });
    });
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    input.classList.add('error');
    const errorDiv = input.nextElementSibling || document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.className = 'error-message';
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    input.classList.remove('error');
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        input.parentNode.removeChild(errorDiv);
    }
}

// Additional feature: To remove error message when the user starts correcting the input
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('input', () => clearError(input.id));
});
