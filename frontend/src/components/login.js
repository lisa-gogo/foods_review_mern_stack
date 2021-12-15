import {React, useState} from "react"
import {useNavigate} from 'react-router-dom'



function Login({login}) {
 
  let navigate = useNavigate()

  
  const initialUserState = {
    name: "",
    id: "",
  };
  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const loginTo = () => {
        login(user)
        navigate('/')
  }

  return (
    <div className="submit-form">
    <div>
      <div className="form-group">
        <label htmlFor="user" style={{fontSize:'20px', fontWeight:'bold'}}>Username <p style={{fontSize:'13px', fontWeight:'bold',color:'white'}}>(You can enter any username and ID)</p> </label>
        <input
          type="text"
          className="form-control"
          id="name"
          required
          value={user.name}
          onChange={handleInputChange}
          name="name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="id">ID</label>
        <input
          type="text"
          className="form-control"
          id="id"
          required
          value={user.id}
          onChange={handleInputChange}
          name="id"
        />
      </div>

      <button onClick={loginTo} className="btn btn-success">
        Login
      </button>
    </div>
  </div>
  );
}

export default Login;