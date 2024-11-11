document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('home-search-input').addEventListener('input', function() {
        let query = this.value;
        if (query.length > 0) {
            fetch(`/buscar/?q=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    let resultsContainer = document.getElementById('home-search-results');
                    resultsContainer.innerHTML = '';
                    if (data.projetos.length > 0) {
                        data.projetos.forEach(projeto => {
                            let li = document.createElement('li');
                            li.className = 'py-2 px-4 hover:bg-gray-700 cursor-pointer';
                            li.textContent = projeto.titulo;
                            li.onclick = function() {
                                window.location.href = projeto.projeto_url;
                            };
                            resultsContainer.appendChild(li);
                        });
                        resultsContainer.style.display = 'block';
                    } else {
                        resultsContainer.innerHTML = '<li class="py-2 px-4 text-gray-400">Nenhum resultado encontrado</li>';
                        resultsContainer.style.display = 'block';
                    }
                })
                .catch(error => console.error('Erro ao buscar:', error));
        } else {
            document.getElementById('home-search-results').innerHTML = '';
            document.getElementById('home-search-results').style.display = 'none';
        }
    });
});

const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Quando rolar para baixo, esconda o cabeçalho
        header.classList.add('hidden');
    } else {
        // Quando rolar para cima e chegar ao topo, mostre o cabeçalho
        if (currentScroll === 0) {
            header.classList.remove('hidden');
        }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Para evitar valores negativos
});
