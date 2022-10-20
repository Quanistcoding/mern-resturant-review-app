import express from "express";
import resturants from "../controllers/resturants.js";

const router = express.Router();

router.route("/").get(resturants.findAll);
//router.route("/:id").get(resturants.findOneById);
router.route("/id/:id").get(resturants.findResturantWithReviews);
router.route("/cuisines").get(resturants.findAllCuisines);

export default router;