// Mobile Menu Toggle
document.querySelector('.mobile-toggle').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            // Check if the link is for the home page before adding active class
            if(this.href.includes('#')) {
                this.classList.add('active');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Hero stats counter animation
const statCards = document.querySelectorAll('.stat-card');
const options = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target.querySelector('h3');
            const target = parseInt(stat.textContent.replace('+', ''));
            let count = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    count = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(count) + (entry.target.querySelector('p').textContent.includes('Players') ? '+' : '');
            }, 20);
            
            observer.unobserve(entry.target);
        }
    });
}, options);

statCards.forEach(card => {
    observer.observe(card);
});

// Tournament card hover effect
const tournamentCards = document.querySelectorAll('.tournament-card');
tournamentCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Set 15 theme animation
const hero = document.querySelector('.hero');
if (hero) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        hero.style.backgroundPosition = `${x * 30}px ${y * 30}px`;
    });
}


// --- NEW FUNCTIONALITY FOR HOME PAGE TIER LIST ---

function getChampionIcon(championName) {
    const champion = championsData.find(c => c.name === championName);
    if (!champion) return '';
    return `<img src="assets/images/champions/${champion.id.toLowerCase()}.png" alt="${champion.name}" class="unit-icon" title="${championName}" data-champion-id="${champion.id}">`;
}


function createCompCard(comp) {
    const championsHtml = comp.champions.map(getChampionIcon).join('');
    const traitsHtml = comp.traits.map(trait => `<span class="trait-badge">${trait}</span>`).join('');

    return `
        <div class="comp-card" data-tier="${comp.tier.toLowerCase()}">
            <div class="tier-badge ${comp.tier.toLowerCase()}-tier">${comp.tier} Tier</div>
            <div class="comp-name">${comp.name}</div>
            <div class="unit-list">
                ${championsHtml}
            </div>
            <div class="comp-details">
                <div><i class="fas fa-gamepad"></i> Playstyle: <strong>${comp.playstyle}</strong></div>
                <div><i class="fas fa-brain"></i> Difficulty: <strong>${comp.difficulty}</strong></div>
            </div>
            <div class="comp-stats">
                <div><i class="fas fa-trophy"></i> Avg. Place: <strong>${comp.avgPlace}</strong></div>
                <div><i class="fas fa-chart-line"></i> Win Rate: <strong>${comp.winRate}%</strong></div>
            </div>
            <div class="comp-traits">
                ${traitsHtml}
            </div>
        </div>
    `;
}

function displayFeaturedComps() {
    // This function will be called on the home page
    const container = document.querySelector('#tier-preview .tierlist-grid');
    if (!container || typeof comps === 'undefined') {
        return;
    }

    const sTierComps = comps.filter(comp => comp.tier === 'S');
    
    // Shuffle the S-tier comps array to get random ones
    const shuffled = sTierComps.sort(() => 0.5 - Math.random());
    
    // Get the first 3 comps from the shuffled array
    const selectedComps = shuffled.slice(0, 3);
    
    if (selectedComps.length > 0) {
        container.innerHTML = selectedComps.map(createCompCard).join('');
    } else {
        container.innerHTML = "<p>No S-Tier comps available at the moment. Check back soon!</p>";
    }
}


// --- END OF NEW FUNCTIONALITY ---


document.addEventListener('DOMContentLoaded', () => {
    // Tournament Tab functionality
    const tabContainer = document.querySelector('.tournament-tabs');
    if (tabContainer) {
        const tabButtons = tabContainer.querySelectorAll('.tab-btn');
        const contentContainers = document.querySelectorAll('.tournament-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;

                // Handle active button state
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Handle content visibility
                contentContainers.forEach(container => {
                    if (container.id === `${tabId}-tournaments`) {
                        container.style.display = 'block';
                    } else {
                        container.style.display = 'none';
                    }
                });
            });
        });
    }

    // Streamer Page Functionality
    const randomStreamerBtn = document.getElementById('random-streamer-btn');
    const featuredStreamerName = document.getElementById('featured-streamer-name');
    const featuredStreamerDescription = document.getElementById('featured-streamer-description');
    const featuredStreamIframe = document.getElementById('featured-stream-iframe');
    const discoverStreamersContainer = document.querySelector('.discover-streamers');

    const streamers = [
        {
            channel: 'k3soju',
            name: 'k3soju',
            description: 'One of the most popular TFT streamers, known for his entertaining personality, high-level gameplay, and marathon streams at the start of new sets.'
        },
        {
            channel: 'frodan',
            name: 'Frodan',
            description: 'A pillar of the TFT community, Frodan is a top-tier caster and host for major events, providing insightful commentary and analysis.'
        },
        {
            channel: 'setsuko',
            name: 'Setsuko',
            description: 'Known for his unique music choices and a passionate yet carefree attitude, Setsuko\'s streams are filled with high-level gameplay and humorous moments.'
        },
        {
            channel: 'dishsoap',
            name: 'Dishsoap',
            description: 'Regarded as one of the top players in North America, Dishsoap\'s streams are a great place to learn from a highly skilled competitor.'
        },
        {
            channel: 'robinsongz',
            name: 'Robinsongz',
            description: 'A consistent nighttime streamer, Robinsongz is known for his educational content, often explaining his thought processes and analyzing his mistakes.'
        },
        {
            channel: 'kurumx',
            name: 'Kurumx',
            description: 'A veteran of the game and a multi-time tournament winner, Kurumx\'s streams are a great resource for learning solid fundamentals from a world-class player.'
        },
        {
            channel: 'mortdog',
            name: 'Riot Mortdog',
            description: 'Get insights directly from the source. Mortdog, the Lead Game Designer for TFT, often streams to discuss the meta, explain design decisions, and interact with the community.'
        }
    ];

    const updateTwitchEmbed = (channel, name, description) => {
        if (!featuredStreamIframe) return;
        const parentDomain = 'tft-circuit.vercel.app';
        featuredStreamIframe.src = `https://player.twitch.tv/?channel=${channel}&parent=${parentDomain}&autoplay=false`;
        
        if (featuredStreamerName) featuredStreamerName.textContent = name;
        if (featuredStreamerDescription) featuredStreamerDescription.textContent = description;
    };

    const createStreamerButtons = () => {
        if (!discoverStreamersContainer) return;
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'streamer-buttons';

        streamers.forEach(streamer => {
            const button = document.createElement('button');
            button.className = 'btn streamer-btn';
            button.textContent = streamer.name;
            button.addEventListener('click', () => {
                updateTwitchEmbed(streamer.channel, streamer.name, streamer.description);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            buttonContainer.appendChild(button);
        });
        discoverStreamersContainer.appendChild(buttonContainer);
    };

    // Check if we are on the streams page and initialize
    if (window.location.pathname.includes('streams.html')) {
        const initialStreamer = streamers.find(s => s.channel === 'mortdog');
        if (initialStreamer) {
            updateTwitchEmbed(initialStreamer.channel, initialStreamer.name, initialStreamer.description);
        }
        createStreamerButtons();
    }

    if (randomStreamerBtn) {
        randomStreamerBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * streamers.length);
            const randomStreamer = streamers[randomIndex];
            updateTwitchEmbed(randomStreamer.channel, randomStreamer.name, randomStreamer.description);
        });
    }


    // Function to handle intersection observer animations
    const createObserver = (targetSelector, activeClass) => {
        const target = document.querySelector(targetSelector);
        if (!target) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    target.classList.add(activeClass);
                    
                    if (target.id === 'rank-distribution-graph') {
                        const tiers = target.querySelectorAll('.tier');
                        tiers.forEach((tier, index) => {
                            const percent = tier.getAttribute('data-percent');
                            tier.style.setProperty('--bar-width', `${percent}%`);
                            tier.style.setProperty('--animation-order', index);
                        });
                    }
                    
                    if (target.id === 'rank-distribution-graph') {
                         observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(target);
    };

    // Setup observers
    createObserver('.path-steps', 'in-view');
    createObserver('#rank-distribution-graph', 'in-view');

    // Guide TOC smooth scrolling
    const tocLinks = document.querySelectorAll('.guide-toc a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Guide TOC active link highlighting
    const sections = document.querySelectorAll('.guide-section');
    const tocObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.guide-toc a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-100px 0px -50% 0px' });

    sections.forEach(section => {
        tocObserver.observe(section);
    });

    // Call the function to display featured comps on the home page
    displayFeaturedComps();

    // Champion Info Card Hover Logic
    let activeInfoCard = null;

    document.body.addEventListener('mouseover', (event) => {
        const target = event.target;
        if (target.classList.contains('unit-icon') && target.dataset.championId) {
            const championId = target.dataset.championId;
            
            if (typeof championsData === 'undefined' || typeof itemsData === 'undefined') return;

            const champion = championsData.find(c => c.id === championId);

            if (champion) {
                if (activeInfoCard) {
                    activeInfoCard.remove();
                }

                const infoCard = document.createElement('div');
                infoCard.className = 'champion-info-card';
                
                const traitsHtml = champion.traits.map(traitName => {
                    const formattedTraitName = traitName.toLowerCase().replace(/ /g, '-');
                    return `<div class="trait-badge"><img src="assets/images/traits/${formattedTraitName}.svg" alt="${traitName}" class="trait-icon">${traitName}</div>`;
                }).join('');

                const itemsHtml = champion.items.map(itemName => {
                    const item = itemsData.completed.find(i => i.name === itemName);
                    return item ? `<img src="${item.icon}" alt="${item.name}" class="item-icon" title="${item.name}">` : '';
                }).join('');

                infoCard.innerHTML = `
                    <h4>${champion.name}</h4>
                    <div class="info-row"><span>Cost:</span> <strong>${champion.cost}</strong></div>
                    <div class="info-row"><span>Role:</span> <strong>${champion.role}</strong></div>
                    <p><strong>Ability:</strong> ${champion.ability.name}</p>
                    <p>${champion.ability.description}</p>
                    <div class="traits-list">
                        ${traitsHtml}
                    </div>
                    <div><strong>Recommended Items:</strong></div>
                    <div class="item-list">
                        ${itemsHtml}
                    </div>
                `;

                document.body.appendChild(infoCard);
                activeInfoCard = infoCard;

                const iconRect = target.getBoundingClientRect();
                const cardRect = infoCard.getBoundingClientRect();

                let top = iconRect.bottom + 10 + window.scrollY;
                let left = iconRect.left + (iconRect.width / 2) - (cardRect.width / 2) + window.scrollX;

                if (left < 10) left = 10;
                if (left + cardRect.width > window.innerWidth - 10) {
                    left = window.innerWidth - cardRect.width - 10;
                }
                if (top + cardRect.height > window.innerHeight + window.scrollY) {
                    top = iconRect.top - cardRect.height - 10 + window.scrollY;
                }


                infoCard.style.top = `${top}px`;
                infoCard.style.left = `${left}px`;

                setTimeout(() => infoCard.classList.add('active'), 10);
            }
        }
    });

    document.body.addEventListener('mouseout', (event) => {
        if (activeInfoCard && !event.relatedTarget?.closest('.champion-info-card')) {
             if (!event.relatedTarget || !event.relatedTarget.classList.contains('unit-icon')) {
                activeInfoCard.classList.remove('active');
                activeInfoCard.addEventListener('transitionend', () => {
                    activeInfoCard?.remove();
                    activeInfoCard = null;
                }, { once: true });
            }
        }
    });
});

// VOD Library Filter
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.vod-filter-btn');
    const vodCards = document.querySelectorAll('.vod-card');

    if (filterButtons.length > 0 && vodCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter VOD cards
                vodCards.forEach(card => {
                    if (filter === 'all' || card.dataset.tags.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});

// Countdown Timer
document.addEventListener('DOMContentLoaded', () => {
    const countdownContainer = document.getElementById('countdown-timer');
    if (!countdownContainer) return;

    const countdownDate = new Date('July 30, 2025 06:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            countdownContainer.innerHTML = "Set 15 is Live!";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownContainer.innerHTML = `
            Set 15 Launches In: 
            <span>${days}d</span> 
            <span>${hours}h</span> 
            <span>${minutes}m</span> 
            <span>${seconds}s</span>
        `;
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
});