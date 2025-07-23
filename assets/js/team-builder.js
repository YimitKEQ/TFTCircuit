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
        renderItems();
        updateBoard();
        addEventListeners();
    }

    // --- RENDER FUNCTIONS ---
    function renderHexGrid() {
        boardGrid.innerHTML = '';
        for (let i = 0; i < 28; i++) {
            const hex = document.createElement('div');
            hex.classList.add('hex');
            hex.dataset.index = i;
            boardGrid.appendChild(hex);
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
                <img src="/assets/tftclogo.png" alt="${champ.name}" class="champion-icon cost-${champ.cost}">
                <span class="champion-name">${champ.name}</span>
            `;
            championListGrid.appendChild(champItem);
        });
    }

    function renderItems() {
        itemListGrid.innerHTML = '';
        itemsData.completed.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('item-item');
            itemEl.dataset.itemId = item.id;
            itemEl.draggable = true;
            itemEl.innerHTML = `<img src="/assets/tftclogo.png" alt="${item.name}" title="${item.name}">`;
            itemListGrid.appendChild(itemEl);
        });
    }

    // --- UPDATE FUNCTIONS ---
    function updateBoard() {
        boardState.forEach((cell, index) => {
            const hex = boardGrid.querySelector(`.hex[data-index='${index}']`);
            hex.innerHTML = '';
            if (cell) {
                const champion = championsData.find(c => c.id === cell.championId);
                const champOnBoard = document.createElement('div');
                champOnBoard.classList.add('champion-on-board');
                champOnBoard.dataset.championId = champion.id;
                champOnBoard.dataset.index = index;
                champOnBoard.draggable = true;

                let itemsHtml = '<div class="item-slots">';
                for (let i = 0; i < 3; i++) {
                    const item = cell.items[i] ? itemsData.completed.find(itemData => itemData.id === cell.items[i]) : null;
                    itemsHtml += `<div class="item-slot">${item ? `<img src='/assets/tftclogo.png' alt='${item.name}'>` : ''}</div>`;
                }
                itemsHtml += '</div>';

                champOnBoard.innerHTML = `<img src="/assets/tftclogo.png" alt="${champion.name}" class="champion-icon cost-${champion.cost}">${itemsHtml}`;
                hex.appendChild(champOnBoard);
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
        // This is a placeholder. A full trait calculation logic will be added later.
        activeTraitsList.innerHTML = '<p class="no-traits">Trait calculation coming soon!</p>';
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

            if (itemId) { // Dropping an item
                if (boardState[targetIndex] && boardState[targetIndex].items.length < 3) {
                    boardState[targetIndex].items.push(itemId);
                }
            } else if (championId) { // Dropping a champion
                const newCellData = { championId: championId, items: [] };

                if (sourceIndex !== '') { // Moving from another hex
                    const sourceCell = boardState[sourceIndex];
                    if(sourceCell) newCellData.items = sourceCell.items;
                    boardState[sourceIndex] = null;
                }

                // Swap if target hex is occupied
                if (boardState[targetIndex] && sourceIndex !== '') {
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
