
import http from "../http-common"

class FoodsDataService {
    getAll(page = 0) {
      return http.get(`?page=${page}`);
    }
  
    get(id) {
      console.log(id)
      return http.get(`id/${id}`);
    }
  
    find(query, by = "name", page = 0) {
      return http.get(`?${by}=${query}&page=${page}`);
    } 
  
    createReview(data) {
      return http.post("/review", data);
    }
  
    updateReview(data) {
      return http.put("/review-edit", data);
    }
  
    deleteReview(id, userId) {
      return http.delete(`/review?id=${id}`, {data:{user_id: userId}});
    }
  
    getCuisines(id) {
      return http.get(`/cuisines`);
    }
  
  }
  
  export default new FoodsDataService();