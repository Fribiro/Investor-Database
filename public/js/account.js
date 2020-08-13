const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

const entrepreneurBtn = document.querySelector('#entrepreneurSignup');
const investorBtn = document.querySelector('#investorSignup');

const entrepreneurSection = document.querySelector('#entrepreneurSignup');
const investorSection = document.querySelector('#investorSignup');

entrepreneurBtn.addEventListener('click', () => {
  entrepreneurBtn.classList.remove('selected');
  investorBtn.classList.add('selected');
  entrepreneurSection.classList.remove('show')
  investorBtn.classList.add('show');
});

investorBtn.addEventListener('click', () => {
  entrepreneurBtn.classList.add('selected');
  investorBtn.classList.remove('selected');
  entrepreneurSection.classList.add('show')
  investorBtn.classList.remove('show');
});
