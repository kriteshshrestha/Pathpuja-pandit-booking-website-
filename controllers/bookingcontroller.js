const bookingmodel = require("../models/bookingmodel");
const usermodel = require("../models/usermodel");
const pujamodel = require("../models/pujamodel");
const { Op } = require("sequelize");
const createbookingcontroller = async (req, res) => {
  try {
    const { pujaId, bookingDate } = req.body;
    if (!pujaId || !bookingDate) {
      return res.status(500).send({
        success: false,
        message: "enter the puja and booking date",
      });
    }
    const booking = await bookingmodel.create({
      userId: req.user.id,
      pujaId,
      bookingDate,
    });

    res.status(201).send({
      success: true,
      message: "booking successful",
      booking,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in create booking api",
      error,
    });
  }
};

const getbookingcontroller = async (req, res) => {
  try {
    //const Puja=await pujamodel.findAll();
    const bookinglist = await bookingmodel.findAll({
      where: {
        userId: req.user.id,
        status: {
          [Op.notIn]: ["cancelled", "rejected", "completed"],
        },
      },
      include: [
        {
          model: pujamodel,
          as: "puja",
        },
        {
          model: usermodel,
          as: "pandit",
          attributes: ["id", "username", "phone"],
        },
      ],
    });

    if (bookinglist.length == 0) {
      return res.status(500).send({
        success: false,
        message: "there is no booking made",
      });
    }
    res.status(200).send({
      success: true,
      message: "bookinglist fetch successful",
      bookinglist,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in view booking list api",
      error,
    });
  }
};

const getbookingbyidcontroller = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingmodel.findOne({
      where: {
        id: id,
        userId: req.user.id,
        status: {
          [Op.notIn]: ["cancelled", "rejected", "completed"],
        },
      },
      include: [
        {
          model: pujamodel,
          as: "puja",
        },
        {
          model: usermodel,
          as: "pandit",
          attributes: ["id", "username", "phone"],
        },
      ],
    });
    if (!booking) {
      return res.status(404).send({
        success: false,
        message: "booking not made",
      });
    }

    res.status(200).send({
      sucess: true,
      message: "booking fetch successful",
      booking,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get booking by id api",
      error,
    });
  }
};

const cancelbookingcontroller = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await bookingmodel.findOne({
      where: {
        id: id,
        userId: req.user.id,
      },
    });

    if (!booking) {
      return res.status(404).send({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).send({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    if (booking.status === "completed") {
      return res.status(400).send({
        success: false,
        message: "Completed booking cannot be cancelled",
      });
    }

    if (booking.status === "rejected") {
      return res.status(400).send({
        success: false,
        message: "Rejected booking cannot be cancelled",
      });
    }

    booking.status = "cancelled";

    await booking.save();

    res.status(200).send({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in cancel booking API",
      error: error.message,
    });
  }
};

module.exports = {
  createbookingcontroller,
  getbookingcontroller,
  getbookingbyidcontroller,
  cancelbookingcontroller,
};
