// Google Analytics 4 + Meta Pixel, chargés seulement après consentement (Loi 25).
// Sans ID ci-dessous : aucun bandeau, aucun script chargé.
(function () {
    var GA_ID = 'G-2ZQEP38C8C';     // ex. 'G-XXXXXXXXXX'
    var PIXEL_ID = '';  // ex. '123456789012345'
    if (!GA_ID && !PIXEL_ID) return;

    var KEY = 'dstl-consent';
    function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
    function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

    function load() {
        if (GA_ID) {
            var s = document.createElement('script');
            s.async = true;
            s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
            document.head.appendChild(s);
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () { dataLayer.push(arguments); };
            gtag('js', new Date());
            gtag('config', GA_ID);
        }
        if (PIXEL_ID) {
            !function (f, b, e, v, n, t, s) {
                if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
                if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
                t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
            }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', PIXEL_ID);
            fbq('track', 'PageView');
        }
        // Conversions : envoi du formulaire de contact, clic courriel/téléphone
        function lead(method) {
            if (window.gtag) gtag('event', 'generate_lead', { method: method });
            if (window.fbq) fbq('track', method === 'form' ? 'Lead' : 'Contact');
        }
        document.addEventListener('submit', function () { lead('form'); }, true);
        document.addEventListener('click', function (e) {
            var a = e.target.closest && e.target.closest('a[href^="mailto:"], a[href^="tel:"]');
            if (a) lead(a.protocol.replace(':', ''));
        }, true);
    }

    var consent = get();
    if (consent === 'yes') return load();
    if (consent === 'no') return;

    function banner() {
        var d = document.createElement('div');
        d.setAttribute('role', 'dialog');
        d.setAttribute('aria-label', 'Consentement aux témoins');
        d.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:560px;margin:0 auto;padding:16px 20px;background:#1a1a1a;color:#fff;border:1px solid #c8a45c;border-radius:10px;font:14px/1.5 system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.5)';
        d.innerHTML = '<p style="margin:0 0 12px">Ce site utilise des témoins (cookies) pour mesurer l\'achalandage et la performance des publicités. Vous pouvez accepter ou refuser.</p>' +
            '<button data-c="yes" style="background:#c8a45c;color:#0a0a0a;border:0;border-radius:6px;padding:8px 18px;font-weight:600;cursor:pointer;margin-right:8px">Accepter</button>' +
            '<button data-c="no" style="background:transparent;color:#fff;border:1px solid #9a9a9a;border-radius:6px;padding:8px 18px;cursor:pointer">Refuser</button>';
        d.addEventListener('click', function (e) {
            var c = e.target.getAttribute('data-c');
            if (!c) return;
            set(c);
            d.remove();
            if (c === 'yes') load();
        });
        document.body.appendChild(d);
    }
    if (document.body) banner(); else document.addEventListener('DOMContentLoaded', banner);
})();
