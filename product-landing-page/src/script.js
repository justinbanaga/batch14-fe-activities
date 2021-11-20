
const projectName = 'product-landing-page';

// add toggle button to navbar
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('nav-link')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})