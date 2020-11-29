// You may wish to find an effective randomizer function on MDN.

// const { reverse } = require("cypress/types/lodash");
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(org, comparison, key) {
  if (org[key] < comparison[key]) {
    return -1;
  } if (org[key] > comparison[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  // set fave to yes
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const numbers = Array(243).fill().map((item, index) => index + 1);
      numbers.sort(() => Math.random() - 0.5);

      const newArr2 = numbers.slice(0, 10).map((num) => fromServer[num]);

      const reverseList = newArr2.sort((a, b) => b.name.localeCompare(a.name));
      const ol = document.createElement('ol');
      ol.className = 'flex-inner';
      
      reverseList.forEach((el, i) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${el.code} id=${el.code} />`);
        $(li).append(`<label for=${el.code}>${el.name}</label>`);
        $(ol).append(li);
      });
      document.querySelector('.header').after(ol);
    })
    .catch((err) => {
      console.log(err)
      // set fave to no
    });
});