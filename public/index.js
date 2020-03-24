var app = new Vue({
    el: '#root',
    data: {
        className: '',
        spec: '',
        classes: {},
        specs: {},
        classesWithSpecs: [],
        chars: [],
        hoveredSpell: 0,
        mode: 'stats',
        fetchMode: '',
    },
    methods: {
        filter() {
            this.chars = [];
            this.fetchMode = 'Fetching characters statistics';
            this.fetchCharsInfo()
                .then(chars => {
                    this.chars = chars.players
                });
        },
        fetchCharsInfo() {
            return fetch(`./data/${this.className}-${this.spec}.json`)
                .then(res => res.json());
        },
        setSpecs(spec) {
            const currentClass = this.classesWithSpecs.find((classInfo) => classInfo.className === this.className);

            if (currentClass) {
                this.specs = currentClass.specs.map(this.stringsToOptions);
                this.spec = currentClass.specs.includes(spec) ? spec : currentClass.specs[0];
            }
        },
        hoveredSpellFrequency() {
            let charsUseSpells = [];
            if (['azeritePowers', 'corrupts'].includes(this.mode)) {
                charsUseSpells = this.chars.map(
                    (char) => char[this.mode].some(
                        (power) => power.name === this.hoveredSpell
                    )
                )
            }

            if (['talents', 'essences'].includes(this.mode)) {
                charsUseSpells = this.chars.map(
                    (char) => char[this.mode].includes(this.hoveredSpell)
                )
            }

            if (this.mode === 'stats') {
                charsUseSpells = this.chars.map(
                    (char) => this.statsToId(char.mainStats) === this.hoveredSpell ||
                        this.statsToId(char.offStats) === this.hoveredSpell ||
                        this.statsToId(char.defStats) === this.hoveredSpell
                )
            }

            return charsUseSpells.reduce((acc, i) => {
                if (i) {
                    acc++;
                }

                return acc;
            }, 0);
        },
        humanify(str) {
            return _.startCase(str);
        },
        stringsToOptions(str) {
            return {
                title: this.humanify(str),
                value: str,
            };
        },
        statsToId(stats) {
            return stats.map(stat => stat.title).join('+');
        }
    },
    beforeMount() {
        fetch('./data/classes.json')
            .then(res => res.json())
            .then((classesWithSpecs) => {
                this.classesWithSpecs = classesWithSpecs;
                this.classes = classesWithSpecs.map(_.get('className')).map(this.stringsToOptions);
                const urlParams = new URLSearchParams(window.location.search);
                this.className = urlParams.get('class') || this.classes[0].value;
                this.setSpecs(urlParams.get('spec'));
                this.filter();
            });
    },
    updated() {
        const wowheadLinks = Array.from(this.$el.querySelectorAll('[data-wowhead]'))
            .filter((link) => !link.attributes["data-wh-icon-added"]);
        if (wowheadLinks.length) {
            $WowheadPower.init();
        }
    }
});