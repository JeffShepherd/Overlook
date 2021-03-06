import {
  expect
} from 'chai';
import Hotel from '../src/Hotel';
import {
  testRoomData,
  testBookingData
} from './test-data';

describe('Hotel', function () {

  let hotel;

  beforeEach(function () {
    hotel = new Hotel(testRoomData, testBookingData);
  });

  it('should be a function', function () {
    expect(Hotel).to.be.a('function')
  });

  it('should be an instance of Customer', function () {
    expect(hotel).to.be.an.instanceof(Hotel)
  });


});