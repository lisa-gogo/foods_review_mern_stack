import React, {useState, useEffect} from "react";
import FoodsDataService from"../services/food.js"
import { Link } from "react-router-dom"



function FoodsList() {
  const [Foods, setFoods] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchZip, setSearchZip ] = useState("");
  const [searchCuisine, setSearchCuisine ] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const [page, setPage] = useState(0)
 
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

  const handleNextPage =()=>{
    console.log(page)
      setPage(page+1)
      console.log(page+1)
      FoodsDataService.getAll(page+1)
      .then(res => {
        setFoods(res.data.foods);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const handlePrePage=()=>{
    if(page>=1){
       setPage(page-1)
    FoodsDataService.getAll(page-1)
    .then(res => {
      setFoods(res.data.foods);
    })
    .catch(e => {
      console.log(e);
    });
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
        <div className="input-group col-lg-4" style={{marginBottom:'3px'}}>
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
              className="btn btn btn-success"
              type="button"
              onClick={findByName}
            
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4" style={{marginBottom:'3px'}}>
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
              className="btn btn-success"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group" >

          <select onChange={onChangeSearchCuisine}>
             {cuisines.map(cuisine => {
               return (
                 <option value={cuisine}> {cuisine.substr(0, 20)} </option>
               )
             })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-success"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button> 
          </div>
            
        </div>

      </div>
      <div className="d-flex mb-2 mt-2 justify-content-center ">
              <button className="btn btn-info"
            type="button"
            onClick={handlePrePage}
            style={{height:'40px',width:'120px', color:'white',padding:'0'}}
            >Previous Page</button>
            <div className="text-info d-flex justify-content-center align-items-center" style={{margin:'5px'}}> <p >---{page}---</p>  </div>
            <button className="btn btn-info"
            type="button"
            onClick={handleNextPage}
            style={{height:'40px',width:'120px',color:'white'}}
            >Next Page</button>
            </div>
      <div className="row">
        {Foods.map((food) => {
         
          const address = `${food.address.building} ${food.address.street}, ${food.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1" key={food._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{food.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>{food.cuisine}<br/>
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                  <Link to={`/foods/${food._id}`} id="view" className="btn btn-warning mb-1">
                    View Reviews
                  </Link>
                  <a target="_blank" href={"https://www.google.com/maps/place/" + address} id="map"
                  className="btn btn-warning">View Map <i class="fas fa-map-marked"></i></a>
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