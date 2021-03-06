import express from "express"
import FoodsCtrl from "./foods.controller.js"
import ReviewsCtrl from "./reviews.controller.js"
const router = express.Router()

router.route("/").get(FoodsCtrl.apiGetFoods)
router.route("/id/:id").get(FoodsCtrl.apiGetFoodById)
// http://localhost:5000/api/v1/foods/id/12377

router.route("/cuisines").get(FoodsCtrl.apiGetFoodCuisines)
router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router

