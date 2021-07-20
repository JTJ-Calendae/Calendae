const signUpRadio = document.querySelector('#signupradio');
const logInRadio = document.querySelector('#loginradio');
const signUpSection = document.querySelector('.signupsection');
const logInSection = document.querySelector('.loginsection');

const init = () => {
  signUpRadio.addEventListener('click', () => {
    logInSection.style.display = 'none'
    signUpSection.style.display = 'block'
    })
  
  logInRadio.addEventListener('click', () => {
    signUpSection.style.display = 'none'
    logInSection.style.display = 'block'
    })
}


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
            document.location.replace('/weekview');
        } else {
            alert("Incorrect password or invalid email.");
            console.log(response.statusText)
        }
    }
};


const loginFormHandler = async (event) => {
    event.preventDefault();

const username = document.querySelector('#username-login').value.trim();
const password = document.querySelector('#password-login').value.trim();


if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/weekview');
    } else {
        alert("Incorrect username or password.");
        console.log(response.statusText)    
    }
  }
};



document.querySelector('#submitsignup').addEventListener('click', signupFormHandler);
document.querySelector('#submitlogin').addEventListener('click', loginFormHandler);

init();