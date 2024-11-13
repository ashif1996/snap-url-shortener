document.addEventListener('DOMContentLoaded', () => {
    const shortenedUrlInput = document.getElementById('shortenedUrl');
    const copyButton = document.getElementById('copyButton');

    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(shortenedUrlInput.value);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'URL copied to clipboard!',
                });
                
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to copy URL.',
                });
                
            }
        });
    }
});