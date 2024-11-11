document.getElementById('search-input').addEventListener('input', function() {
    let query = this.value;
    let resultsContainer = document.getElementById('search-results');
    
    if (query.length > 0) {
        fetch(`/buscar/?q=${query}`)
            .then(response => response.json())
            .then(data => {
                resultsContainer.innerHTML = '';  
                
                if (data.usuarios.length > 0 || data.projetos.length > 0) {
                    data.usuarios.forEach(usuario => {
                        let li = document.createElement('li');
                        li.textContent = usuario.username;
                        li.onclick = function() {
                            window.location.href = usuario.perfil_url;
                        };
                        resultsContainer.appendChild(li);
                    });
                    
                    data.projetos.forEach(projeto => {
                        let li = document.createElement('li');
                        li.textContent = projeto.titulo;
                        li.onclick = function() {
                            window.location.href = projeto.projeto_url;
                        };
                        resultsContainer.appendChild(li);
                    });

                    resultsContainer.style.display = 'block';
                    resultsContainer.style.maxHeight = '200px'; 
                } else {
                    resultsContainer.innerHTML = '<li>Nenhum resultado encontrado</li>';
                    resultsContainer.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar:', error);
            });
    } else {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
    }
});
