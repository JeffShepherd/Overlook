class Hotel {
  constructor(roomData, bookingsData) {
    this.rooms = roomData;
    this.bookings = bookingsData;
  }
  getBookingsByID(userID) {
    return this.bookings.filter(booking => booking.userID === userID)
  }

}


export default Hotel;