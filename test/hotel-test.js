import {
  expect
} from 'chai';
import Hotel from '../src/Hotel';
import {
  testRoomData,
  testBookingData
} from './test-data';

describe('Hotel', function () {

  let hotel, hotel2;

  beforeEach(function () {
    hotel = new Hotel(testRoomData, testBookingData);
    hotel2 = new Hotel(testRoomData, [testBookingData[0], testBookingData[1]])
  });

  it('should be a function', function () {
    expect(Hotel).to.be.a('function')
  });

  it('should be an instance of Customer', function () {
    expect(hotel).to.be.an.instanceof(Hotel)
  });

  it('should have a list of rooms', function () {
    expect(hotel.rooms.length).to.equal(9)
  });

  it('should have a list of past and present room bookings', function () {
    expect(hotel.bookings.length).to.equal(14)
  });

  it('should be able to have a different list of bookings', function () {
    expect(hotel2.bookings.length).to.equal(2)
  });


});