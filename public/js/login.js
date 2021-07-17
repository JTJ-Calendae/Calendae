const signupFormHandler = async (event) => {
    event.preventDefault();

    const firstname = document.querySelector('#firstname-signup').value.trim();
    const lastname = document.querySelector('#lastname-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const confirmPassword = document.querySelector('#confirmPassword-signup').value.trim();

    if (password !== confirmPassword) {
        alert("Passwords must match")
        return 
    } else if (firstname && lastname && email && username && password && confirmPassword) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password, email, firstname, lastname }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            document.location.replace('/home');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#submitsignup').addEventListener('click', signupFormHandler);