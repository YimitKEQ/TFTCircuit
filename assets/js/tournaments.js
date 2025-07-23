document.addEventListener('DOMContentLoaded', () => {
    const tournamentTabs = document.querySelector('.tournament-tabs');
    const tournamentList = document.querySelector('.tournament-list');

    if (tournamentTabs && tournamentList) {
        const upcomingTournaments = tournamentList.innerHTML;
        const ongoingTournaments = `
            <div class="tournament-card">
                <div class="tournament-info" style="text-align: center; width: 100%; grid-column: 1 / -1;">
                    <h3>No ongoing tournaments at the moment.</h3>
                    <p>Check back later for live events!</p>
                </div>
            </div>
        `;

        tournamentTabs.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                // Remove active class from all buttons
                tournamentTabs.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                // Add active class to the clicked button
                e.target.classList.add('active');

                if (e.target.textContent === 'Upcoming') {
                    tournamentList.innerHTML = upcomingTournaments;
                } else if (e.target.textContent === 'Ongoing') {
                    tournamentList.innerHTML = ongoingTournaments;
                }
            }
        });
    }
});