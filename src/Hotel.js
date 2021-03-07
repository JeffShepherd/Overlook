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

  getCurrentBookings(today, userID) {
    const orderedBookings = this.getBookingsByID(userID).sort((a, b) => a.date - b.date);
    return orderedBookings.filter(booking => booking.date >= today)
  }

  calculateTotalCost(userID) {
    const roomNums = this.getBookingsByID(userID).map(booking => booking.roomNumber);

    return this.rooms.reduce((totalCost, room) => {
      if (roomNums.includes(room.number)) {
        totalCost += room.costPerNight;
      }
      return totalCost;
    }, 0)
  }

  getRoomDetails(roomNumber) {
    let details = [];
    this.rooms.forEach(room => {
      if (room.number === roomNumber) {
        details.push(room.roomType);
        details.push(room.costPerNight);
      }
    })
    return details;
  }

}

export default Hotel;