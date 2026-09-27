const User = require("../models/usermodel");
const Puja = require("../models/pujamodel");
const Booking = require("../models/bookingmodel");

// Customer
User.hasMany(Booking, {
  foreignKey: "userId",
  as: "userBookings",
});

Booking.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Pandit
User.hasMany(Booking, {
  foreignKey: "panditId",
  as: "panditBookings",
});

Booking.belongsTo(User, {
  foreignKey: "panditId",
  as: "pandit",
});

// Puja
Puja.hasMany(Booking, {
  foreignKey: "pujaId",
  as: "bookings",
});

Booking.belongsTo(Puja, {
  foreignKey: "pujaId",
  as: "puja",
});