// changes the value of the date to the current day when adding an event
document.querySelector('#addevent-date').valueAsDate = new Date();

let currentDay = new Date();
let currentMonth = currentDay.getMonth();
let currentYear = currentDay.getFullYear();
let monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let selectedMonth = document.querySelector('#month');
let selectedYear = document.querySelector('#year');
let monthAndYear = document.querySelector('#monthandyear');
const closeModal = document.querySelector('#closeModal');
const closeModalBtn = document.querySelector('#closeModalBtn');
const modal = document.querySelector('#modalHero');
const addEventBtn = document.querySelector('#add-event');
const createEventBtn = document.querySelector('#createEventBtn');
const dayViewEvent = document.getElementsByClassName('dayvieweventid');

for (p = 0; p < dayViewEvent.length; p++) {
  var eventId = dayViewEvent[p].dataset.value;
}

const nextMonth = () => {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  makeCalendar(currentMonth, currentYear);
}

const previousMonth = () => {
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
  
  let eventDates = document.getElementsByClassName('eventdate');
  let eventTitle = document.getElementsByClassName('eventtitle');
  let eventTime = document.getElementsByClassName('eventtime');
  
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
  for (t = 0; t < eventDates.length; t++) {
    let eventDatesFull = eventDates[t].innerHTML;
    let calendarMonth = monthAndYear.innerHTML;
    let eventDateString = eventDatesFull.substr(4, 11);
    let eventMonth = eventDateString.substr(0, 3);
    let eventDay = eventDateString.substr(4, 2);
    let eventYear = parseInt(eventDateString.substr(7, 4));
    if ((eventMonth == calendarMonth.substr(0,3)) && (eventYear == parseInt(selectedYear.value))) {
      let cells = document.getElementsByTagName('td');
      for (c = 0; c < cells.length; c++) {
        // console.log(cells[c].innerHTML);
        if (cells[c].innerHTML === eventDay) {
          for (e = 0; e < eventTitle.length; e++) {
            if (eventDates[t].dataset.value === eventTitle[e].innerHTML) {
              let anchor = document.createElement('a');
              anchor.setAttribute('href', `/dayview/${[e + 1]}`);
              let pTag = document.createElement('p');
              let eventTagTxt = document.createTextNode(`${eventTitle[e].innerHTML} - ${eventTime[e].innerHTML}`);
              pTag.appendChild(eventTagTxt);
              anchor.appendChild(pTag)
              cells[c].appendChild(anchor);
            }
          }
        }
      }
    }
  }
}

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

createEventBtn.addEventListener('click', addEventHandler);
if (/weekview/.test(window.location)) {
  makeCalendar(currentMonth, currentYear);
}
init();