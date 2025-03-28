// Switch to register form
document.getElementById('show-register').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
});

// Switch to login form
document.getElementById('show-login').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

// Handle registration
document.getElementById('register').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const errorMessage = document.getElementById('register-error');

    if (!username || !password) {
        errorMessage.textContent = 'Please enter both username and password.';
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
        errorMessage.textContent = 'Username already exists.';
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    errorMessage.textContent = '';
    alert('Registration successful! Please login.');
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

// Handle login
document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('login-error');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        window.location.href = 'dashboard.html';
    } else {
        errorMessage.textContent = 'Invalid username or password.';
    }
});