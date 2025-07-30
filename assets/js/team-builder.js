document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const boardGrid = document.getElementById('board');
    const championListGrid = document.getElementById('champion-list');
    const itemListGrid = document.getElementById('item-list');
    const activeTraitsList = document.getElementById('active-traits-list');
    const currentUnitsSpan = document.getElementById('current-units');
    const maxUnitsSpan = document.getElementById('max-units');
    const boardLevelSelect = document.getElementById('board-level');
    const championSearch = document.getElementById('champion-search');
    const costFilters = document.querySelectorAll('.cost-filter');
    const clearBoardBtn = document.getElementById('clear-board-btn');
    const shareBtn = document.getElementById('share-btn');
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    const itemSearch = document.getElementById('item-search');
    const itemFilters = document.querySelectorAll('.item-filter');

    // --- State ---
    let boardState = Array(28).fill(null); // { championId: string, items: [] }
    let maxUnits = 8;
    let draggedElement = null;
    let draggedItem = null;

    // --- DATA (from tierlist.js) ---
    // championsData and itemsData are assumed to be available globally

    // --- INITIALIZATION ---
    function initialize() {
        loadFromUrl();
        renderHexGrid();
        renderChampionPool(championsData);
        renderItems(itemsData.completed);
        updateBoard();
        addEventListeners();
    }

    // --- RENDER FUNCTIONS ---
    function renderHexGrid() {
        boardGrid.innerHTML = '';
        let hexIndex = 0;
        for (let i = 0; i < 4; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 7; j++) {
                const hex = document.createElement('div');
                hex.classList.add('hex');
                hex.dataset.index = hexIndex;
                // Create the permanent background element for every hex from the start
                hex.innerHTML = `<div class="hex-background"></div>`;
                row.appendChild(hex);
                hexIndex++;
            }
            boardGrid.appendChild(row);
        }
    }

    function renderChampionPool(champions) {
        championListGrid.innerHTML = '';
        champions.forEach(champ => {
            const champItem = document.createElement('div');
            champItem.classList.add('champion-item');
            champItem.dataset.championId = champ.id;
            champItem.draggable = true;
            champItem.innerHTML = `
                <img src="assets/images/champions/icons/${champ.id.toLowerCase()}.png" alt="${champ.name}" class="champion-icon cost-${champ.cost}">
                <span class="champion-name">${champ.name}</span>
            `;
            championListGrid.appendChild(champItem);
        });
    }

    function renderItems(items) {
        itemListGrid.innerHTML = '';
        items.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('item-item');
            itemEl.dataset.itemId = item.id;
            itemEl.draggable = true;
            itemEl.innerHTML = `<img src="${item.icon}" alt="${item.name}" title="${item.name}">`;
            itemListGrid.appendChild(itemEl);
        });
    }

    // --- UPDATE FUNCTIONS ---
    function updateBoard() {
        boardState.forEach((cell, index) => {
            const hex = boardGrid.querySelector(`.hex[data-index='${index}']`);
            
            // Remove only the old content, leaving the background intact
            const oldContent = hex.querySelector('.hex-content');
            if (oldContent) {
                oldContent.remove();
            }

            // If a champion exists in the state, create and add the content
            if (cell) {
                const champion = championsData.find(c => c.id === cell.championId);

                const contentWrapper = document.createElement('div');
                contentWrapper.className = 'hex-content';

                const champOnBoard = document.createElement('div');
                champOnBoard.className = 'champion-on-board';
                champOnBoard.dataset.championId = champion.id;
                champOnBoard.dataset.index = index;
                champOnBoard.draggable = true;
                champOnBoard.innerHTML = `<img src="assets/images/champions/icons/${champion.id.toLowerCase()}.png" alt="${champion.name}" class="champion-icon cost-${champion.cost}">`;

                const itemSlots = document.createElement('div');
                itemSlots.className = 'item-slots';
                let itemsHtml = '';
                for (let i = 0; i < 3; i++) {
                    const item = cell.items[i] ? itemsData.completed.find(itemData => itemData.id === cell.items[i]) : null;
                    itemsHtml += `<div class="item-slot">${item ? `<img src='${item.icon}' alt='${item.name}'>` : ''}</div>`;
                }
                itemSlots.innerHTML = itemsHtml;

                contentWrapper.appendChild(champOnBoard);
                contentWrapper.appendChild(itemSlots);
                
                hex.appendChild(contentWrapper);
            }
        });
        updateUnitCount();
        updateActiveTraits();
    }

    function updateUnitCount() {
        const currentUnits = boardState.filter(c => c !== null).length;
        currentUnitsSpan.textContent = currentUnits;
        maxUnits = parseInt(boardLevelSelect.value);
        maxUnitsSpan.textContent = maxUnits;
        currentUnitsSpan.style.color = currentUnits > maxUnits ? '#e74c3c' : 'var(--primary)';
    }

    function updateActiveTraits() {
        const traitCounts = {};
        const championsOnBoard = boardState.filter(c => c !== null).map(c => c.championId);
        const uniqueChampions = [...new Set(championsOnBoard)];

        uniqueChampions.forEach(championId => {
            const champion = championsData.find(c => c.id === championId);
            if (champion && champion.traits) {
                champion.traits.forEach(traitName => {
                    traitCounts[traitName] = (traitCounts[traitName] || 0) + 1;
                });
            }
        });

        activeTraitsList.innerHTML = '';
        const sortedTraits = Object.keys(traitCounts).sort((a, b) => traitCounts[b] - traitCounts[a]);

        if (sortedTraits.length === 0) {
            activeTraitsList.innerHTML = '<p class="no-traits">Add champions to see their traits.</p>';
            return;
        }

        sortedTraits.forEach(traitName => {
            const count = traitCounts[traitName];
            const traitInfo = traitsData[traitName];
            if (!traitInfo) return;

            let activeStyle = 'inactive';
            let nextThreshold = traitInfo.effects[0].min;
            
            for (let i = traitInfo.effects.length - 1; i >= 0; i--) {
                if (count >= traitInfo.effects[i].min) {
                    activeStyle = traitInfo.effects[i].style;
                    nextThreshold = (i + 1 < traitInfo.effects.length) ? traitInfo.effects[i+1].min : null;
                    break;
                }
            }

            const traitEl = document.createElement('div');
            traitEl.classList.add('active-trait', `trait-style-${activeStyle}`);
            
            const traitIconName = traitName.toLowerCase().replace(/ /g, '-');
            const thresholds = traitInfo.effects.map(e => e.min).join('/');

            traitEl.innerHTML = `
                <div class="trait-icon-wrapper">
                    <img src="assets/images/traits/${traitIconName}.svg" alt="${traitName}" class="trait-icon">
                </div>
                <div class="trait-details">
                    <span class="trait-name">${traitName}</span>
                    <span class="trait-thresholds">${thresholds}</span>
                </div>
                <span class="trait-count">${count}</span>
            `;
            activeTraitsList.appendChild(traitEl);
        });
    }

    // --- EVENT LISTENERS ---
    function addEventListeners() {
        // Drag from champion pool
        championListGrid.addEventListener('dragstart', e => {
            if (e.target.closest('.champion-item')) {
                draggedElement = e.target.closest('.champion-item');
                e.dataTransfer.setData('championId', draggedElement.dataset.championId);
            }
        });

        // Drag item
        itemListGrid.addEventListener('dragstart', e => {
            if (e.target.closest('.item-item')) {
                draggedItem = e.target.closest('.item-item');
                e.dataTransfer.setData('itemId', draggedItem.dataset.itemId);
            }
        });

        // Drag from board
        boardGrid.addEventListener('dragstart', e => {
            if (e.target.closest('.champion-on-board')) {
                draggedElement = e.target.closest('.champion-on-board');
                e.dataTransfer.setData('championId', draggedElement.dataset.championId);
                e.dataTransfer.setData('sourceIndex', draggedElement.dataset.index);
            }
        });

        // Drag over board
        boardGrid.addEventListener('dragover', e => {
            e.preventDefault();
            const targetHex = e.target.closest('.hex');
            if (targetHex) {
                targetHex.classList.add('drag-over');
            }
        });

        // Drag leave board
        boardGrid.addEventListener('dragleave', e => {
            const targetHex = e.target.closest('.hex');
            if (targetHex) {
                targetHex.classList.remove('drag-over');
            }
        });

        // Drop on board
        boardGrid.addEventListener('drop', e => {
            e.preventDefault();
            const targetHex = e.target.closest('.hex');
            if (!targetHex) return;

            targetHex.classList.remove('drag-over');
            const championId = e.dataTransfer.getData('championId');
            const itemId = e.dataTransfer.getData('itemId');
            const sourceIndex = e.dataTransfer.getData('sourceIndex');
            const targetIndex = parseInt(targetHex.dataset.index);

            // Case 1: Dropping an item
            if (itemId) {
                const targetCell = boardState[targetIndex];
                // Only drop on a hex that has a champion and less than 3 items
                if (targetCell && targetCell.items.length < 3) {
                    targetCell.items.push(itemId);
                }
            } 
            // Case 2: Dropping a champion
            else if (championId) {
                const newCellData = { championId: championId, items: [] };

                // If moving from another hex, preserve items
                if (sourceIndex !== '' && sourceIndex !== null) {
                    const sourceCell = boardState[sourceIndex];
                    if (sourceCell) {
                        newCellData.items = sourceCell.items;
                    }
                    boardState[sourceIndex] = null; // Clear the source hex
                }

                // If target hex is occupied, swap champions
                if (boardState[targetIndex] && sourceIndex !== '' && sourceIndex !== null) {
                    boardState[sourceIndex] = boardState[targetIndex];
                }

                boardState[targetIndex] = newCellData;
            }

            updateBoard();
            draggedElement = null;
            draggedItem = null;
        });

        // Right-click to remove from board
        boardGrid.addEventListener('contextmenu', e => {
            e.preventDefault();
            const targetHex = e.target.closest('.hex');
            if (targetHex) {
                const targetIndex = parseInt(targetHex.dataset.index);
                boardState[targetIndex] = null;
                updateBoard();
            }
        });

        // Board level change
        boardLevelSelect.addEventListener('change', updateUnitCount);

        // Search filter
        championSearch.addEventListener('input', () => {
            const searchTerm = championSearch.value.toLowerCase();
            const activeCostFilter = document.querySelector('.cost-filter.active').dataset.cost;
            let filteredChamps = championsData.filter(c => c.name.toLowerCase().includes(searchTerm));
            if (activeCostFilter !== 'all') {
                filteredChamps = filteredChamps.filter(c => c.cost == activeCostFilter);
            }
            renderChampionPool(filteredChamps);
        });

        // Cost filters
        costFilters.forEach(button => {
            button.addEventListener('click', () => {
                costFilters.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                championSearch.dispatchEvent(new Event('input')); // Trigger search filter
            });
        });

        // Item search filter
        itemSearch.addEventListener('input', () => {
            const searchTerm = itemSearch.value.toLowerCase();
            const activeCategoryFilter = document.querySelector('.item-filter.active').dataset.category;
            let filteredItems = itemsData.completed.filter(i => i.name.toLowerCase().includes(searchTerm));
            if (activeCategoryFilter !== 'all') {
                filteredItems = filteredItems.filter(i => i.category === activeCategoryFilter);
            }
            renderItems(filteredItems);
        });

        // Item category filters
        itemFilters.forEach(button => {
            button.addEventListener('click', () => {
                itemFilters.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                itemSearch.dispatchEvent(new Event('input')); // Trigger search filter
            });
        });

        // Clear board button
        clearBoardBtn.addEventListener('click', () => {
            boardState.fill(null);
            updateBoard();
        });

        // Share button
        shareBtn.addEventListener('click', () => {
            const boardString = boardState.map(cell => {
                if (!cell) return '_';
                return `${cell.championId}(${cell.items.join(',')})`;
            }).join('-');
            const url = `${window.location.pathname}?comp=${btoa(boardString)}`;
            navigator.clipboard.writeText(url).then(() => {
                alert('Share link copied to clipboard!');
            });
        });

        // Tabs
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });
    }

    function loadFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const compString = params.get('comp');
        if (compString) {
            try {
                const decodedString = atob(compString);
                const boardArray = decodedString.split('-');
                boardState = boardArray.map(cellString => {
                    if (cellString === '_') return null;
                    const match = cellString.match(/(.+?)\((.*)\)/);
                    if (match) {
                        const championId = match[1];
                        const items = match[2] ? match[2].split(',') : [];
                        return { championId, items };
                    }
                    return null;
                });
            } catch (e) {
                console.error('Failed to parse comp string from URL', e);
            }
        }
    }

    // --- RUN ---
    initialize();
});
