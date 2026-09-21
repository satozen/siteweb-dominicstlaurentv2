// Banque de témoignages — de VRAIS commentaires reçus par Dominic (courriels de clients et de diffuseurs).
// Règles : le texte entre guillemets est mot pour mot ([…] = passage coupé), positifs seulement,
// prénom + initiale, aucun détail de santé sur des tiers. Compilation complète avec sources :
// notes-internes/temoignages-source.md (hors dépôt).
//
// Usage dans une page : <div data-temoignages="residences" data-max="4"></div>
(function () {
    var TEMOIGNAGES = [
        {
            tags: ['residences', 'accueil'],
            texte: 'Il a dynamité la place. Rythme, culbutes, jonglage, humour. Je n\'ai que des éloges des résidents et des familles.',
            auteur: 'Claude S.', role: 'Mgr-Coderre', date: '2022'
        },
        {
            tags: ['residences', 'accueil'],
            texte: 'Non seulement vous avez su nous épater par vos talents de chanteur et d\'animateur mais aussi pour votre sensibilité à l\'égard des personnes âgées. […] vous avez joué un rôle de véritable magicien pour plusieurs personnes présentes.',
            auteur: 'Stéphane et Monique', role: 'invités au 10e anniversaire de la Ressource Notre-Dame de la Paix'
        },
        {
            tags: ['residences'],
            texte: 'Les résidants émerveillés de leur soirée […] Une prestation incroyable […] Même une de nos résidantes les plus difficiles en termes de spectacle a aimé!',
            auteur: 'Mélanie D.', role: 'technicienne en loisir, Le Symbiose', date: '2023'
        },
        {
            tags: ['residences'],
            texte: 'Une révélation! […] Les résidents en ont parlé toute la journée et le lendemain. Un show de Noël extraordinaire […] Il y avait des transitions sur tout, beaucoup d\'humour et de belle énergie.',
            auteur: 'Commentaire reçu après un spectacle de Noël', role: 'transmis par Productions Kirtap', date: '2016'
        },
        {
            tags: ['residences'],
            texte: 'Je voulais juste prendre le temps de souligner le professionnalisme de Dominic lors de notre soirée dansante […] Nous n\'avons eu que de bons commentaires. C\'est grandement apprécié.',
            auteur: 'Catherine J.', role: 'animatrice en loisirs, Les Bâtisseurs de Cowansville', date: '2026'
        },
        {
            tags: ['residences'],
            texte: 'Les costumes et accessoires ajoutent du sel à ton spectacle.',
            auteur: 'Patrick G.', role: 'Productions Kirtap'
        },
        {
            tags: ['jbl', 'accueil'],
            texte: 'Encore une fois MERCI pour les trois belles représentations en Outaouais, on reçoit beaucoup de commentaires et de félicitations pour le spectacle. Les participants sont enchantés, tous s\'entendent pour dire qu\'ils en auraient pris plus.',
            auteur: 'Francine D.', role: 'Comité des usagers du Centre intégré de l\'Outaouais', date: '2026'
        },
        {
            tags: ['jbl'],
            texte: 'Tu chantes bien, tu animes bien les invités et les gens embarquent facilement […] L\'ambiance est tellement bonne quand tu termines.',
            auteur: 'Francine D.', role: 'Comité des usagers du Centre intégré de l\'Outaouais', date: '2026'
        },
        {
            tags: ['corpo', 'accueil'],
            texte: 'J\'ai eu la chance d\'aller observer l\'heure où le jeu Défi d\'Évasion était en action et que dire!!!! WOW!!! […] La participation dans la salle était incroyable, nous pouvions sentir la compétition!!',
            auteur: 'Sandra B.', role: 'Mantra Pharma — Les Rendez-vous Mantra', date: '2026'
        },
        {
            tags: ['corpo'],
            texte: 'Les résultats sont tout simplement impressionnants, et j\'ai le bonheur de constater qu\'ils reflètent l\'ampleur de la préparation et des efforts investis pour faire de cet événement un véritable succès.',
            auteur: 'Joanie F.', role: 'pharmacienne principale, Mantra Pharma', date: '2026'
        }
    ];

    function esc(s) {
        return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
    }

    function render(box) {
        var tag = box.getAttribute('data-temoignages');
        var max = parseInt(box.getAttribute('data-max'), 10) || 3;
        var items = TEMOIGNAGES.filter(function (t) { return t.tags.indexOf(tag) !== -1; }).slice(0, max);
        box.classList.add('tm-grid');
        box.innerHTML = items.map(function (t) {
            return '<figure class="tm-card"><blockquote>«&nbsp;' + esc(t.texte) + '&nbsp;»</blockquote>' +
                '<figcaption><strong>' + esc(t.auteur) + '</strong><span>' + esc(t.role) + (t.date ? ' · ' + esc(t.date) : '') + '</span></figcaption></figure>';
        }).join('');
    }

    function init() { document.querySelectorAll('[data-temoignages]').forEach(render); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
