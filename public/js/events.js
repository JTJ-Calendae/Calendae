// changes the value of the date to the current day when adding an event
document.querySelector('#addevent-date').valueAsDate = new Date();

let currentDay = new Date();
let currentMonth = currentDay.getMonth();
let currentYear = currentDay.getFullYear();
let monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let selectedMonth = document.querySelector('#month');
let selectedYear = document.querySelector('#year');
let monthAndYear = document.querySelector('#monthandyear');
const closeModal = document.querySelector('#closeModal');
const closeModalBtn = document.querySelector('#closeModalBtn');
const modal = document.querySelector('#modalHero');
const addEventBtn = document.querySelector('#add-event');
const createEventBtn = document.querySelector('#createEventBtn');
const dayviewevent = document.getElementsByClassName('dayvieweventid');

const previousMonth = () => {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  makeCalendar(currentMonth, currentYear);
}

const nextMonth = () => {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  makeCalendar(currentMonth, currentYear);
}

const jumpMonthYear = () => {
  currentYear = parseInt(selectedYear.value);
  currentMonth = parseInt(selectedMonth.value);
  makeCalendar(currentMonth, currentYear);
}

const makeCalendar = (month, year) => {
  let calendarBody = document.querySelector('#calendarbody');
  let firstOfMonth = (new Date(year, month)).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();
  //empty data from other months
  calendarBody.innerHTML = "";
  // enter data for non-table cell elements
  monthAndYear.innerHTML = `${monthsArr[month]} ${year}`
  selectedYear.value = year;
  selectedMonth.value = month;
  // create table cells
  let date = 1;
  for (i = 0; i < 6; i++) {
    let tRow = document.createElement('tr');
    for (d = 0; d < 7; d++) {
      if (i === 0 && d < firstOfMonth) {
        let tCell = document.createElement('td');
        let tCellTxt = document.createTextNode('');
        tCell.appendChild(tCellTxt);
        tRow.appendChild(tCell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let tCell = document.createElement('td');
        let tCellTxt = document.createTextNode(date);
        if (date === currentDay.getDate() && year === currentDay.getFullYear() && month === currentDay.getMonth()) {
          // color today's date
          tCell.classList.add('is-light', 'is-success');
        }
        tCell.appendChild(tCellTxt);
        tRow.appendChild(tCell);
        date++;
      }
    }
    calendarBody.appendChild(tRow);
  }
}

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
makeCalendar(currentMonth, currentYear);
init();