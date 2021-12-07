import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let foods // reference to the database 


export default class FoodsDAO{
    static async injectDB(conn) {
      if (foods) {
        return
      }
      try {
        foods = await conn.db(process.env.FOODTASTE_NS).collection("restaurants")
      } catch (e) {
        console.error(
          `Unable to establish a collection handle in foodsDAO: ${e}`,
        )
      }
    }

    static async getFoods({
        filters = null,
        page = 0,
        foodsPerPage = 20,
      } = {}) {
        let query
        if (filters) {
          if ("name" in filters) {
            query = { $text: { $search: filters["name"] } }
          } else if ("cuisine" in filters) {
            query = { "cuisine": { $eq: filters["cuisine"] } }
          } else if ("zipcode" in filters) {
            query = { "address.zipcode": { $eq: filters["zipcode"] } }
          }
        }
        let cursor
    
        try {
          cursor = await foods
            .find(query)
        } catch (e) {
          console.error(`Unable to issue find command, ${e}`)
          return { foodsList: [], totalNumFoods: 0 }
        }

        const displayCursor = cursor.limit(foodsPerPage).skip(foodsPerPage * page)
         // many page outcome 
        try {
          const foodsList = await displayCursor.toArray()
          const totalNumFoods = await foods.countDocuments(query)
    
          return { foodsList, totalNumFoods }
        } catch (e) {
          console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`,
          )
          return {foodsList: [], totalNumFoods: 0 }
        }
      }

      static async getFoodsByID(id) {
        try {
          const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
                  {
                      $lookup: {
                          from: "reviews",
                          let: {
                              id: "$_id",
                          },
                          pipeline: [
                              {
                                  $match: {
                                      $expr: {
                                          $eq: ["$restaurant_id", "$$id"],
                                      },
                                  },
                              },
                              {
                                  $sort: {
                                      date: -1,
                                  },
                              },
                          ],
                          as: "reviews",
                      },
                  },
                  {
                      $addFields: {
                          reviews: "$reviews",
                      },
                  },
              ]
          return await foods.aggregate(pipeline).next()
        } catch (e) {
          console.error(`Something went wrong in getFoodsByID: ${e}`)
          throw e
        }
      }
    
      static async getCuisines() {
        let cuisines = []
        try {
          cuisines = await foods.distinct("cuisine")
          return cuisines
        } catch (e) {
          console.error(`Unable to get cuisines, ${e}`)
          return cuisines
        }
      }
      
    }

    