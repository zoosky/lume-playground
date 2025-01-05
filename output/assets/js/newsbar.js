(function () {
    const STORAGE_KEY = 'newsbar-state';

    function initializeNewsbar() {
        console.log('Initializing newsbar...');

        const state = localStorage.getItem(STORAGE_KEY);
        console.log('Current localStorage state:', state);

        const newsbarElement = document.querySelector('.newsbar');
        console.log('Newsbar element:', newsbarElement);

        const currentVersion = parseInt(newsbarElement.dataset.version);
        console.log('Current version:', currentVersion);

        if (state) {
            const parsedState = JSON.parse(state);
            console.log('Parsed state:', parsedState);

            const { dismissedAt, version } = parsedState;
            const storedVersion = parseInt(version);

            const expired = Date.now() - dismissedAt > getExpiryDays() * 24 * 60 * 60 * 1000;

            console.log({
                storedVersion,
                currentVersion,
                dismissedAt: new Date(dismissedAt),
                expired,
                showNewbar: !dismissedAt || currentVersion > storedVersion || expired
            });

            if (!dismissedAt || currentVersion > storedVersion || expired) {
                console.log('Showing newsbar...');
                document.documentElement.classList.add('show-newsbar');
            }
        } else {
            console.log('No stored state, showing newsbar...');
            document.documentElement.classList.add('show-newsbar');
        }
    }

    function getExpiryDays() {
        return parseInt(document.querySelector('.newsbar').dataset.expiry) || 7;
    }

    globalThis.closeNewsbar = function () {
        console.log('Closing newsbar...');
        document.documentElement.classList.remove('show-newsbar');
        const version = document.querySelector('.newsbar').dataset.version;
        const newState = {
            dismissedAt: Date.now(),
            version: parseInt(version)
        };
        console.log('Storing new state:', newState);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    };

    if (document.querySelector('.newsbar')) {
        initializeNewsbar();
    } else {
        console.log('No newsbar element found');
    }
})();