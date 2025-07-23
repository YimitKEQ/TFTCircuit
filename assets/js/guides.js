document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.guide-filter-btn');
    const guidesGrid = document.getElementById('guides-grid');
    const guideCards = guidesGrid.querySelectorAll('.feature-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            // Update button active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter guides
            guideCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});