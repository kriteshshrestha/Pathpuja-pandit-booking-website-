const bookingmodel = require("../models/bookingmodel");
const pujamodel = require("../models/pujamodel");
const usermodel = require("../models/usermodel");
const { Op } = require("sequelize");
const getpanditbooking = async (req, res) => {
  try {
    const bookinglist = await bookingmodel.findAll({
      where: {
        status: "pending",
      },
      include: [
        {
          model: pujamodel,
          as: "puja",
        },
        {
          model: usermodel,
          as: "user",
        },
      ],
    });

    if (bookinglist.length == 0) {
      return res.status(404).send({
        success: false,
        message: "there is not any booking",
      });
    }

    res.status(200).send({
      success: true,
      message: "pandit booking fetch successful",
      bookinglist,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get pandit booking api",
    });
  }
};

const bookingaccept = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingmodel.findByPk(id);

    if (!booking) {
      return res.status(500).send({
        success: false,
        message: "there is not any booking made",
      });
    }

    booking.status = "accepted";
    booking.panditId = req.user.id;
    await booking.save();

    res.status(200).send({
      success: true,
      message: "the booking is accepted",
      booking,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in pandit accept booking api",
    });
  }
};

const bookingcomplete = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingmodel.findOne({
      where: {
        id: id,
        panditId: req.user.id,
      },
    });
    if (!booking) {
      return res.status(500).send({
        success: false,
        message: "there is no booking made",
      });
    }
    if (booking.status == "completed") {
      return res.status(500).send({
        success: false,
        message: "booking is already completed",
      });
    }
    if (booking.status != "accepted") {
      return res.status(500).send({
        success: false,
        message: "the booking is not accepted",
      });
    }

    booking.status = "completed";
    await booking.save();
    res.status(200).send({
      success: true,
      message: "the booking is completed",
      booking,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in pandit complete booking api",
      error,
    });
  }
};

module.exports = { getpanditbooking, bookingaccept, bookingcomplete };
