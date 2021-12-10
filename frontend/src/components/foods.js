import React,{useState, useEffect} from "react";
import FoodsDataService from '../services/food'
import {Link, useLocation} from "react-router-dom";

const Foods = _ => { 
  const {state} = useLocation();
  console.log(state)
  const initialFoodState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };

  const [food, setFood] = useState (initialFoodState);

  const getFood  = id => {
    console.log(id)
    FoodsDataService.get(id)
      .then(response => {
        setFood(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFood(state.user._id);
  }, [state]);

  const deleteReview = (reviewId, index) => {
    FoodsDataService.deleteReview(reviewId, state.user.id)
      .then(response => {
        setFood((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <div>
      {food ? (
        <div>
          <h5>{food.name}</h5>
          <p>
            <strong>Cuisine: </strong>{food.cuisine}<br/>
            <strong>Address: </strong>{food.address.building} {food.address.street}, {food.address.zipcode}
          </p>
          <Link to={"/foods/" + state.match + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4> Reviews </h4>
          <div className="row">
            {food.reviews.length > 0 ? (
             food.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {review.text}<br/>
                         <strong>User: </strong>{review.name}<br/>
                         <strong>Date: </strong>{review.date}
                       </p>
                       {state.user && state.user.id === review.user_id &&
                          <div className="row">
                            <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to={{
                              pathname: "/foods/" + state.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No food selected.</p>
        </div>
      )}
    </div>
  );
}

export default Foods;