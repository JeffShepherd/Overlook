// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import './images/binoculars.svg';
import './css/base.scss';
import {
  getData
} from './api.js'

import Customer from './Customer';
import Hotel from './Hotel';

let hotel, currentUser;

function startApplication() {
  Promise.all([getData('rooms'), getData('bookings'), getData('customers/1')]) //3rd request hardcoded for now
    .then(values => {
      hotel = new Hotel(values[0], values[1])
      currentUser = new Customer(values[2])
      //dom display function kick-off here
    })
}


window.addEventListener('load', startApplication)