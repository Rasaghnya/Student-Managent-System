// ==================== DOCUMENT READY ==================== 

document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    closeAlertsAfterDelay();
    validateFormOnSubmit();
    initializeSearch();
});

// ==================== INITIALIZATION FUNCTIONS ==================== 

function initializeEventListeners() {
    // Delete confirmation
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', confirmDelete);
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });

    // Close alert buttons
    document.querySelectorAll('.alert-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });
    });
}

// ==================== SEARCH FUNCTIONALITY ==================== 

function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(e);
            }
        });
    }
}

function performSearch(e) {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (query === '') {
        alert('Please enter a search term');
        return;
    }
    
    // Redirect to search with query
    const currentUrl = window.location.pathname;
    window.location.href = `${currentUrl}?search=${encodeURIComponent(query)}`;
}

// ==================== DELETE CONFIRMATION ==================== 

function confirmDelete(e) {
    // Check if this is actually a delete button within a form
    const btn = e.target;
    const form = btn.closest('form');
    
    if (form && form.getAttribute('method') === 'POST') {
        if (!confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
            e.preventDefault();
            return false;
        }
    }
    
    return true;
}

// ==================== FORM VALIDATION ==================== 

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
            showInputError(input);
        } else {
            clearInputError(input);
        }
    });

    return isValid;
}

function validateFormOnSubmit() {
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                showInputError(this, 'Please enter a valid email address');
            } else {
                clearInputError(this);
            }
        });
    });

    // Phone validation
    const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="s_phone"]');
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidPhone(this.value)) {
                showInputError(this, 'Please enter a valid phone number (10-15 digits)');
            } else {
                clearInputError(this);
            }
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();

    // Check if required field is empty
    if (input.hasAttribute('required') && value === '') {
        return false;
    }

    // Check email format
    if (input.type === 'email' && value && !isValidEmail(value)) {
        return false;
    }

    // Check phone format
    if ((input.type === 'tel' || input.name === 's_phone') && value && !isValidPhone(value)) {
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showInputError(input, message = null) {
    input.style.borderColor = '#ff6b6b';
    input.style.boxShadow = '0 0 5px rgba(255, 107, 107, 0.3)';

    // Remove existing error message
    const existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains('input-error')) {
        existingError.remove();
    }

    // Add new error message
    if (message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'input-error';
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '0.3rem';
        errorDiv.textContent = message;
        input.parentElement.insertBefore(errorDiv, input.nextSibling);
    }
}

function clearInputError(input) {
    input.style.borderColor = '#e0e0e0';
    input.style.boxShadow = 'none';

    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('input-error')) {
        errorDiv.remove();
    }
}

// ==================== ALERT HANDLING ==================== 

function closeAlertsAfterDelay() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        // Auto close alerts after 5 seconds
        setTimeout(() => {
            fadeOutElement(alert);
        }, 5000);
    });
}

function fadeOutElement(element) {
    element.style.transition = 'opacity 0.3s ease';
    element.style.opacity = '0';
    setTimeout(() => {
        element.style.display = 'none';
    }, 300);
}

// ==================== TABLE UTILITIES ==================== 

function highlightRowOnHover() {
    const tableRows = document.querySelectorAll('.table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f0f0';
        });
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
}

function sortTable(columnIndex, isNumeric = false) {
    const table = document.querySelector('.table');
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        if (isNumeric) {
            return parseInt(aValue) - parseInt(bValue);
        }
        return aValue.localeCompare(bValue);
    });
    
    const tbody = table.querySelector('tbody');
    rows.forEach(row => tbody.appendChild(row));
}

// ==================== FORM UTILITIES ==================== 

function resetFormFields(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        // Clear all error messages
        document.querySelectorAll('.input-error').forEach(error => error.remove());
    }
}

function disableSubmitButton(formId, disabled = true) {
    const form = document.getElementById(formId);
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = disabled;
            if (disabled) {
                submitBtn.style.opacity = '0.5';
                submitBtn.style.cursor = 'not-allowed';
            } else {
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            }
        }
    }
}

// ==================== UTILITY FUNCTIONS ==================== 

function showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.maxWidth = '400px';
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        fadeOutElement(alertDiv);
    }, 3000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phoneNumber;
}

// ==================== EXPORT UTILITIES ==================== 

function exportTableToCSV(filename = 'export.csv') {
    const table = document.querySelector('.table');
    if (!table) {
        alert('No table found to export');
        return;
    }

    let csv = [];
    const rows = table.querySelectorAll('tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td, th');
        const rowData = Array.from(cells).map(cell => {
            let data = cell.textContent.trim();
            // Escape quotes and wrap in quotes if contains comma
            data = data.replace(/"/g, '""');
            return `"${data}"`;
        });
        csv.push(rowData.join(','));
    });

    downloadCSV(csv.join('\n'), filename);
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// ==================== PRINT UTILITIES ==================== 

function printPage() {
    window.print();
}

function printTable() {
    const table = document.querySelector('.table');
    if (!table) {
        alert('No table found to print');
        return;
    }

    const printWindow = window.open('', '', 'width=900,height=600');
    printWindow.document.write('<html><head><title>Print Table</title>');
    printWindow.document.write('<style>body { font-family: Arial, sans-serif; }');
    printWindow.document.write('table { border-collapse: collapse; width: 100%; }');
    printWindow.document.write('th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }');
    printWindow.document.write('th { background-color: #f5f5f5; }');
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(table.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

// ==================== MODAL UTILITIES ==================== 

function showModal(title, content, callback = null) {
    const modal = document.createElement('div');
    modal.id = 'customModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        max-width: 500px;
        width: 90%;
    `;

    modalContent.innerHTML = `
        <h2 style="margin-bottom: 1rem; color: #1a1a2e;">${title}</h2>
        <div style="margin-bottom: 1.5rem; color: #666;">${content}</div>
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button class="modal-cancel" style="
                padding: 0.6rem 1.5rem;
                background: #999;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 600;
            ">Cancel</button>
            <button class="modal-confirm" style="
                padding: 0.6rem 1.5rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 600;
            ">Confirm</button>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.querySelector('.modal-cancel').addEventListener('click', () => {
        modal.remove();
    });

    modal.querySelector('.modal-confirm').addEventListener('click', () => {
        modal.remove();
        if (callback) callback();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ==================== DASHBOARD CHART UTILITIES ==================== 

function initializeDashboardCharts() {
    // This function can be extended to include chart libraries like Chart.js
    console.log('Dashboard charts initialized');
}

// ==================== PAGE-SPECIFIC UTILITIES ==================== 

function initializeLoginPage() {
    const form = document.querySelector('form');
    if (form) {
        const usernameInput = form.querySelector('input[name="username"]');
        const passwordInput = form.querySelector('input[name="password"]');

        if (usernameInput) {
            usernameInput.addEventListener('input', function() {
                this.value = this.value.trim();
            });
        }

        if (passwordInput) {
            passwordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    form.submit();
                }
            });
        }
    }
}

function initializeStudentForm() {
    const form = document.querySelector('form');
    if (form) {
        const studentIdInput = form.querySelector('input[name="student_id"]');
        const emailInput = form.querySelector('input[name="s_email"]');
        const phoneInput = form.querySelector('input[name="s_phone"]');

        // Format student ID to uppercase
        if (studentIdInput) {
            studentIdInput.addEventListener('input', function() {
                this.value = this.value.toUpperCase();
            });
        }

        // Real-time email validation
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !isValidEmail(this.value)) {
                    showInputError(this, 'Invalid email format');
                }
            });
        }

        // Real-time phone validation
        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                if (this.value && !isValidPhone(this.value)) {
                    showInputError(this, 'Invalid phone number');
                }
            });
        }
    }
}

// ==================== INITIALIZE ON PAGE LOAD ==================== 

window.addEventListener('load', function() {
    // Determine which page we're on and initialize accordingly
    const currentPath = window.location.pathname;

    if (currentPath.includes('login')) {
        initializeLoginPage();
    } else if (currentPath.includes('student')) {
        initializeStudentForm();
    } else if (currentPath.includes('dashboard')) {
        initializeDashboardCharts();
    }

    highlightRowOnHover();
});
