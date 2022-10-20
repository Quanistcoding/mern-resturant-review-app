import {useState,useEffect} from "react"
import {useParams, Link} from "react-router-dom";
import resturantDataService from "../services/resturants.js";
import resveiwDataService from "../services/reviews.js";

const Resturant =  props => {
    let {id} = useParams();
    let {user} = props;
    console.log(user,id);
    const [resturant,setResturant] = useState({});

    useEffect(()=>{
        getOneResturant(id);
    },[id])

    const getOneResturant = (id) =>{
        resturantDataService.getOneResturant(id)
        .then(response=>{
            setResturant(response.data[0]);
            console.log(response.data[0]);
        })
        .catch(error=>{console.log(error)})
    }

    const deleteReview = (id,index) => {
        resveiwDataService.deleteView(id,user.userId)
            .then(response=>{          
                setResturant(pre=>{
                    pre.reviews.splice(index,1);
                    return {...pre};
                })
            })
            .catch(error=>{
                console.log(error)
            })
    }

    return(
        <div className="container">
            {resturant._id
            ?
            <div>
                <h3>{resturant.name}</h3>
                <div><strong>Cuisine: </strong>{resturant.cuisine}</div>
                <div><strong>Address: </strong>{resturant.address.building}</div>
                <Link to = {"/review/" + id} className="btn btn-outline-primary">Add Reviews</Link>
                    <h3>Reviews for {resturant.name}</h3>
                        <div className="row">
                        {resturant.reviews.length > 0
                            ?
                            resturant.reviews.map((review,i)=>{
                                return(
                                    <div key = {i} className="col-4">
                                        <div className="card mb-3">
                                            {review.review} 
                                                <div><strong>User: </strong> {review.name}</div>
                                                <div><strong>Date: </strong> {review.date}</div>
                                                {user.userId === review.user_id &&
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                    <button onClick = {()=>{deleteReview(review._id,i)}} className="btn btn-outline-danger">Delete</button>
                                                    <Link to = {"/review/" + id} state = {{currentReview:review,resturantName:resturant.name}} className="btn btn-outline-success">Edit</Link>
                                                </div>
                                                }
                                            </div>
                                        </div>
                                )
                            })
                            :
                            <div>No reviews.</div>
                        }
                        </div>
            </div>
            :
            <div>No resturant found</div>
        }
        </div>

  );
};

export default Resturant;