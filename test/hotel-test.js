import {
  expect
} from 'chai';
import Hotel from '../src/Hotel';
import {
  testRoomData,
  testBookingData
} from './test-data';

describe('Hotel', function () {

  let hotel, hotel2, hotel3;

  beforeEach(function () {
    hotel = new Hotel(testRoomData, testBookingData);
    hotel2 = new Hotel(testRoomData, [testBookingData[0], testBookingData[1]])
    hotel3 = new Hotel([testRoomData[6]], testBookingData)
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

  it('should be able to return room bookings by id', function () {
    const bookings = hotel.getBookingsByID(1);
    expect(bookings.length).to.equal(2);
  })

  it('should be able to return room bookings for a different id', function () {
    const bookings = hotel2.getBookingsByID(1);
    expect(bookings).to.deep.equal([]);
  })

  it('should be able to return past room bookings by id', function () {
    const bookings = hotel.getPastBookings("2021/03/06", 1);
    expect(bookings.length).to.equal(2);
    expect(bookings[0].id).to.deep.equal('5fwrgu4i7k55hl6t8')
  })

  it('should be able to return present/future room bookings by id', function () {
    const bookings = hotel.getCurrentBookings("2020/02/15", 1);
    expect(bookings).to.deep.equal([]);
    const bookings2 = hotel.getCurrentBookings("2019/03/06", 1);
    expect(bookings2.length).to.deep.equal(2)
    const bookings3 = hotel.getCurrentBookings("2020/02/14", 1);
    expect(bookings3.length).to.deep.equal(1);
    expect(bookings3[0].id).to.deep.equal('5fwrgu4i7k55hl6t9')
  })

  it('should be able to calculate the total a specific customer has spent on rooms', function () {
    expect(hotel.calculateTotalCost(1)).to.equal(461.65);
    expect(hotel2.calculateTotalCost(9)).to.equal(231.46);
  })

  it('should be able to calculate total cost if same room number has been booked more than once', function () {
    expect(hotel.calculateTotalCost(4)).to.equal(794.04);
  })

  it('should be able to provide room details by room number', function () {
    expect(hotel.getRoomDetails(15).roomType).to.equal("single room")
    expect(hotel.getRoomDetails(15).costPerNight).to.equal(231.46)
    expect(hotel.getRoomDetails(100)).to.equal(undefined)
  })

  it('should be able to return all rooms available for a given date', function () {
    expect(hotel.findAvailableRooms("2020/04/22").length).to.equal(8)
    expect(hotel3.findAvailableRooms("2020/04/22")).to.deep.equal([])
  })

  it('should be able to return all rooms available for a given date and filter value', function () {
    expect(hotel.findRoomsWithFilter("2020/04/22", "single room").length).to.equal(4)
    expect(hotel.findRoomsWithFilter("2020/04/22", "residential suite").length).to.equal(1)
    expect(hotel.findRoomsWithFilter("2020/04/22", "junior suite")).to.deep.equal([])
  })

});