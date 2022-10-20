import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default props => {
    const [inputValues, setInputValues] = useState({});
    const navigate = useNavigate();
    const handleInputChange = (e) =>{
        setInputValues({...inputValues,[e.target.name]:e.target.value})
    }

    const login = () => {
        props.login(inputValues);
        navigate("/");
    }

    return(
    <div className="container">
      <h2>Please Login</h2>
        {inputValues.name}
            <div>
                <div className="mb-3">
                    <label htmlFor = "username">Username</label>
                    <input id = "username" className = "form-control" type = "text" name = "name" onChange = {handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor = "useId">User ID</label>
                    <input id = "useId" className = "form-control" type = "text"  name = "userId" onChange = {handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor = "password">Passrord</label>
                    <input id = "password" className = "form-control" type = "password" name = "password" onChange = {handleInputChange}/>
                </div>
                    <input className = "btn btn-primary" type = "submit" onClick = {login}/>
                </div>
        <div>
      </div>
    </div>    
  );
};