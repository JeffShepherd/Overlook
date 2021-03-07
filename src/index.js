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
const mainSection = document.querySelector('#mainSection');

//global variables
let hotel, currentUser;


//main startup function
function startApplication() {
  Promise.all([getData('rooms'), getData('bookings'), getData('customers/1')]) //3rd request hardcoded for now
    .then(values => {
      hotel = new Hotel(values[0].rooms, values[1].bookings)
      currentUser = new Customer(values[2])
      //dom display function kick-off here
      populatePage()
    })
}

function populatePage() {
  displayTotalCost()
}

function displayTotalCost() {
  const cost = hotel.calculateTotalCost(currentUser.id);
  totalSpent.innerText = `Total spent on rooms: $${cost.toFixed(2)}`;
}





//event listeners
window.addEventListener('load', startApplication)