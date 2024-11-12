document.addEventListener('DOMContentLoaded', () => {
    const shortenedUrlInput = document.getElementById('shortenedUrl');
    const copyButton = document.getElementById('copyButton');
    const successMessage = document.getElementById('successMessage');

    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(shortenedUrlInput.value);
                
                successMessage.textContent = 'URL copied to clipboard!';
                successMessage.style.display = 'block';
                successMessage.style.color = 'green';
            } catch (error) {
                successMessage.textContent = 'Failed to copy URL.';
                successMessage.style.display = 'block';
                successMessage.style.color = 'red';
            }
        });
    }
});