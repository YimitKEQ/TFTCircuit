document.addEventListener('DOMContentLoaded', () => {
    const championList = document.getElementById('champion-list');
    const itemList = document.getElementById('item-list');
    const board = document.getElementById('board');
    const bench = document.getElementById('bench');

    // Populate Champions
    champions.forEach(champion => {
        const championElement = document.createElement('img');
        championElement.src = `assets/images/champions/thumbnails/${champion.id}.png`;
        championElement.alt = champion.name;
        championElement.dataset.id = champion.id;
        championElement.draggable = true;
        championElement.addEventListener('dragstart', handleDragStart);
        championList.appendChild(championElement);
    });

    // Populate Items
    items.forEach(item => {
        const itemElement = document.createElement('img');
        itemElement.src = `assets/images/items/${item.id}.png`;
        itemElement.alt = item.name;
        itemElement.dataset.id = item.id;
        itemElement.draggable = true;
        itemElement.addEventListener('dragstart', handleDragStart);
        itemList.appendChild(itemElement);
    });

    // Create Board Hexes
    for (let i = 0; i < 28; i++) {
        const hex = document.createElement('div');
        hex.classList.add('hex');
        hex.addEventListener('dragover', handleDragOver);
        hex.addEventListener('drop', handleDrop);
        board.appendChild(hex);
    }

    // Create Bench Slots
    for (let i = 0; i < 9; i++) {
        const slot = document.createElement('div');
        slot.classList.add('champion-slot');
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
        bench.appendChild(slot);
    }

    let draggedItem = null;

    function handleDragStart(e) {
        draggedItem = e.target;
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        if (e.target.classList.contains('hex') || e.target.classList.contains('champion-slot')) {
            e.target.appendChild(draggedItem.cloneNode(true));
        }
    }
});
