
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});


document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    }
});


const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener("submit", function(e){
        e.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;   

        fetch("", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ name, email, message })
        })
        .then(res => res.text())
        .then(data => {
            document.getElementById("msg").innerText = data;
            document.getElementById("contactForm").reset();
        })
        .catch(err => {
            document.getElementById("msg").innerText = "Server error!";
        });
    });
}


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});


const revealElements = document.querySelectorAll('.project-card, .skill-group');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});


console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold;');
console.log('%cThanks for visiting my portfolio!', 'font-size: 14px;');
console.log('%c- Abishek', 'font-size: 14px; color: #888;');
