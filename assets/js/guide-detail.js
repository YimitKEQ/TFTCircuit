// assets/js/guide-detail.js
document.addEventListener('DOMContentLoaded', () => {
    const tocContainer = document.querySelector('.guide-toc ul');
    const guideContent = document.querySelector('.guide-content');
    const headings = guideContent.querySelectorAll('h2');

    if (!tocContainer || !guideContent || headings.length === 0) return;

    // Create ToC links
    headings.forEach(heading => {
        const id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
        heading.id = id;
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        listItem.appendChild(link);
        tocContainer.appendChild(listItem);
    });

    // Smooth scrolling for ToC links
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

    // Active link highlighting on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = document.querySelector(`.guide-toc a[href="#${id}"]`);
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                document.querySelectorAll('.guide-toc a').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }, { rootMargin: "-100px 0px -50% 0px", threshold: 0.5 });

    headings.forEach(heading => {
        observer.observe(heading);
    });
});
