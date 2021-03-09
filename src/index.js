import moment from 'moment';
import './images/binoculars-yellow.svg';
import './css/base.scss';
import {
  checkIfError,
  getData,
  postNewBooking
} from './api.js';
import Customer from './Customer';
import Hotel from './Hotel';

//query selectors
const totalSpent = document.querySelector('#totalSpent');
const viewDescription = document.querySelector('#viewDescription');
const mainSection = document.querySelector('#mainSection');
const pastBookings = document.querySelector('#pastBookings');
const currentBookings = document.querySelector('#currentBookings');
const dateInput = document.querySelector('#dateInput');
const roomSearchButton = document.querySelector('#roomSearchButton');
const roomTypeSelector = document.querySelector('#roomTypeSelector');
const userName = document.querySelector('#userName');
const loginButton = document.querySelector('#loginButton');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const loginError = document.querySelector('#loginError');
const loginPage = document.querySelector('#loginPage');

//global variables
let hotel, currentUser;

//login validation
function checkCredentials() {
  const userName = username.value

  if (password.value !== 'overlook2021' || userName.length < 9) {
    resetLoginFailure();
  } else {
    validateUsername(userName);
  }
}

function validateUsername(username) {
  const customer = username.slice(0, 8);
  let userID = parseInt(username.slice(8));

  if (customer === 'customer' && username[8] !== '0' && typeof userID === 'number' && userID > 0 && userID < 51) {
    loginPage.classList.add('hidden');
    startApplication(userID);
  } else {
    resetLoginFailure();
  }
}

function resetLoginFailure() {
  username.value = '';
  password.value = '';
  loginError.innerText = 'Your username and/or password is incorrect. Please try again.';
}

//main startup function
function startApplication(id) {
  Promise.all([getData('rooms'), getData('bookings'), getData(`customers/${id}`)])
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
  userName.innerText = `👤 ${currentUser.name}`;
  viewDescription.innerText = 'Thank you for considering Overlook Hotel! Now viewing: all upcoming reservations';
}

function displayTotalCost() {
  const cost = hotel.calculateTotalCost(currentUser.id);
  totalSpent.innerText = `Total spent: $${cost.toFixed(2)}`;
}

function setMinDate() {
  dateInput.min = getDateToday().replace(/\//g, '-');
  dateInput.value = getDateToday().replace(/\//g, '-');
}

function getDateToday() {
  return moment().format(`YYYY/MM/DD`);
}


function displayCurrentBookings() {
  const today = getDateToday();
  const bookings = hotel.getCurrentBookings(today, currentUser.id);

  if (!bookings.length) {
    mainSection.innerHTML = '';
    return viewDescription.innerText = 'You have no upcoming stays with Overlook Hotel. We would be happy to have you!'
  }

  displayBookingCards(bookings);
  viewDescription.innerText = 'Now viewing: upcoming stays';
}

function displayPastBookings() {
  const today = getDateToday();
  const bookings = hotel.getPastBookings(today, currentUser.id);

  if (!bookings.length) {
    mainSection.innerHTML = '';
    return viewDescription.innerText = 'You have never stayed at Overlook Hotel before. We would be happy to have you!'
  }

  displayBookingCards(bookings);
  viewDescription.innerText = 'Now viewing: past bookings'
}

function displayBookingCards(bookings) {
  mainSection.innerHTML = '';

  bookings.forEach(booking => {
    const roomDetails = hotel.getRoomDetails(booking.roomNumber);
    mainSection.innerHTML += `
    <article class="card">
      <p>Date of stay: ${booking.date}</p>
      <p>Room type: ${roomDetails.roomType}</p>
      <p>Cost per night: $${roomDetails.costPerNight}</p>
    </article>`
  });
}


function findRooms() {
  let availableRooms;
  let date = dateInput.value.replace(/-/g, '/')

  if (roomTypeSelector.value === '') {
    availableRooms = hotel.findAvailableRooms(date);
  } else {
    availableRooms = hotel.findRoomsWithFilter(date, roomTypeSelector.value);
  }

  if (!availableRooms.length) {
    mainSection.innerHTML = '';
    return viewDescription.innerText = 'Our deepest apologies, but no rooms are available for this date. Please adjust your search criteria.';
  }

  mainSection.innerHTML = '';

  availableRooms.forEach(room => {
    mainSection.innerHTML += `
    <article class="card" id="${date}.${room.number}">
      <p>Room type: ${room.roomType}</p>
      <p>Number of beds: ${room.numBeds}</p>
      <p>Bed size: ${room.bedSize}</p>
      <p>Bidet: ${room.bidet}</p>
      <p>Cost per night: $${room.costPerNight}</p>
      <button class="reserve-button">Reserve Room</button> 
    </article>`
  })

  targetCards();

  viewDescription.innerText = 'Now viewing: available rooms for your search criteria';
}


//target cards
function targetCards() {
  var buttons = document.querySelectorAll('.reserve-button');

  buttons.forEach(button => {
    button.addEventListener('click', function (event) {
      bookRoom(event);
    })
  })
}

//post room 
function bookRoom(event) {
  console.log(event.target.closest('article'))
  const bookingInfo = event.target.closest('article').id.split('.');
  console.log(bookingInfo)

  const postData = {
    "userID": currentUser.id,
    "date": bookingInfo[0],
    "roomNumber": parseInt(bookingInfo[1])
  }
  console.log('pre-post object', postData);

  postNewBooking(postData)
    .then(checkIfError)
    .then(json => {
      console.log('booking return', json.newBooking)
      hotel.bookings.push(json.newBooking); //push new data to class
      console.log('hotel bookings', hotel.bookings)
      updatePageAfterBooking(); //dom update
    })
    .catch(err => alert(err))
}

function updatePageAfterBooking() {
  displayCurrentBookings();
  viewDescription.innerText = 'Thanks for booking with us! You are now viewing your current reservations.'
  displayTotalCost();
}

//event listeners
loginButton.addEventListener('click', checkCredentials);
pastBookings.addEventListener('click', displayPastBookings);
currentBookings.addEventListener('click', displayCurrentBookings);
roomSearchButton.addEventListener('click', findRooms);