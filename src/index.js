// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import './images/binoculars.svg';
import './css/base.scss';
import {
  getData
} from './api.js'

import Customer from './Customer';
import Hotel from './Hotel';


//query selectors
const totalSpent = document.querySelector('#totalSpent');
const viewDescription = document.querySelector('#viewDescription');
const mainSection = document.querySelector('#mainSection');
const pastBookings = document.querySelector('#pastBookings');
const currentBookings = document.querySelector('#currentBookings');
const dateInput = document.querySelector('#dateInput');

//global variables
let hotel, currentUser;


//main startup function
function startApplication() {
  Promise.all([getData('rooms'), getData('bookings'), getData('customers/1')]) //3rd request hardcoded for now
    .then(values => {
      hotel = new Hotel(values[0].rooms, values[1].bookings)
      currentUser = new Customer(values[2])
      populateLandingPage()
    })
}

function populateLandingPage() {
  displayTotalCost();
  displayCurrentBookings();
  setMinDate();
}

function setMinDate() {
  dateInput.min = getDateToday().replace(/\//g, '-');
  dateInput.value = getDateToday().replace(/\//g, '-')
}

function displayTotalCost() {
  const cost = hotel.calculateTotalCost(currentUser.id);
  totalSpent.innerText = `Total spent on rooms: $${cost.toFixed(2)}`;
}

function getDateToday() {
  return new Date().toISOString().replace(/-/g, "/").split("T")[0];
}

function displayCurrentBookings() {
  const today = getDateToday();
  const bookings = hotel.getCurrentBookings(today, currentUser.id);

  if (!bookings.length) {
    mainSection.innerHTML = '';
    return viewDescription.innerText = 'You have no upcoming stays with Overlook Hotel. We would be happy to have you!'
  }

  const currentBookings = bookings.map(booking => {
    const roomDetails = hotel.getRoomDetails(booking.roomNumber);
    return `
    <article class="card">
      <p>Date of stay: ${booking.date}</p>
      <p>Room type: ${roomDetails.roomType}</p>
      <p>Cost per night: ${roomDetails.costPerNight}</p>
    </article>`
  });

  mainSection.innerHTML = currentBookings.join('\n');
  viewDescription.innerText = 'Now viewing: upcoming stays'
}

function displayPastBookings() {
  const today = getDateToday();
  const bookings = hotel.getPastBookings(today, currentUser.id);

  if (!bookings.length) {
    mainSection.innerHTML = '';
    return viewDescription.innerText = 'You have never stayed at Overlook Hotel before. We would be happy to have you!'
  }

  const pastBookings = bookings.map(booking => {
    const roomDetails = hotel.getRoomDetails(booking.roomNumber);
    return `
    <article class="card">
      <p>Date of stay: ${booking.date}</p>
      <p>Room type: ${roomDetails.roomType}</p>
      <p>Cost per night: ${roomDetails.costPerNight}</p>
    </article>`
  });

  mainSection.innerHTML = pastBookings.join('\n');
  viewDescription.innerText = 'Now viewing: past bookings'
}



//
//
//
//event listeners
window.addEventListener('load', startApplication)
pastBookings.addEventListener('click', displayPastBookings);
currentBookings.addEventListener('click', displayCurrentBookings);