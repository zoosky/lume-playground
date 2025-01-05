const STORAGE_KEY = 'newsbar-state';
const EXPIRY_DAYS = 7;

function shouldShowNewsbar() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return true;

    const state = JSON.parse(stored);
    const newsbarElement = document.querySelector('.newsbar');

    // Check if newsbarElement exists before accessing its properties
    if (!newsbarElement) {
        console.warn("Warning: No element with class 'newsbar' found. Assuming newsbar should be shown.");
        return true; // Or return false if you don't want to show in this case
    }

    const currentVersion = parseInt(newsbarElement.dataset.version);
    if (isNaN(currentVersion)) {
        console.warn("Warning: dataset.version was not an integer. Assuming it was 0.");
        currentVersion = 0;
    }
    // Show if version changed or 7 days passed
    const isExpired = Date.now() - state.dismissedAt > EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    const isNewVersion = currentVersion > state.version;

    return isExpired || isNewVersion;
}

// Example of how you might call it (ensure it's after the HTML loads)
window.addEventListener('DOMContentLoaded', (event) => {
    if (shouldShowNewsbar()) {
        const newsbar = document.querySelector('.newsbar');
        if (newsbar) {
            newsbar.classList.add('show-newsbar'); //or whatever you need to do to make the element visible
        }
    }
});

// Example of how to set up dataset.version in html

// <div class="newsbar" data-version="1">Newsbar Content</div>