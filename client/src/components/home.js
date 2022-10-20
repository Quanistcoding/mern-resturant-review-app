import {useEffect,useState} from "react";
import resturantDataService from "../services/resturants.js";
import {Link} from "react-router-dom";

//THe home page displays all resturants
export default props => {
    const [resturants,setResturants] = useState([]);
    const [cuisines,setCuisines] = useState(["All Cuisines"]);
    const [resturantName,setResturantName] = useState();
    const [zipcode,setZipcode] = useState();
    const [cuisineSearched,setCuisineSearched] = useState();

    useEffect(()=>{
        getAllResturants();
        getAllCuisines();
    },[]);

    //Initial rendering of all resturants and cuisines
    const getAllResturants = (query) => {
        resturantDataService.getAllResturants(query)
        .then(response=>{
            setResturants(response.data);
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const getAllCuisines = () => {
        resturantDataService.getAllCuisines()
        .then(response=>{
            setCuisines(["All Cuisines"].concat(response.data));
        })
        .catch(error=>{
            console.log(error)
        })
    }

    //Setting searching criteria
    const setNameSearch = (e) =>{
        setResturantName(e.target.value);
    }

    const setZipcodeSearch = (e) =>{
        setZipcode(e.target.value);
    }

    const setCuisineSearch = (e) =>{
        setCuisineSearched(e.target.value);
    }

    const search = () =>{
        let queryString = `?name=${resturantName || ""}&zipcode=${zipcode || ""}&cuisine=${cuisineSearched || ""}`;
        getAllResturants(queryString);
    }


    return(
       <div>
    
      <div className="row m-3">
            <div className="col">
                <div className="input-group">
                    <input className="form-control" placeholder="resturant name" onChange = {setNameSearch}/>
                </div>
            </div>
            <div className="col">
                <div className="input-group">
                    <input className="form-control" placeholder="resturant zipcode" onChange = {setZipcodeSearch}/>
                </div>
            </div>
            <div className="col">
                <div className="input-group">
                    <select className="form-select" onChange = {setCuisineSearch}>
                        {cuisines.map((x,i)=>(                        
                            <option key = {"id_" + i}>{x}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="col">
                    <button className="btn btn-primary " onClick = {search}>Search</button>
            </div>
      </div>
            <div className="row">                   
                {resturants.map(x=>{
                let address = x.address.building + ", " + x.address.street + ", " + x.address.zipcode;
                return(
                    <div className="col-4" key = {x._id}>
                            <div className="card m-3">
                            <div className="card-body">
                                    <h5 className="card-title">{x.name}</h5>
                                    <strong>Cuisines:</strong> {x.cuisine}<br/>
                                    <strong>Address:</strong> {address}
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <Link to={"/resturant/" + x._id} className="btn btn-primary btn-block">View Reviews</Link>
                                        <a href={"https://www.google.com.tw/maps/place/" + address} className="btn btn-primary btn-block">View Map</a>
                                    </div>
                                </div>
                            </div>
                         </div>
                )})}
            </div>      
      </div>
  );
};


