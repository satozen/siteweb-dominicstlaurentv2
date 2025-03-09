const services = [
    {
        id: 1,
        icon: "🎭",
        title: "IMITATEUR ALL-STAR",
        description: "Louis-José, Mike Ward ou Sugar Sammy? Choisissez votre saveur de rire!",
        animation: "dealCard"
    },
    {
        id: 2,
        icon: "🎤",
        title: "CROONER MODE",
        description: "Votre 5 à 7 vient de se transformer en club select!",
        animation: "dealCard"
    },
    {
        id: 3,
        icon: "🎪",
        title: "LE GRAND JEU",
        description: "Comme Le Banquier, mais vraiment drôle!",
        animation: "dealCard"
    },
    {
        id: 4,
        icon: "🎯",
        title: "MC PREMIUM",
        description: "Des transitions plus smooth que le scotch 18 ans de votre oncle!",
        animation: "dealCard"
    },
    {
        id: 5,
        icon: "🎧",
        title: "DJ SIGNATURE",
        description: "Le plancher de danse va implorer pitié!",
        animation: "dealCard"
    },
    {
        id: 6,
        icon: "🎪",
        title: "SURPRISE DELUXE",
        description: "Un mix de talents qui va faire jaser!",
        animation: "dealCard"
    }
];

class MysteryBox {
    constructor() {
        this.discoveredServices = new Set();
        this.mysteryBox = document.querySelector('.mystery-box');
        this.servicesGrid = document.querySelector('.services-grid');
        this.init();
    }

    init() {
        // Créer les cartes de service (initialement cachées)
        services.forEach(service => {
            this.createServiceCard(service);
        });

        // Ajouter l'événement de clic sur la boîte
        this.mysteryBox.addEventListener('click', () => this.revealService());
    }

    createServiceCard(service) {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.dataset.id = service.id;
        card.innerHTML = `
            <div class="service-icon">${service.icon}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        this.servicesGrid.appendChild(card);
    }

    async revealService() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Ajouter l'effet du gong
        const gongRing = document.createElement('div');
        gongRing.className = 'gong-ring';
        this.mysteryBox.appendChild(gongRing);
        this.mysteryBox.classList.add('clicked');

        // Attendre que l'animation du gong soit terminée
        await new Promise(resolve => setTimeout(resolve, 500));

        // Sélectionner un service non découvert au hasard
        const availableServices = services.filter(s => !this.discoveredServices.has(s.id));
        if (availableServices.length === 0) {
            alert('Vous avez découvert tous les services!');
            this.isAnimating = false;
            return;
        }

        const service = availableServices[Math.floor(Math.random() * availableServices.length)];
        this.discoveredServices.add(service.id);

        // Animer la boîte
        await this.animateReveal(service);

        // Marquer la carte comme découverte avec animation
        const card = document.querySelector(`.service-card[data-id="${service.id}"]`);
        card.classList.add('discovered');

        // Nettoyer
        this.mysteryBox.classList.remove('clicked');
        gongRing.remove();
        this.isAnimating = false;
    }

    async animateReveal(service) {
        // Créer la carte de révélation
        const revealCard = document.createElement('div');
        revealCard.className = 'reveal-card';
        revealCard.innerHTML = `
            <div class="reveal-content">
                <div class="service-icon">${service.icon}</div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            </div>
        `;
        
        document.body.appendChild(revealCard);
        
        // Animer l'apparition
        setTimeout(() => {
            revealCard.classList.add('active');
        }, 100);
        
        // Attendre puis faire disparaître
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        revealCard.classList.remove('active');
        setTimeout(() => {
            revealCard.remove();
        }, 300);
    }
}

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new MysteryBox();
}); 