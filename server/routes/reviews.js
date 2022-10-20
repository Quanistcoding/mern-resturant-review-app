import express from "express";
import reviews from "../controllers/reviews.js";

const router = express.Router();

router.route("/")
    .get(reviews.findAll)
    .post(reviews.createOne)
    .put(reviews.updateOne)
    .delete(reviews.deleteOne)

router.route("/:id").get(reviews.findOneById);



export default router;