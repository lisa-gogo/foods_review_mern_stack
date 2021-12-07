import FoodsDAO from "../dao/foodsDAO.js"

export default class FoodsController {
  static async apiGetFoods(req, res, next) {
    const foodsPerPage = req.query.foodsPerPage ? parseInt(req.query.foodsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { foodsList, totalNumFoods } = await FoodsDAO.getFoods({
      filters,
      page,
      foodsPerPage,
    })

    let response = {
      foods: foodsList,
      page: page,
      filters: filters,
      entries_per_page: foodsPerPage,
      total_results: totalNumFoods,
    }
    res.json(response)
    }

    static async apiGetFoodById(req, res, next) {
        try {
          let id = req.params.id || {}
          let food= await FoodsDAO.getFoodsByID(id)
          if (!food) {
            res.status(404).json({ error: "Not found" })
            return
          }
          res.json(food)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
      }
    
      static async apiGetFoodCuisines(req, res, next) {
        try {
          let cuisines = await FoodsDAO.getCuisines()
          res.json(cuisines)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
      }
}