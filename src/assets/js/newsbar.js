(function () {
    const STORAGE_KEY = 'newsbar-state';
    const EXPIRY_DAYS = 7;

    function shouldShowNewsbar() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return true;

        const state = JSON.parse(stored);
        const newsbarElement = document.querySelector('.newsbar');
        if (!newsbarElement) return false;  // Safety check
        
        const currentVersion = parseInt(newsbarElement.dataset.version);
        
        // Show if version changed or 7 days passed
        const isExpired = Date.now() - state.dismissedAt > EXPIRY_DAYS * 24 * 60 * 60 * 1000;
        const isNewVersion = currentVersion > state.version;
        
        return isExpired || isNewVersion;
    }

    globalThis.closeNewsbar = function () {
        const newsbarElement = document.querySelector('.newsbar');
        const version = parseInt(newsbarElement.dataset.version);
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            dismissedAt: Date.now(),
            version: version
        }));
        
        document.documentElement.classList.remove('show-newsbar');
    };

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        if (shouldShowNewsbar()) {
            document.documentElement.classList.add('show-newsbar');
        }
    });
})();