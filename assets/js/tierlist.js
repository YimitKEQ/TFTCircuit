// This file is now just for the tier list page logic.
// All data is loaded from data.js and traits.js

document.addEventListener('DOMContentLoaded', () => {
    const tierlistGrid = document.getElementById('tierlist-grid');
    const filterButtons = document.querySelectorAll('.tier-filter-btn');

    function createCompCard(comp) {
        const championsHTML = comp.champions.map(championName => {
            const champion = championsData.find(c => c.name === championName);
            if (!champion) {
                console.error(`Champion not found: ${championName}`);
                return ''; // Return an empty string if champion is not found
            }
            return `<img src="assets/images/champions/icons/${champion.id.toLowerCase()}.png" alt="${champion.name}" class="unit-icon" data-champion-id="${champion.id}">`;
        }).join('');

        const traitsHTML = comp.traits.map(traitName => {
            const formattedTraitName = traitName.toLowerCase().replace(/ /g, '-');
            return `<div class="trait-badge"><img src="assets/images/traits/${formattedTraitName}.svg" alt="${traitName}" class="trait-icon">${traitName}</div>`;
        }).join('');

        return `
            <div class="comp-card tier-${comp.tier.toLowerCase()}">
                <div class="tier-badge ${comp.tier.toLowerCase()}-tier">${comp.tier} Tier</div>
                <h3 class="comp-name">${comp.name}</h3>
                <div class="unit-list">
                    ${championsHTML}
                </div>
                <div class="comp-details">
                    <div><i class="fas fa-star"></i> Avg. Place: ${comp.avgPlace}</div>
                    <div><i class="fas fa-trophy"></i> Win Rate: ${comp.winRate}%</div>
                </div>
                <div class="comp-traits">
                    ${traitsHTML}
                </div>
            </div>
        `;
    }

    function displayComps(filteredComps) {
        if (!tierlistGrid) return;
        tierlistGrid.innerHTML = '';
        filteredComps.forEach(comp => {
            tierlistGrid.innerHTML += createCompCard(comp);
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const tier = button.dataset.tier;
            if (tier === 'all') {
                displayComps(comps);
            } else {
                const filteredComps = comps.filter(comp => comp.tier.toLowerCase() === tier);
                displayComps(filteredComps);
            }
        });
    });

    // Initial display
    if (tierlistGrid) {
        // Sort comps by tier first (S, A, B), then alphabetically by name
        const sortedComps = comps.sort((a, b) => {
            const tierOrder = { 'S': 0, 'A': 1, 'B': 2 };
            if (tierOrder[a.tier] < tierOrder[b.tier]) return -1;
            if (tierOrder[a.tier] > tierOrder[b.tier]) return 1;
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
        displayComps(sortedComps);
    }
});