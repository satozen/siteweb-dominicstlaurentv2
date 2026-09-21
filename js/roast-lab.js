/**
 * Roast Lab Interactive Demo
 * Gère l'interactivité de la section "Roast Lab" sur les pages corpo et mariages
 * - Onglets pour changer d'exemple
 * - Rendu en paires « Vous me dites → Sur scène, ça donne »
 */

(function() {
    'use strict';
    
    // Données des exemples de roasts
    const roastExamples = {
        mariage: {
            title: "Mariage de Julie & Marc",
            questionnaire: [
                { 
                    label: "Surnom du marié", 
                    value: "\"Le GPS Humain\" — Marc se perd même dans son propre quartier", 
                    type: "surnom" 
                },
                { 
                    label: "Anecdote mémorable", 
                    value: "Leur premier date: Marc a réservé au mauvais resto. Ils ont mangé des hot-dogs dans un parc.", 
                    type: "anecdote" 
                },
                { 
                    label: "Trait de personnalité", 
                    value: "Julie est TOUJOURS en avance. Marc? On le cherche encore.", 
                    type: "trait" 
                },
                { 
                    label: "Passion commune", 
                    value: "Fans finis de Occupation Double. Ils analysent les épisodes comme des thèses de doctorat.", 
                    type: "passion" 
                },
                { 
                    label: "Inside joke du groupe", 
                    value: "\"Check tes DMs!\" — Marc a déjà envoyé un message à la mauvaise Julie sur Facebook.", 
                    type: "inside" 
                }
            ],
            roast: `Mesdames et messieurs, on est réunis ce soir pour célébrer <span class="tag-surnom">le GPS Humain</span> et la femme assez brave pour le suivre... même s'il se perd dans son propre quartier!
<br><br>
Parlons de leur premier rendez-vous. Marc, le romantique, avait tout planifié: chandelles, belle nappe... sauf qu'il s'est trompé de restaurant! Résultat? <span class="tag-anecdote">Des hot-dogs dans un parc</span>. Et Julie l'a quand même rappelé. Ça, c'est de l'amour inconditionnel... ou du désespoir, on sait pas trop!
<br><br>
Ce qui est beau avec ces deux-là, c'est l'équilibre. <span class="tag-trait">Julie arrive toujours 15 minutes d'avance. Marc? On le cherche encore.</span> Ensemble, ils arrivent presque à l'heure!
<br><br>
Et parlant de couple goals, ces deux-là <span class="tag-passion">analysent Occupation Double comme des thèses de doctorat</span>. "Non mais t'as vu le micro-expression de Kevin à 23:47?" C'est cute pareil.
<br><br>
Ah, et avant que j'oublie... <span class="tag-inside">Marc, CHECK TES DMs!</span> On veut pas que tu textes la mauvaise Julie encore! 
<br><br>
Santé aux mariés! 🥂`
        },
        corpo: {
            title: "Party de Noël - Construction Béton Plus",
            questionnaire: [
                { 
                    label: "Surnom de l'employé vedette", 
                    value: "\"Le Dormeur\" — Gilles s'endort PARTOUT. Meetings, lunch, même debout.", 
                    type: "surnom" 
                },
                { 
                    label: "Anecdote légendaire", 
                    value: "L'été passé, quelqu'un a commandé 500 cônes orange au lieu de 50. Ils sont encore dans le stationnement.", 
                    type: "anecdote" 
                },
                { 
                    label: "Running gag du bureau", 
                    value: "La machine à café est possédée. Elle fait juste du jus de chaussette.", 
                    type: "trait" 
                },
                { 
                    label: "Fait cocasse sur le boss", 
                    value: "Michel le patron chante du Céline Dion dans son char. Tout le monde l'a vu au drive-thru Tim Hortons.", 
                    type: "passion" 
                },
                { 
                    label: "Inside joke de l'équipe", 
                    value: "\"C'est pas dans ma job description\" — phrase préférée de toute l'équipe.", 
                    type: "inside" 
                }
            ],
            roast: `Bonsoir Construction Béton Plus! Content d'être ici ce soir. J'espère que le buffet est meilleur que <span class="tag-trait">votre machine à café</span>. Oui oui, je suis au courant. Jus de chaussette, c'est ça?
<br><br>
Parlons de <span class="tag-surnom">Gilles "Le Dormeur"</span>! Mon homme s'endort partout. Réunions, lunch, debout appuyé sur une pelle. L'autre jour y'a dormi tellement longtemps qu'ils ont coulé le béton autour de lui!
<br><br>
Et qui a commandé <span class="tag-anecdote">500 cônes orange au lieu de 50</span>? Levez la main, on vous juge pas... enfin, un peu quand même. Ça fait 6 mois, ils sont encore dans le parking. Vous pourriez faire un labyrinthe pour le party de Noël!
<br><br>
Ah, et Michel, notre cher patron... On m'a dit que <span class="tag-passion">tu chantes du Céline dans ton char</span>. "ALL BY MYSEEEEELF" au drive-thru du Tim Hortons, ça a été vu par TOUTE la shop!
<br><br>
Mais vous êtes une belle gang. Même si votre phrase préférée c'est <span class="tag-inside">"C'est pas dans ma job description"</span>... On sait que vous vous aimez pareil!
<br><br>
Santé à Béton Plus! 🍻`
        },
        anniversaire: {
            title: "50 ans de Robert",
            questionnaire: [
                { 
                    label: "Surnom historique", 
                    value: "\"Bob la Patate\" — depuis le secondaire, personne sait pourquoi", 
                    type: "surnom" 
                },
                { 
                    label: "Moment épique", 
                    value: "Robert a déjà appelé son prof \"Maman\" en secondaire 3. Devant toute la classe.", 
                    type: "anecdote" 
                },
                { 
                    label: "Manie connue", 
                    value: "Il met du ketchup sur TOUT. Même sur la pizza. Même sur le spaghetti. Même sur les toasts au beurre de peanut.", 
                    type: "trait" 
                },
                { 
                    label: "Collection secrète", 
                    value: "Robert collectionne les cartes de hockey... de 1995. Il pense encore qu'elles vont valoir une fortune.", 
                    type: "passion" 
                },
                { 
                    label: "Phrase signature", 
                    value: "\"Dans MON temps...\" — commence toutes ses histoires comme ça", 
                    type: "inside" 
                }
            ],
            roast: `Mesdames et messieurs, on fête ce soir les 50 ans de <span class="tag-surnom">Bob la Patate</span>! Oui oui, le surnom date du secondaire. Personne sait pourquoi. Même Robert sait pas. Ça va rester un mystère pour toujours!
<br><br>
50 ans! <span class="tag-inside">Dans TON temps</span>, Robert, le internet ça existait pas. Les téléphones avaient des fils. Pis tu portais probablement un mullet. On a des photos, on va les sortir tantôt.
<br><br>
Parlant du secondaire... qui se souvient quand Robert <span class="tag-anecdote">a appelé son prof "Maman"</span>? DEVANT TOUTE LA CLASSE! Sec 3! Il s'en est jamais remis. Nous autres non plus.
<br><br>
Et sa blonde Carole me disait l'autre jour... <span class="tag-trait">Robert met du ketchup sur TOUT</span>. La pizza? Ketchup. Le spaghetti? Ketchup. Les toasts au beurre de peanut? KETCHUP. C'est pas un homme, c'est un distributeur à ketchup!
<br><br>
Ah oui, Robert pense encore que <span class="tag-passion">ses cartes de hockey de 1995</span> vont valoir une fortune. Mon Bob, ça fait 30 ans que t'attends. À date, la collection vaut... 47 dollars.
<br><br>
Mais on t'aime pareil! Bonne fête Bob! 🎂`
        }
    };

    // Version simplifiée : des paires « Vous me dites → Sur scène, ça donne ».
    // Chaque info du questionnaire est jumelée au paragraphe du roast qui porte le même tag
    // (tag-surnom, tag-anecdote…) : le lien se lit d'un coup d'œil, sans survol ni légende.
    var PAIRES_AFFICHEES = 3;

    function initRoastLab() {
        var tabs = document.querySelectorAll('.lab-tab');
        var labContent = document.querySelector('.lab-content');
        if (!tabs.length || !labContent) return;

        function render(key) {
            var ex = roastExamples[key];
            if (!ex) return;
            var paragraphs = ex.roast.split(/<br>\s*<br>/);
            var rows = [];
            ex.questionnaire.forEach(function (field) {
                var line = paragraphs.filter(function (para) { return para.indexOf('tag-' + field.type) !== -1; })[0];
                if (line) rows.push({ field: field, line: line.trim() });
            });
            var html = '<h3 class="example-title">' + ex.title + '</h3><div class="lab-pairs">';
            rows.slice(0, PAIRES_AFFICHEES).forEach(function (r) {
                html += '<div class="lab-pair">' +
                    '<div class="lab-in"><span class="lab-cap">Vous me dites</span>' +
                    '<strong>' + r.field.label + '</strong><p>' + r.field.value + '</p></div>' +
                    '<div class="lab-to" aria-hidden="true"><i class="fas fa-arrow-right"></i></div>' +
                    '<div class="lab-out"><span class="lab-cap">Sur scène, ça donne</span><p>' + r.line + '</p></div>' +
                    '</div>';
            });
            html += '</div><p class="lab-note">Et ça, c\'est avec trois réponses. Imaginez avec votre questionnaire au complet.</p>';
            labContent.innerHTML = html;
        }

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) { t.classList.remove('active'); });
                tab.classList.add('active');
                render(tab.getAttribute('data-example'));
            });
        });

        var active = document.querySelector('.lab-tab.active') || tabs[0];
        render(active.getAttribute('data-example'));
    }

    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRoastLab);
    } else {
        initRoastLab();
    }
})();
