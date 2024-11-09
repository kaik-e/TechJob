const form = document.getElementById('avaliacao-form');
const textarea = form.querySelector('textarea[name="comment"]');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', function(event) {
    if (!textarea.value.trim()) {
        event.preventDefault();  
        errorMessage.style.display = 'block';  
    } else {
        errorMessage.style.display = 'none'; 
    }
});