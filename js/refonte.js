// Refonte 2026 — apparitions au défilement, compteurs, nav, bandeau défilant, hero caméléon.
(function () {
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('js-rv');

    function ready(fn) {
        if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {
        /* ── Titres : on enveloppe le texte pour la révélation par masque ── */
        document.querySelectorAll('.section-title, .cam-name').forEach(function (t) {
            if (t.querySelector('.rv-mask')) return;
            var lines = t.classList.contains('cam-name') ? Array.from(t.children) : [t];
            lines.forEach(function (el, i) {
                var inner = document.createElement('span');
                while (el.firstChild) inner.appendChild(el.firstChild);
                var mask = document.createElement('span');
                mask.className = 'rv-mask';
                mask.style.setProperty('--i', i);
                mask.appendChild(inner);
                el.appendChild(mask);
            });
            t.classList.add('rv-title');
        });

        /* ── Apparitions : .rv + décalage en cascade entre frères ── */
        var sel = '.section-intro, .showcase-card, .stat-item, .video-card, .video-item, .press-feature, .press-card,' +
            ' .bio-content > *, .bio-production, .featured-video-wrapper, .contact-container > *, .logo-carousel,' +
            ' .cam-kicker, .cam-role, .cam-desc, .cam-cta, .cam-picker';
        var items = Array.from(document.querySelectorAll(sel)).filter(function (el) {
            return !el.classList.contains('animate-on-scroll');
        });
        items.forEach(function (el) {
            el.classList.add('rv');
            var sibs = Array.from(el.parentNode.children).filter(function (s) { return s.matches(sel); });
            el.style.setProperty('--i', Math.min(sibs.indexOf(el), 6));
        });
        // Le hero joue en séquence après le nom
        ['.cam-kicker', '.cam-role', '.cam-desc', '.cam-cta', '.cam-picker'].forEach(function (s, i) {
            var el = document.querySelector(s);
            if (el) el.style.setProperty('--i', s === '.cam-kicker' ? 0 : i + 3);
        });

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                e.target.classList.add('in');
                if (e.target.classList.contains('stat-item')) countUp(e.target.querySelector('.stat-number'));
                io.unobserve(e.target);
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
        items.concat(Array.from(document.querySelectorAll('.rv-title'))).forEach(function (el) {
            // Le hero joue dès le chargement; le reste attend d'entrer à l'écran
            if (el.closest('.cam-hero')) requestAnimationFrame(function () { el.classList.add('in'); });
            else io.observe(el);
        });

        /* ── Compteurs : « 1000+ » monte à partir de zéro ── */
        function countUp(el) {
            if (!el || reduce) return;
            var m = el.textContent.trim().match(/^(\d+)(.*)$/);
            if (!m) return;
            var target = +m[1], suffix = m[2], t0 = performance.now(), dur = 1600;
            (function tick(now) {
                var p = Math.min((now - t0) / dur, 1);
                el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4))) + suffix;
                if (p < 1) requestAnimationFrame(tick);
            })(t0);
        }

        /* ── Nav : se cache en descendant, revient en montant ── */
        var header = document.querySelector('header'), lastY = scrollY;
        if (header) {
            addEventListener('scroll', function () {
                var y = scrollY, menuOpen = document.querySelector('.nav-links.show');
                header.classList.toggle('nav-hidden', y > 400 && y > lastY && !menuOpen);
                lastY = y;
            }, { passive: true });
        }

        /* ── Bandeau de crédibilité défilant (bureau seulement, si animations permises) ── */
        var strip = document.querySelector('.credibility-strip'), row = strip && strip.querySelector('.credibility-items');
        if (row && !reduce && matchMedia('(min-width: 769px)').matches) {
            Array.from(row.children).concat(Array.from(row.children)).concat(Array.from(row.children)).forEach(function (c) {
                var clone = c.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                row.appendChild(clone);
            });
            strip.classList.add('is-marquee');
        }

        cameleon();
    });

    /* ═════ Hero caméléon : un éventail de personnages, la souris choisit lequel s'avance ═════ */
    function cameleon() {
        var stage = document.querySelector('.cam-stage');
        if (!stage) return;
        var figs = Array.from(stage.querySelectorAll('.cam-fig'));
        var word = document.querySelector('.cam-role-word');
        var dots = Array.from(document.querySelectorAll('.cam-dots button'));
        var home = Math.floor(figs.length / 2), current = home, timer = null;
        if (word && word.firstElementChild) word.style.width = word.firstElementChild.offsetWidth + 2 + 'px';
        var spread = parseFloat(getComputedStyle(stage).getPropertyValue('--spread')) || 9;

        function show(i) {
            i = (i + figs.length) % figs.length;
            if (i === current) return;
            figs[current].classList.remove('is-active');
            figs[i].classList.add('is-active');
            dots.forEach(function (d, k) { d.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
            current = i;
            if (word) swapWord(figs[i].dataset.role);
        }

        // Un seul mot visible à la fois : tout ce qui est déjà là sort, puis est retiré
        function swapWord(text) {
            Array.from(word.children).forEach(function (old) {
                if (reduce) { old.remove(); return; }
                old.classList.add('out');
                setTimeout(function () { old.remove(); }, 500);
            });
            var neu = document.createElement('span');
            neu.textContent = text;
            word.appendChild(neu);
            word.style.width = neu.offsetWidth + 2 + 'px';
            if (reduce) return;
            neu.className = 'pre';
            neu.getBoundingClientRect(); // fixe le point de départ avant la transition
            neu.className = '';
        }

        // L'angle entre le pointeur et le pivot de l'éventail désigne le personnage.
        // (Les images se chevauchent et leurs zones transparentes aussi : viser par rectangle serait imprécis.)
        function pick(e) {
            var r = stage.getBoundingClientRect(), fh = figs[home].offsetHeight;
            var px = figs[home].offsetLeft + figs[home].offsetWidth / 2 + r.left;
            var py = r.top + figs[home].offsetTop + fh; // le rivet : transform-origin 50% 100%
            var deg = Math.atan2(e.clientX - px, py - e.clientY) * 180 / Math.PI;
            var k = Math.round(deg / spread);
            return Math.min(Math.max(k + home, 0), figs.length - 1);
        }
        stage.addEventListener('pointermove', function (e) {
            if (e.pointerType !== 'mouse') return;
            stop(); show(pick(e));
        });
        stage.addEventListener('pointerleave', function (e) {
            if (e.pointerType === 'mouse') start(); // on reprend le défilement là où la souris l'a laissé
        });
        stage.addEventListener('click', function (e) { stop(); show(pick(e)); start(); });
        dots.forEach(function (d, k) {
            d.addEventListener('click', function () { stop(); show(k); start(); });
        });

        // Au repos, les personnages s'avancent à tour de rôle
        function start() { if (!reduce && !timer && !document.hidden) timer = setInterval(function () { show(current + 1); }, 2800); }
        function stop() { clearInterval(timer); timer = null; }
        document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

        // L'éventail s'ouvre une fois les images prêtes
        var pending = figs.filter(function (f) { return !f.complete; }).length;
        function open() {
            var hero = stage.closest('.cam-hero');
            if (hero) hero.classList.add('is-in'); // le manche apparaît
            setTimeout(function () {
                stage.classList.add('is-open'); // les lames se déplient une à une
                setTimeout(function () { stage.classList.add('is-ready'); start(); }, reduce ? 0 : 1900);
            }, reduce ? 0 : 700);
        }
        if (!pending) open();
        else figs.forEach(function (f) {
            if (f.complete) return;
            f.addEventListener('load', done); f.addEventListener('error', done);
            function done() { if (--pending === 0) open(); }
        });
        setTimeout(function () { if (!stage.classList.contains('is-open')) open(); }, 4000); // filet de sécurité
    }
})();
