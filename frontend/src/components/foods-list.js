import React, {useState, useEffect} from "react";
import FoodsDataService from"../services/food.js"
import { Link } from "react-router-dom"


function FoodsList() {
  const [Foods, setFoods] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchZip, setSearchZip ] = useState("");
  const [searchCuisine, setSearchCuisine ] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
 
  useEffect(() => {
    retrieveFoods();
    retrieveCuisines();
  }, []);

  const retrieveFoods = () => {
    FoodsDataService.getAll()
      .then(res => {
        setFoods(res.data.foods);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    FoodsDataService.getCuisines()
      .then(res => {
        setCuisines(["All Cuisines"].concat(res.data));
        console.log(res.data)
      })
      .catch(e => {
        console.log(e);
      });
  };

  // onChange 

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
    
  };



  const refreshList = () => {
   retrieveFoods();
  };

  const find = (query, by) => {
    FoodsDataService.find(query, by)
      .then(response => {
        console.log(response)
        setFoods(response.data.foods);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const findByName = () => {
    find(searchName, "name")
  };
  const findByZip = () => {
    find(searchZip, "zipcode")
  };

  const findByCuisine = () => {
    if (searchCuisine ==="All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine")
    }
  }
  
  const handleKeyPressZip = (e)=>{
     if(e.key === 'Enter') {
      find(searchZip, "zipcode")
  }}
   
  const handleKeyPressName =(e)=>{
     if(e.key === "Enter"){
       find(searchName, "name")
     }
  }

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
            onKeyPress={e=>handleKeyPressName(e)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
            onKeyPress={e=>handleKeyPressZip(e)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">

          <select onChange={onChangeSearchCuisine}>
             {cuisines.map(cuisine => {
               return (
                 <option value={cuisine}> {cuisine.substr(0, 20)} </option>
               )
             })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>

        </div>
      </div>
      <div className="row">
        {Foods.map((food) => {
          const address = `${food.address.building} ${food.address.street}, ${food.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{food.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>{food.cuisine}<br/>
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                  <Link to={"/foods/"+food._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    View Reviews
                  </Link>
                  <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
}

export default FoodsList;