fetch('./data/meta.json')
    .then(res => res.json())
    .then(body => {
        const date = new Date(body.lastCache);
        const cacheTimeEl = document.querySelector('.app-loader__cache-time');
        if (cacheTimeEl) {
            cacheTimeEl.innerHTML = `Updated ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        }
    })