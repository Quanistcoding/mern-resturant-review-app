import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import reviewDataService from "../services/reviews";



export default props => {
    const { state } = useLocation();
    const [reviewContent, setReviewContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [review, setReview] = useState({});
    const { id } = useParams();
    const { user } = props;
    const navigate = useNavigate();
    console.log(user);
    useEffect(()=>{
        if(!user.name){
            navigate("/login");
        }
        if(state && state.currentReview){
            setIsEditing(true);    
            setReview(state.currentReview);
            setReviewContent(state.currentReview.review);
        }
    },[]);

    const handleReviewContent = (e) =>{
        setReviewContent(e.target.value);
    }
    
    const saveReview = () =>{
        let data = {
            review:reviewContent,
            username:user.name,
            userId:user.userId,
            resturantId:id
        }
        if(isEditing){
            data.reviewId = review._id;
            reviewDataService.editReview(data)
            .then(response=>{
                console.log(response.date);
                navigate("/resturant/" + id);
            })
            .catch(error=>{console.log(error)});
        }else{
            reviewDataService.addReview(data)
                .then(response=>{
                    console.log(response.date);
                    navigate("/resturant/" + id);
                })
                .catch(error=>{console.log(error)});
        }
    }
// const reviewId = req.body.reviewId;
// const userId = req.body.userId;
// const review = req.body.review;
    return(
      <div className="container">
        <h2>{!isEditing ? "Add Review" : "Edit Review for " + state.resturantName} </h2>
            <div>
                <div className="mb-3">
                    <textarea className="form-control" onChange = {handleReviewContent} value = {reviewContent}></textarea>
                </div>
                <div><button className="btn btn-primary" onClick = {saveReview}>{isEditing?"Edit":"Add"}</button></div>
            </div>
      </div>
  );
};

