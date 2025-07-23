document.addEventListener('DOMContentLoaded', () => {
    const coaches = [
        {
            id: 'alpha',
            name: 'Coach Alpha',
            region: 'NA',
            rank: 'Challenger - Set 14, Set 15',
            bio: 'Specializing in aggressive early-game strategies and meta compositions.',
            price: '$25/hr',
            tags: ['Top 10 NA', 'Early Game Expert', 'English'],
            imageUrl: 'assets/images/champions/aatrox.jpg',
            longBio: 'With over 5 years of competitive experience, Coach Alpha has a proven track record of helping players break through their ranked plateaus. His coaching style focuses on aggressive, tempo-driven gameplay to secure early advantages and snowball to victory.',
            specialties: ['Aggressive Playstyles', 'Tempo & Pacing', 'VOD Review', 'Meta Analysis'],
            languages: ['English'],
            availability: 'Weekdays: 5 PM - 10 PM EST'
        },
        {
            id: 'bravo',
            name: 'Coach Bravo',
            region: 'EUW',
            rank: 'Grandmaster - Set 15',
            bio: 'Expert in flexible playstyles and late-game transitions.',
            price: '$20/hr',
            tags: ['Flexible Play', 'Late Game', 'English', 'German'],
            imageUrl: 'assets/images/champions/akali.jpg',
            longBio: 'Coach Bravo believes that adaptability is the key to consistent climbing. He excels at teaching players how to play flexibly, pivot between compositions, and master the complexities of late-game decision making.',
            specialties: ['Flexible Comps', 'Late-Game Transitions', 'Economic Management', 'Positioning'],
            languages: ['English', 'German'],
            availability: 'Weekends: 10 AM - 8 PM CET'
        },
        {
            id: 'charlie',
            name: 'Coach Charlie',
            region: 'NA',
            rank: 'Challenger - Set 13, Set 15',
            bio: 'Deep understanding of economy and itemization.',
            price: '$30/hr',
            tags: ['Economy', 'Itemization', 'English'],
            imageUrl: 'assets/images/champions/yasuo.jpg',
            longBio: 'A true student of the game, Coach Charlie dives deep into the numbers. His sessions are analytical and data-driven, focusing on optimizing economy, item choices, and augment paths to maximize your chances of winning.',
            specialties: ['Advanced Itemization', 'Economic Theory', 'Augment Strategy', 'Data-Driven Analysis'],
            languages: ['English'],
            availability: 'By Appointment'
        },
        {
            id: 'delta',
            name: 'Coach Delta',
            region: 'EUNE',
            rank: 'Master - Set 15',
            bio: 'Helping players master the fundamentals and climb consistently.',
            price: '$15/hr',
            tags: ['Fundamentals', 'Climbing', 'English', 'Polish'],
            imageUrl: 'assets/images/champions/garen.jpg',
            longBio: 'Perfect for players in Iron to Diamond, Coach Delta focuses on building a strong foundation. He patiently teaches the core mechanics of the game, helping you build good habits for a steady and consistent climb.',
            specialties: ['Core Mechanics', 'Beginner to Intermediate', 'Consistent Climbing', 'Mental Fortitude'],
            languages: ['English', 'Polish'],
            availability: 'Flexible Hours'
        },
        {
            id: 'echo',
            name: 'Coach Echo',
            region: 'NA',
            rank: 'Challenger - Set 15',
            bio: 'Specializes in VOD reviews and identifying key mistakes.',
            price: '$25/hr',
            tags: ['VOD Review', 'Top 100 NA', 'English'],
            imageUrl: 'assets/images/champions/lux.jpg',
            longBio: 'Coach Echo has a keen eye for detail. Through in-depth VOD reviews, he can pinpoint the critical mistakes that are holding you back. If you feel stuck and don\'t know why, a session with Echo will provide clarity.',
            specialties: ['In-Depth VOD Review', 'Mistake Analysis', 'Decision Making', 'Micro-Positioning'],
            languages: ['English'],
            availability: 'Weekdays: 7 PM - 11 PM PST'
        },
        {
            id: 'foxtrot',
            name: 'Coach Foxtrot',
            region: 'LAN',
            rank: 'Grandmaster - Set 14, Set 15',
            bio: 'Expert in off-meta picks and creative compositions.',
            price: '$20/hr',
            tags: ['Off-Meta', 'Creative Comps', 'Spanish', 'English'],
            imageUrl: 'assets/images/champions/ahri.jpg',
            longBio: 'Tired of forcing the same meta comps? Coach Foxtrot helps you think outside the box. He is an expert in finding and perfecting powerful, under-the-radar compositions to catch your opponents by surprise.',
            specialties: ['Creative Theory-Crafting', 'Off-Meta Strategies', 'Contested Lobby Play', 'Risk Assessment'],
            languages: ['Spanish', 'English'],
            availability: 'Weekends Only'
        }
    ];

    const grid = document.querySelector('.grid');
    const modal = document.getElementById('coach-modal');
    const modalBody = document.getElementById('modal-body-content');
    const closeModalBtn = modal.querySelector('.modal-close');

    // Populate Coach Cards
    coaches.forEach(coach => {
        const card = document.createElement('div');
        card.className = 'coach-card';
        card.dataset.coachId = coach.id;

        const tagsHtml = coach.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        card.innerHTML = `
            <div class="banner">
                <img src="${coach.imageUrl}" alt="${coach.name}">
            </div>
            <div class="coach-card-content">
                <h3>${coach.name}</h3>
                <p class="region">${coach.region}</p>
                <p class="rank">${coach.rank}</p>
                <p class="bio">${coach.bio}</p>
                <p class="price">${coach.price}</p>
                <div class="tags">${tagsHtml}</div>
                <a href="#" class="btn btn-primary view-profile-btn">View Profile</a>
            </div>
        `;
        grid.appendChild(card);
    });

    // Modal Logic
    const openModal = (coach) => {
        const specialtiesHtml = coach.specialties.map(s => `<li><i class="fas fa-star"></i>${s}</li>`).join('');
        const languagesHtml = coach.languages.map(l => `<span class="tag">${l}</span>`).join('');

        modalBody.innerHTML = `
            <div class="modal-header">
                <img src="${coach.imageUrl}" alt="${coach.name}">
                <h2>${coach.name}</h2>
                <p class="rank">${coach.rank}</p>
            </div>
            <div class="modal-section">
                <h3>About Me</h3>
                <p>${coach.longBio}</p>
            </div>
            <div class="modal-section">
                <h3>Specialties</h3>
                <ul>${specialtiesHtml}</ul>
            </div>
            <div class="modal-section">
                <h3>Details</h3>
                <ul>
                    <li><i class="fas fa-globe"></i><strong>Region:</strong> ${coach.region}</li>
                    <li><i class="fas fa-clock"></i><strong>Availability:</strong> ${coach.availability}</li>
                    <li><i class="fas fa-dollar-sign"></i><strong>Rate:</strong> ${coach.price}</li>
                </ul>
            </div>
             <div class="modal-section">
                <h3>Languages</h3>
                <div class="modal-tags">${languagesHtml}</div>
            </div>
            <a href="#" class="btn btn-primary" style="width: 100%; text-align: center;">Book a Session</a>
        `;
        modal.style.display = 'flex';
    };

    const closeModal = () => {
        modal.style.display = 'none';
    };

    grid.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-profile-btn')) {
            e.preventDefault();
            const card = e.target.closest('.coach-card');
            const coachId = card.dataset.coachId;
            const selectedCoach = coaches.find(c => c.id === coachId);
            if (selectedCoach) {
                openModal(selectedCoach);
            }
        }
    });

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});