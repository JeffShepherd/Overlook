class Hotel {
  constructor(roomData, bookingsData) {
    this.rooms = roomData;
    this.bookings = bookingsData;
  }
  getBookingsByID(userID) {
    return this.bookings.filter(booking => booking.userID === userID);
  }

  getPastBookings(today, userID) {
    return this.getBookingsByID(userID).filter(booking => booking.date < today);
  }

  getCurrentBookings(today, userID) {
    return this.getBookingsByID(userID).filter(booking => booking.date >= today);
  }

  calculateTotalCost(userID) {
    const roomNums = this.getBookingsByID(userID).map(booking => booking.roomNumber);

    return this.rooms.reduce((totalCost, room) => {
      let roomCounter = roomNums.filter(num => num === room.number);
      totalCost += roomCounter.length * room.costPerNight;
      return totalCost;
    }, 0)
  }

  getRoomDetails(roomNumber) {
    return this.rooms.find(room => room.number === roomNumber)
  }

  findAvailableRooms(date) {
    const bookedRooms = this.bookings.reduce((rooms, booking) => {
      if (booking.date === date) {
        rooms.push(booking.roomNumber);
      }
      return rooms;
    }, [])

    return this.rooms.filter(room => !bookedRooms.includes(room.number))
  }

  findRoomsWithFilter(date, filterValue) {
    const availableRooms = this.findAvailableRooms(date);

    return availableRooms.filter(room => room.roomType === filterValue)
  }


}

export default Hotel;