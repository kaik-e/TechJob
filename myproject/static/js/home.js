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

document.getElementById('filter-button').addEventListener('click', function(event) {
    event.stopPropagation();
    document.getElementById('filter-dropdown').classList.toggle('hidden');
});

document.addEventListener('click', function(event) {
    let filterDropdown = document.getElementById('filter-dropdown');
    if (!filterDropdown.classList.contains('hidden')) {
        filterDropdown.classList.add('hidden');
    }
});

document.querySelectorAll('#filter-dropdown div').forEach(function(option) {
    option.addEventListener('click', function() {
        let filter = this.getAttribute('data-filter');
        document.querySelectorAll('.projeto-item').forEach(function(projeto) {
            if (filter === 'all' || projeto.getAttribute('data-category') === filter) {
                projeto.style.display = 'block';
            } else {
                projeto.style.display = 'none';
            }
        });
        let url = new URL(window.location.href);
        url.searchParams.set('filtro', filter);
        window.history.pushState({}, '', url.href);
        document.getElementById('filter-dropdown').classList.add('hidden');
    });
});
