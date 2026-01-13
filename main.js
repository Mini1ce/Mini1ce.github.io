document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });

    // --- Navbar Background on Scroll ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-lg');
            navbar.classList.add('bg-dark/95');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.classList.remove('bg-dark/95');
        }
    });

    // --- Scroll Reveal Animation ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Copy to Clipboard ---
    window.copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Email copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("Copy");
            textArea.remove();
            showToast('Email copied to clipboard!');
        });
    }

    function showToast(message) {
        const toast = document.getElementById('toast');
        const textSpan = toast.querySelector('span');
        if (textSpan) textSpan.innerText = message;

        // Show
        toast.classList.remove('translate-y-20', 'opacity-0');
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 3000);
    }

});