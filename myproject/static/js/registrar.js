function toggleFields() {
    var userType = document.getElementById('user_type').value;
    if (userType == 'freelancer') {
        document.getElementById('freelancer_fields').style.display = 'block';
        document.getElementById('company_fields').style.display = 'none';
    } else {
        document.getElementById('freelancer_fields').style.display = 'none';
        document.getElementById('company_fields').style.display = 'block';
    }
}
