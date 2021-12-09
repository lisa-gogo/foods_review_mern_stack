
import instance from "../http-common"

class FoodsDataService {
    getAll(page = 0) {
      return instance.get(`foods?page=${page}`);
    }
  
    get(id) {
      return instance.get(`/food?id=${id}`);
    }
  
    find(query, by = "name", page = 0) {
      return instance.get(`foods?${by}=${query}&page=${page}`);
    } 
  
    createReview(data) {
      return instance.post("/review-new", data);
    }
  
    updateReview(data) {
      return instance.put("/review-edit", data);
    }
  
    deleteReview(id, userId) {
      return instance.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
    }
  
    getCuisines(id) {
      return instance.get(`/cuisines`);
    }
  
  }
  
  export default new FoodsDataService();