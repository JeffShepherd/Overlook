class Hotel {
  constructor(roomData, bookingsData) {
    this.rooms = roomData;
    this.bookings = bookingsData;
  }
  getBookingsByID(userID) {
    return this.bookings.filter(booking => booking.userID === userID)
  }

  getPastBookings(today, userID, ) {
    const orderedBookings = this.getBookingsByID(userID).sort((a, b) => a.date - b.date);

    return orderedBookings.filter(booking => booking.date < today)
  }

}


export default Hotel;