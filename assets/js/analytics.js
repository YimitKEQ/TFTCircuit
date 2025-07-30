// assets/js/analytics.js
document.addEventListener('DOMContentLoaded', () => {
    if (typeof comps === 'undefined' || typeof championsData === 'undefined' || typeof itemsData === 'undefined') {
        console.error('Required data not found. Make sure data.js is loaded.');
        return;
    }

    const topComps = comps.filter(c => c.tier === 'S' || c.tier === 'A');

    // --- 1. Trait Performance Chart ---
    const renderTraitPerformance = () => {
        const traitCounts = {};
        topComps.forEach(comp => {
            comp.traits.forEach(trait => {
                traitCounts[trait] = (traitCounts[trait] || 0) + 1;
            });
        });

        const sortedTraits = Object.entries(traitCounts).sort((a, b) => b[1] - a[1]);
        const maxCount = sortedTraits[0][1];
        const container = document.getElementById('trait-performance-chart');
        
        container.innerHTML = sortedTraits.map(([name, count]) => `
            <div class="bar">
                <span class="bar-label">${name}</span>
                <div class="bar-wrapper">
                    <div class="bar-fill" style="width: ${(count / maxCount) * 100}%;"></div>
                </div>
                <span class="bar-value">${count}</span>
            </div>
        `).join('');
    };

    // --- 2. Champion Cost Distribution ---
    const renderCostDistribution = () => {
        const costCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        topComps.forEach(comp => {
            comp.champions.forEach(champName => {
                const champ = championsData.find(c => c.name === champName);
                if (champ) {
                    costCounts[champ.cost]++;
                }
            });
        });

        const sortedCosts = Object.entries(costCounts).sort((a, b) => b[1] - a[1]);
        const maxCount = sortedCosts[0][1];
        const container = document.getElementById('cost-distribution-chart');

        container.innerHTML = Object.entries(costCounts).map(([cost, count]) => `
            <div class="bar">
                <span class="bar-label">${cost}-Cost</span>
                <div class="bar-wrapper">
                    <div class="bar-fill" style="width: ${(count / maxCount) * 100}%;"></div>
                </div>
                <span class="bar-value">${count}</span>
            </div>
        `).join('');
    };

    // --- 3. Item Popularity List ---
    const renderItemPopularity = () => {
        const itemCounts = {};
        // This is a placeholder until individual champion items are populated
        // For now, we'll use a dummy list based on comps
        topComps.forEach(comp => {
            comp.champions.forEach(champName => {
                const champ = championsData.find(c => c.name === champName);
                if (champ && champ.items) {
                    champ.items.forEach(itemName => {
                         itemCounts[itemName] = (itemCounts[itemName] || 0) + 1;
                    });
                }
            });
        });
        
        // Create some dummy data if the above is empty
        if (Object.keys(itemCounts).length === 0) {
            itemCounts['Sunfire Cape'] = 5;
            itemCounts['Ionic Spark'] = 4;
            itemCounts['Jeweled Gauntlet'] = 4;
            itemCounts['Blue Buff'] = 3;
            itemCounts['Infinity Edge'] = 3;
        }

        const sortedItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
        const container = document.getElementById('item-popularity-list');

        container.innerHTML = sortedItems.map(([name, count], index) => {
            const item = itemsData.completed.find(i => i.name === name);
            return `
                <li>
                    <span class="rank">#${index + 1}</span>
                    <img src="${item ? item.icon : ''}" alt="${name}" class="item-icon">
                    <span class="item-name">${name}</span>
                    <span class="item-count">${count} uses</span>
                </li>
            `;
        }).join('');
    };


    // --- Initial Render ---
    if (document.getElementById('trait-performance-chart')) {
        renderTraitPerformance();
        renderCostDistribution();
        renderItemPopularity();
    }
});
