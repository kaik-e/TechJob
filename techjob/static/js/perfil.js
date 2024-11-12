
function showMessage() {
    const messages = document.querySelectorAll('.messages .alert');
    messages.forEach(message => {
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 3000);
    });
}

window.onload = showMessage;
document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById("toggle-btn");
    const hiddenItems = document.querySelectorAll(".evaluation-item.hidden");
    let showAll = false;
    if (toggleBtn) {
        toggleBtn.addEventListener("click", function() {
            hiddenItems.forEach(item => {
                item.style.display = showAll ? "none" : "list-item";
            });
            toggleBtn.textContent = showAll ? "Ver mais" : "Ver menos";
            showAll = !showAll;
        });
    }
});
