/*
1. It creates a variable called time and assigns it the element with the id of time.
2. It creates a variable called greeting and assigns it the element with the id of greeting.
3. It creates a variable called name and assigns it the element with the id of name.
4. It creates a variable called focus and assigns it the element with the id of focus.
5. It creates a variable called content and assigns it the element with the id of content.
6. It creates a variable called author and assigns it the element with the id of author.
*/
const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
const content = document.getElementById('content');
const author = document.getElementById('author');


/*
1. First, it creates a new Date object and stores it in the variable today.
2. It then gets the current hour, minute, and second from the Date object and stores them in the variables hour, min, and sec.
3. It then checks if the current hour is greater than or equal to 12.
4. If it is, it sets the variable amPm to ‘PM’. Otherwise, it sets it to ‘AM’.
5. It then gets the current hour modulo 12 (i.e. the remainder of the current hour divided by 12) and stores it in the variable hour.
6. If the hour is less than 10, it adds a 0 to the beginning of the hour.
7. It then concatenates the hour, a colon, the minute, a colon, and the second, and the amPm variable to the time variable.
8. It then sets a timeout to call the showTime function again after 1 second.
*/
const showTime = () => {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    const amPm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12 || 12;

    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${amPm}`;

    setTimeout(showTime, 1000);
};

/*
1. The function addZero() takes a number as an argument and returns a string.
2. If the number is less than 10, it adds a zero to the beginning of the number.
3. If the number is 10 or greater, it does nothing.
4. The function is called with the number as an argument.
*/
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

/*
1. First, it creates a new Date object and gets the current hour from it.
2. Then, it checks if the current hour is less than 12. If it is, it sets the background image to the morning.jpg image and sets the greeting text to “Good Morning, “.
3. If the current hour is less than 18, it sets the background image to the afternoon.jpg image and sets the greeting text to “Good Afternoon, “.
4. If the current hour is greater than or equal to 18, it sets the background image to the night.jpg image and sets the greeting text to “Good Evening, “.
*/
function setBg() {
    let hour = new Date().getHours();

    if (hour < 12) {
        document.body.style.backgroundImage = 'url(images/morning2.jpg)';
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
        document.body.style.backgroundImage = 'url(images/afternoon2.jpg)';
        greeting.textContent = 'Good Afternoon, ';
    } else {
        document.body.style.backgroundImage = 'url(images/night2.jpg)';
        greeting.textContent = 'Good Evening, ';
        
    }
}


/*
1. The getName function checks if there is a name in localStorage. If there is, it sets the name textContent to the name in localStorage. If there isn’t, it sets the name textContent to [Enter Name].
2. The onclick function sets the name textContent to the value in the input box. It then sets the value of the input box to “”, which clears the input box.
3. The onsubmit function sets the name in localStorage to the value in the input box, then sets the name textContent to the value in localStorage. It also sets the value of the input box to “”, which clears the input box.
*/
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

/*
1. First, it checks if the focus variable is null. If it is, it sets the focus variable to the text content of the focus element.
2. If the focus variable is not null, it sets the focus element’s text content to the focus variable.
*/
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

/*
1. First, it checks if the user has already entered their name and focus. If they have, it will skip the prompt.
2. If the user has not entered their name and focus, it will prompt them to enter their name and focus.
3. If the user clicks the “Next” button, it will save their name and focus to local storage.
4. If the user clicks the “Awesome!” button, it will display a message with their name and focus.
*/
if (localStorage.getItem('name') === null && localStorage.getItem('focus') === null) {
    Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        progressSteps: ['1', '2']
    }).queue([
        {
            title: 'Your Name'
        },
        {
            focus: 'Your Focus'
        }
    ]).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'You ready?!',
                html: `
              <p>Your Name: ${result.value[0]}</p>
              <p>Your Focus: ${result.value[1]}</p>
            `,
                confirmButtonText: 'Awesome!'
            })

            localStorage.setItem('name', result.value[0]);
            localStorage.setItem('focus', result.value[1]);
        }
    })
}

/*
1. First, we’re using axios to make a GET request to the Quotable API.
2. Then, we’re using the .then() method to run some code once the request is complete.
3. In the .then() method, we’re setting the textContent of the content and author elements to the content and author properties of the response object.
*/
axios.get('https://api.quotable.io/random').then(res => {
    content.textContent = res.data.content;
    author.textContent = res.data.author;
});

showTime();
setBg();
getName();
getFocus();