const pujamodel = require("../models/pujamodel");
const createpuja = async (req, res) => {
  try {
    const { name, description, price, duration, category } = req.body;
    if (!name || !description || !price || !duration || !category) {
      return res.status(500).send({
        success: false,
        message: "enter all the fileds",
      });
    }
    const puja = await pujamodel.create({
      name,
      description,
      price,
      duration,
      category,
    });
    res.status(201).send({
      success: true,
      message: "puja created successful",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in create puja api",
      error,
    });
  }
};

const getpuja = async (req, res) => {
  try {
    const puja = await pujamodel.findAll();
    res.status(200).send({
      success: true,
      message: "puja fetch successful",
      puja,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in getpuja api",
    });
  }
};

const getpujabyid = async (req, res) => {
  try {
    const { id } = req.params;
    const puja = await pujamodel.findByPk(id);

    if (!puja) {
      return res.status(404).send({
        success: false,
        message: "puja not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "puja fetch successful",
      puja,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get puja by id api",
    });
  }
};

module.exports = { createpuja, getpuja, getpujabyid };
