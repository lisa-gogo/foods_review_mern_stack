import React from "react";
import { Routes, Route, Link} from "react-router-dom";
import {useState} from "react"
// import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import Foods from "./components/foods";
import FoodsList from "./components/foods-list";
import AddReview from "./components/add-review";






function App() {
  const [user, setUser] = useState(null);
  
  
  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }


  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark" >
      <a href="/" className="navbar-brand" style={{marginLeft:'100px'}}>
      <i class="fas fa-drumstick-bite"></i> <i class="fas fa-hamburger"></i> <i class="fas fa-pizza-slice" style={{paddingRight:'5px'}}> </i>Restaurants Reviews
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          {/* <Link to={"/foods"} className="nav-link">
            Restaurants
          </Link> */}
        </li>
        <li className="nav-item" >
          { user ? (
            <a href onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
              Logout  user: {user.name}
            </a>
          ) : (            
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
          )}

        </li>
      </div>
    </nav>

    <div className="container mt-3">
      <Routes>
        <Route exact path="/" element={<FoodsList/>} />
        <Route exact path="/foods" element={<FoodsList/>}/>
        <Route 
          path="/foods/:id/review"
          element={<AddReview user={user} />}
        />
        <Route 
          exact path="/foods/:id"
          element={<Foods user={user} /> }
        />
        <Route 
          path="/login"
          element={ <Login login={login} />
          }
        />
        </Routes>
   
    </div>
  </div>
  );
}

export default App;
