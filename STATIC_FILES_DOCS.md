# Static Files Documentation

## Overview
This document provides detailed information about the CSS and JavaScript files used in the Student Management System.

---

## Directory Structure

```
static/
├── css/
│   └── style.css
└── js/
    └── script.js
```

---

## CSS Stylesheet (style.css)

### 1. **General Styles**
- Body styling with gradient background
- Color scheme: Purple gradient (667eea to 764ba2)
- Font: Segoe UI with fallbacks
- Smooth scrolling enabled

### 2. **Navbar Styles**
- Dark gradient background (#1a1a2e to #16213e)
- Cyan accent color (#00d4ff) for active links
- Sticky positioning
- Hover effects with smooth transitions
- Responsive design

### 3. **Authentication Page Styles (Login)**
```css
.login-box - Main login container
.login-box input - Form input fields with focus states
.login-box button - Submit button with gradient background
```

**Features:**
- Centered login box with elevation shadow
- Smooth animations on page load
- Input focus states with border color change
- Button hover effects with shadow

### 4. **Dashboard Styles**
```css
.dashboard-container - Main container with padding
.page-title - Large heading with text shadow
.stats-grid - Responsive grid layout (3 columns, auto-fit)
.stat-card - Individual statistics card
```

**Cards:**
- Students Card: Cyan border (#00d4ff)
- Courses Card: Red border (#ff6b6b)
- Users Card: Green border (#51cf66)

**Features:**
- Hover effects with transform and shadow
- Responsive grid adapts to screen size
- Color-coded cards for quick identification

### 5. **Table Styles**
```css
.table-container - White container with shadow
.table - Full-width data table
.table thead - Header with light gray background
.table tbody tr - Hover effect on rows
```

**Button Styles:**
- `.btn-view` - Blue (#667eea)
- `.btn-edit` - Yellow (#ffc107)
- `.btn-delete` - Red (#ff6b6b)
- `.btn-add` - Gradient (primary color)

### 6. **Form Styles**
```css
.form-container - Max-width 600px, centered
.form-group - Input wrapper with consistent spacing
.form-group input/select/textarea - Full-width form elements
.form-button - Primary action button
.form-button-secondary - Secondary action button (gray)
```

**Features:**
- Focus states with border and shadow
- Responsive layout
- Consistent padding and spacing
- Textarea with minimum height

### 7. **Search Styles**
```css
.search-container - Flex layout with gap
.search-input - Flexible input field
.search-button - White background with gradient text
```

### 8. **Student Details Styles**
```css
.details-container - Main container
.details-header - Header with border and flex layout
.details-grid - Responsive grid for student info
.detail-item - Individual detail card
```

### 9. **Alert Styles**
```css
.alert - Base alert styles
.alert-success - Green background (#d4edda)
.alert-danger - Red background (#f8d7da)
.alert-info - Blue background (#d1ecf1)
.alert-warning - Yellow background (#fff3cd)
```

### 10. **Animations**
```css
@keyframes slideUp - Elements fade in and move up
@keyframes slideDown - Elements fade in and move down
@keyframes fadeIn - Simple fade-in effect
```

### 11. **Responsive Design**
- **Tablet (≤768px):** Single column layouts, adjusted font sizes
- **Mobile (≤480px):** Full-width buttons, stacked elements

---

## JavaScript File (script.js)

### 1. **Initialization Functions**

#### `initializeEventListeners()`
Sets up all event listeners when DOM loads:
- Delete confirmation dialogs
- Form validation
- Alert closing functionality

```javascript
// Automatically called on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    closeAlertsAfterDelay();
    validateFormOnSubmit();
    initializeSearch();
});
```

### 2. **Search Functionality**

#### `initializeSearch()`
Sets up search input and button:
- Click handler on search button
- Enter key listener on input field
- Triggers `performSearch()`

#### `performSearch(e)`
Validates search query and redirects with search parameter:
```javascript
// Example: ?search=John
window.location.href = `${currentUrl}?search=${encodeURIComponent(query)}`;
```

### 3. **Delete Confirmation**

#### `confirmDelete(e)`
Prevents deletion without confirmation:
```javascript
// Shows: "Are you sure you want to delete this record?"
// Returns false if user cancels
// Returns true if user confirms
```

### 4. **Form Validation**

#### `validateForm(form)`
Validates all required fields in a form:
- Returns `true` if all valid
- Returns `false` if any invalid
- Calls `showInputError()` for invalid fields

#### `validateInput(input)`
Validates individual input:
- Checks if required
- Validates email format
- Validates phone number format

#### `isValidEmail(email)`
Regex pattern: `^[^\s@]+@[^\s@]+\.[^\s@]+$`
```javascript
// Valid: user@example.com
// Invalid: user@, @example.com, user example@com
```

#### `isValidPhone(phone)`
Regex pattern: `^[\d\s\-\+\(\)]{10,15}$`
```javascript
// Valid: (123) 456-7890, 123-456-7890, +1 123 456 7890
// Invalid: 12345, too short
```

#### `showInputError(input, message)`
Shows visual error state:
```javascript
// Sets border color to red (#ff6b6b)
// Adds box shadow
// Optionally adds error message below input
```

#### `clearInputError(input)`
Clears error state:
```javascript
// Resets border and shadow
// Removes error message if present
```

### 5. **Alert Handling**

#### `closeAlertsAfterDelay()`
Auto-closes alerts after 5 seconds:
```javascript
// Fades out alert messages automatically
// Smooth transition effect
```

#### `fadeOutElement(element)`
Fades element with opacity transition:
```javascript
// Sets opacity to 0
// Removes element after transition
```

#### `showNotification(message, type = 'info')`
Creates temporary notification:
```javascript
// Types: 'success', 'danger', 'info', 'warning'
// Position: fixed top-right
// Auto-dismisses after 3 seconds

showNotification('Student added successfully!', 'success');
```

### 6. **Table Utilities**

#### `highlightRowOnHover()`
Adds hover effect to table rows:
```javascript
// Changes background on mousenter
// Resets on mouseleave
```

#### `sortTable(columnIndex, isNumeric = false)`
Sorts table by column:
```javascript
sortTable(0, false); // Sort column 0 as string
sortTable(2, true);  // Sort column 2 as number
```

#### `exportTableToCSV(filename = 'export.csv')`
Exports table data to CSV:
```javascript
// Escapes quotes in data
// Downloads file automatically
exportTableToCSV('students.csv');
```

#### `printTable()`
Opens print dialog for table:
```javascript
// Opens table in new window
// Applies print-friendly styling
// Triggers print dialog
```

### 7. **Form Utilities**

#### `resetFormFields(formId)`
Clears form and error messages:
```javascript
resetFormFields('studentForm');
```

#### `disableSubmitButton(formId, disabled = true)`
Disables/enables form submit button:
```javascript
disableSubmitButton('studentForm', true);   // Disable
disableSubmitButton('studentForm', false);  // Enable
```

### 8. **Utility Functions**

#### `formatDate(dateString)`
Formats date for display:
```javascript
// Input: '2024-01-15'
// Output: 'January 15, 2024'
```

#### `formatPhoneNumber(phoneNumber)`
Formats 10-digit phone:
```javascript
// Input: '1234567890'
// Output: '(123) 456-7890'
```

### 9. **Modal Utilities**

#### `showModal(title, content, callback = null)`
Creates custom modal dialog:
```javascript
showModal(
    'Confirm Delete',
    'Are you sure?',
    () => { /* delete item */ }
);
```

**Features:**
- Backdrop click to close
- Cancel button
- Confirm button with optional callback
- Responsive design

### 10. **Page-Specific Initialization**

#### `initializeLoginPage()`
Login page setup:
- Trims username input
- Enter key submits form
- Focus management

#### `initializeStudentForm()`
Student form setup:
- Converts student ID to uppercase
- Real-time email validation
- Real-time phone validation
- Error message display

#### `initializeDashboardCharts()`
Dashboard chart setup:
```javascript
// Placeholder for Chart.js integration
// Can be extended for data visualization
```

---

## Usage in HTML Templates

### Include in Base Template
```html
<head>
    <!-- CSS -->
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>

<body>
    <!-- Content -->

    <!-- JavaScript -->
    <script src="{{ url_for('static', filename='js/script.js') }}"></script>
</body>
```

### Using Classes in Templates

**Forms:**
```html
<div class="form-container">
    <form>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
        </div>
        <button type="submit" class="form-button">Submit</button>
    </form>
</div>
```

**Buttons:**
```html
<a href="/edit/1" class="btn-edit">Edit</a>
<button class="btn-delete">Delete</button>
<a href="/add" class="btn-add">Add New</a>
```

**Alerts:**
```html
{% with messages = get_flashed_messages(with_categories=true) %}
    {% if messages %}
        {% for category, message in messages %}
            <div class="alert alert-{{ category }}">
                {{ message }}
            </div>
        {% endfor %}
    {% endif %}
{% endwith %}
```

**Tables:**
```html
<div class="table-container">
    <div class="table-header">
        <h3>Students</h3>
        <a href="/add_student" class="btn-add">Add Student</a>
    </div>
    <table class="table">
        <!-- Table content -->
    </table>
</div>
```

---

## Key Features

### 1. **Responsive Design**
- Mobile-first approach
- Breakpoints at 768px and 480px
- Flexible grids and layouts

### 2. **Accessibility**
- Semantic HTML
- Color contrast compliance
- Keyboard navigation support
- Form labels and ARIA attributes

### 3. **Performance**
- Minimal CSS with no external dependencies
- Lightweight JavaScript
- Smooth animations using CSS transitions
- No jQuery required

### 4. **Security**
- Input validation on client-side
- CSRF protection via Flask
- Password hashing (server-side)

### 5. **User Experience**
- Visual feedback on interactions
- Smooth animations
- Clear error messages
- Auto-dismissing alerts

---

## Color Scheme

| Element | Primary | Secondary | Accent |
|---------|---------|-----------|--------|
| Navbar | #1a1a2e | #16213e | #00d4ff |
| Buttons | #667eea | #764ba2 | - |
| Success | #51cf66 | #d4edda | - |
| Error | #ff6b6b | #f8d7da | - |
| Warning | #ffc107 | #fff3cd | - |
| Info | #667eea | #d1ecf1 | - |

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

## Tips for Extension

1. **Adding Custom CSS:**
```html
{% block extra_css %}
    <style>
        /* Your custom styles */
    </style>
{% endblock %}
```

2. **Adding Custom JavaScript:**
```html
{% block extra_js %}
    <script>
        // Your custom code
    </script>
{% endblock %}
```

3. **Using Utility Functions:**
```javascript
// Show notification
showNotification('Success!', 'success');

// Validate form
if (validateForm(myForm)) {
    myForm.submit();
}

// Print table
printTable();
```

---

## Troubleshooting

### Styles not loading?
- Check file path in template: `{{ url_for('static', filename='css/style.css') }}`
- Verify Flask app has `static` folder
- Clear browser cache

### JavaScript not working?
- Check browser console for errors
- Verify script is included in template
- Check element IDs match JavaScript selectors
- Ensure DOM is loaded before running code

### Form validation not working?
- Add `required` attribute to inputs
- Check input `type` and `name` attributes
- Verify form has `id` for reference

---

## File Sizes

- `style.css`: ~15 KB (minified: ~12 KB)
- `script.js`: ~18 KB (minified: ~14 KB)
- **Total**: ~33 KB (minified: ~26 KB)

---

**Last Updated:** January 2024
**Version:** 1.0
