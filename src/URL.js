class URL {
    constructor() {
        this.callbacks = [];
        this._updateParams();
        window.addEventListener('popstate', this._updateParams.bind(this));
    }

    _updateParams() {
        const oldParamsString = this.params && this.params.toString();
        const oldHashString = this.hash && this.hash.toString();
        this.params = new URLSearchParams(window.location.search.slice(1));
        this.hash = new URLSearchParams(window.location.hash.slice(1));
        this.callbacks.forEach((f) => f(
            this.params.toString() !== oldParamsString,
            this.hash.toString() !== oldHashString,
        ))
    }

    onPopState(func) {
        this.callbacks.push(func);
    }

    get(dest, key, defaultValue, availableValues) {
        const value = this[dest].get(key);

        console.log(dest, key, defaultValue, availableValues);

        if (!Array.isArray(availableValues) || availableValues.includes(value)) {
            return value;
        }

        return defaultValue || '';
    }

    set(dest, key, value) {
        this[dest].set(key, value);
    }

    pushState() {
        window.history.pushState(null, null, '?' + this.params.toString() + '#' + this.hash.toString());
    }
}

export default new URL();