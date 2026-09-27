const express = require("express");
const authmiddlewares = require("../middlewares/authmiddlewares");
const {
  getpanditbooking,
  bookingaccept,
  bookingcomplete,
} = require("../controllers/panditcontroller");
const { authorizeroles } = require("../middlewares/authorizers");

const router = express.Router();

router.get(
  "/getbooking",
  authmiddlewares,
  authorizeroles("pandit"),
  getpanditbooking,
);
router.patch(
  "/accept/:id",
  authmiddlewares,
  authorizeroles("pandit"),
  bookingaccept,
);
router.patch(
  "/complete/:id",
  authmiddlewares,
  authorizeroles("pandit"),
  bookingcomplete,
);

module.exports = router;
