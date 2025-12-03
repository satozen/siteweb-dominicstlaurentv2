/**
 * Roast Lab Interactive Demo
 * Gère l'interactivité de la section "Roast Lab" sur les pages corpo et mariages
 * - Switch entre différents exemples de roasts
 * - Animations de highlight au survol pour montrer les connexions
 * - Le hover sur une info source highlight le tag correspondant dans le roast
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

    function initRoastLab() {
        // Éléments du DOM
        const tabs = document.querySelectorAll('.lab-tab');
        const labContent = document.querySelector('.lab-content');
        const questionnaireContainer = document.querySelector('.questionnaire-fields');
        const roastContainer = document.querySelector('.roast-text');
        const exampleTitle = document.querySelector('.example-title');

        // Vérifier que les éléments existent
        if (!tabs.length) {
            console.log('Roast Lab: No tabs found');
            return;
        }
        
        if (!labContent) {
            console.log('Roast Lab: No lab-content found');
            return;
        }

        console.log('Roast Lab initialized with', tabs.length, 'tabs');

        // Fonction pour mettre à jour le contenu
        function updateContent(exampleKey) {
            const example = roastExamples[exampleKey];
            if (!example) {
                console.log('Roast Lab: Example not found:', exampleKey);
                return;
            }

            console.log('Roast Lab: Switching to', exampleKey);

            // Animation de transition
            labContent.classList.add('switching');

            setTimeout(function() {
                // Mise à jour du titre
                if (exampleTitle) {
                    exampleTitle.textContent = example.title;
                }

                // Mise à jour du questionnaire
                if (questionnaireContainer) {
                    var html = '';
                    example.questionnaire.forEach(function(field) {
                        html += '<div class="field-group">';
                        html += '<span class="field-label">' + field.label + '</span>';
                        html += '<div class="field-value highlight-' + field.type + '" data-type="' + field.type + '">';
                        html += field.value;
                        html += '</div>';
                        html += '</div>';
                    });
                    questionnaireContainer.innerHTML = html;
                }

                // Mise à jour du roast
                if (roastContainer) {
                    roastContainer.innerHTML = example.roast;
                }

                // Réactiver les interactions
                setupHighlightInteractions();

                // Fin de l'animation
                labContent.classList.remove('switching');
            }, 300);
        }

        // Gestion des interactions de highlight
        function setupHighlightInteractions() {
            var fieldValues = document.querySelectorAll('.field-value');
            var roastTags = document.querySelectorAll('.roast-text span[class^="tag-"]');

            // Hover sur les champs du questionnaire
            fieldValues.forEach(function(field) {
                var type = field.getAttribute('data-type');
                if (!type) return;
                
                field.addEventListener('mouseenter', function() {
                    // Highlight le tag correspondant dans le roast
                    document.querySelectorAll('.tag-' + type).forEach(function(tag) {
                        tag.style.transform = 'scale(1.1)';
                        tag.style.boxShadow = '0 0 20px currentColor';
                    });
                });

                field.addEventListener('mouseleave', function() {
                    document.querySelectorAll('.tag-' + type).forEach(function(tag) {
                        tag.style.transform = '';
                        tag.style.boxShadow = '';
                    });
                });
            });

            // Hover sur les tags du roast
            roastTags.forEach(function(tag) {
                var className = tag.className;
                var match = className.match(/tag-(\w+)/);
                if (!match) return;
                
                var type = match[1];

                tag.addEventListener('mouseenter', function() {
                    // Highlight le champ correspondant
                    document.querySelectorAll('.highlight-' + type).forEach(function(field) {
                        field.style.transform = 'translateX(15px) scale(1.02)';
                        field.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.4)';
                    });
                });

                tag.addEventListener('mouseleave', function() {
                    document.querySelectorAll('.highlight-' + type).forEach(function(field) {
                        field.style.transform = '';
                        field.style.boxShadow = '';
                    });
                });
            });
        }

        // Event listeners pour les tabs
        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                // Update active state
                tabs.forEach(function(t) {
                    t.classList.remove('active');
                });
                tab.classList.add('active');

                // Update content
                var exampleKey = tab.getAttribute('data-example');
                updateContent(exampleKey);
            });
        });

        // Initialisation des interactions pour le contenu par défaut
        setupHighlightInteractions();
    }

    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRoastLab);
    } else {
        initRoastLab();
    }
})();
