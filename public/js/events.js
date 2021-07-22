document.querySelector('#addevent-date').valueAsDate = new Date();

const closeModal = document.querySelector('#closeModal');
const closeModalBtn = document.querySelector('#closeModalBtn');
const modal = document.querySelector('#modalHero');
const addEventBtn = document.querySelector('#add-event');
const createEventBtn = document.querySelector('#createEventBtn');
const dayviewevent = document.getElementsByClassName('dayvieweventid');
const dayviewsecond = document.querySelectorAll('.dayviewsecond');

console.log(dayviewevent);
const datavalues = [];

for (const eventid of dayviewevent) {
  console.log(eventid.dataset.value);
  datavalues.push(eventid.dataset.value);
}
console.log('datavalues:', datavalues)


const init = () => {
  addEventBtn.addEventListener('click', () => {
    modal.classList.toggle('is-active');
  })
  closeModal.addEventListener('click', () => {
    modal.classList.toggle('is-active');
  });
  closeModalBtn.addEventListener('click', () => {
    modal.classList.toggle('is-active');
  })
}

const addEventHandler = async (event) => {
  event.preventDefault();
  
  const name = document.querySelector('#addevent-name').value.trim();
  const description = document.querySelector('#addevent-desc').value.trim();
  const date = document.querySelector('#addevent-date').value.trim();
  const time = document.querySelector('#addevent-time').value.trim();
  const address = document.querySelector('#addevent-address').value.trim();
  const unitapt = document.querySelector('#addevent-address2').value.trim();
  const city = document.querySelector('#addevent-city').value.trim();
  const state = document.querySelector('#addevent-state').value.trim();
  const zip = document.querySelector('#addevent-zip').value.trim();


  if (name && description && date && time) {
    const response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({ name, description, date, time, address, unitapt, city, state, zip }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      modal.classList.toggle('is-active');
      location.reload();
      console.log('name:', name);
      console.log('description:', description);
      console.log('date:', date);
      console.log('time:', time);
      console.log('address:', address);
      console.log('unitapt:', unitapt);
      console.log('city:', city);
      console.log('state:', state);
      console.log('zip:', zip);
      } else {
      alert("Error occured while adding event.");
      console.log(response.statusText)   
    }
  }
}

const viewEventHandler = async (event) => {
  // does a GET route of the 1 event and renders HTML page of clicked event
  event.preventDefault();
  const response = await fetch (`/api/events/${datavalues[0]}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });   
  if (response.ok) {
    document.location.replace(`/dayview/${datavalues[0]}`);

  }}
  
// dayviewsecond.addEventListener('click', viewEventHandler);

createEventBtn.addEventListener('click', addEventHandler);
init();