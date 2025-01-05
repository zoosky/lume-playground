(function () {
    const STORAGE_KEY = 'newsbar-state';

    function initializeNewsbar() {
        const state = localStorage.getItem(STORAGE_KEY);
        const currentVersion = parseInt(document.querySelector('.newsbar').dataset.version);

        if (state) {
            const { dismissedAt, version } = JSON.parse(state);
            const storedVersion = parseInt(version);

            // Show if:
            // 1. Never dismissed OR
            // 2. Version is newer than stored version OR
            // 3. Dismissal has expired
            const expired = Date.now() - dismissedAt > getExpiryDays() * 24 * 60 * 60 * 1000;
            if (!dismissedAt || currentVersion > storedVersion || expired) {
                document.documentElement.classList.add('show-newsbar');
            }
        } else {
            document.documentElement.classList.add('show-newsbar');
        }
    }

    function getExpiryDays() {
        return parseInt(document.querySelector('.newsbar').dataset.expiry) || 7;
    }

    globalThis.closeNewsbar = function () {
        document.documentElement.classList.remove('show-newsbar');
        const version = document.querySelector('.newsbar').dataset.version;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            dismissedAt: Date.now(),
            version: parseInt(version)
        }));
    };

    // Run initialization
    if (document.querySelector('.newsbar')) {
        initializeNewsbar();
    }
})();