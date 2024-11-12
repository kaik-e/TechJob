const header = document.querySelector('.header');
let lastScrollTop = 0;

if (header) {
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            header.classList.add('hidden');
        } else {
            if (currentScroll === 0) {
                header.classList.remove('hidden');
            }
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
} else {
    console.warn('Elemento .header não encontrado no DOM.');
}
