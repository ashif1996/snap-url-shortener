document.addEventListener('DOMContentLoaded', () => {
    const spinner = document.getElementById('loader');

    const showLoader = () => {
        spinner.style.display = 'flex';  // Show the loader
        spinner.setAttribute('aria-busy', 'true');
    };

    const hideLoader = () => {
        spinner.style.display = 'none';  // Hide the loader
        spinner.removeAttribute('aria-busy');
    };

    const displayErrors = (fieldId, message) => {
        const errorElement = document.getElementById(`${fieldId}Error`);
        const inputElement = document.getElementById(fieldId);

        if (errorElement) {
            errorElement.textContent = message;
        }

        if (inputElement) {
            inputElement.classList.add('error-border');
        }
    };

    const clearErrors = () => {
        document.querySelectorAll('.error-message').forEach((error) => {
            error.textContent = '';
        });

        document.querySelectorAll('.error-border').forEach((input) => {
            input.classList.remove('error-border');
        });
    };

    const validateUrlForm = () => {
        const url = document.getElementById('urlInput').value.trim();
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/;

        clearErrors();

        if (!url) {
            displayErrors('urlInput', "URL is required.");
            return false;
        }

        if (!urlPattern.test(url)) {
            displayErrors('urlInput', "Please enter a valid URL.");
            return false;
        }

        return true;

    };

    const handleFormSubmit = async (form, endpoint, method, successRedirectUrl) => {
        const formData = new FormData(form);
        const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

        showLoader();

        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            });
            
            const data = await response.json();
            hideLoader();

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: data.message,
                }).then(() => {
                    window.location.href = successRedirectUrl;
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message,
                });
            }
        } catch (error) {
            hideLoader();

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while processing the request',
            });
        }
    };

    const urlForm = document.getElementById('urlForm');
    if (urlForm) {
        urlForm.addEventListener('submit', (event) => {
            event.preventDefault();
    
            const isValidUrlForm = validateUrlForm();
            if (isValidUrlForm) {
                handleFormSubmit(urlForm, '/shorten-url', 'POST', '/shortened-url');
            }
        });
    }
});