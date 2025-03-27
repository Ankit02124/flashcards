// theme.js - Handles theme switching functionality

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (themeToggle) {
            themeToggle.checked = savedTheme === 'dark-mode';
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.checked = true;
        }
    }

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', '');
            }
        });
    }
});