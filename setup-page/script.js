document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Glass Navbar functionality
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Modern scroll fade-in animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want it to animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 3. Parallax slight movement effect for stacked cards on mousemove
    const stackedCards = document.querySelector('.stacked-cards');
    const cardTop = document.querySelector('.card-top');
    const cardBottom = document.querySelector('.card-bottom');

    if (stackedCards) {
        stackedCards.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
            
            cardTop.style.transform = `rotate(5deg) translateY(${yAxis}px) translateX(${xAxis}px)`;
            cardBottom.style.transform = `rotate(-8deg) translateY(${-yAxis}px) translateX(${-xAxis}px)`;
        });

        // Reset positions on mouseleave
        stackedCards.addEventListener('mouseleave', () => {
            cardTop.style.transform = `rotate(5deg)`;
            cardBottom.style.transform = `rotate(-8deg)`;
        });
    }
});
function goToLogin() {
    window.location.href = "../login/login.html";
}