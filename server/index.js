import express from "express";
import mongodb from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import resturants from "./routes/resturants.js";
import resturantsDAO from "./dao/resturants.js";
import reviews from "./routes/reviews.js";
import reviewsDAO from "./dao/reviews.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/resturants",resturants);
app.use("/api/reviews",reviews);

//page not found middleware
app.use((req,res)=>{
    res.send("404");
})



const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 5000;

//Setup database connection and start server
MongoClient.connect(process.env.RESTURANTREVIEW_MONGO_URI,{
    
},(err,client)=>{
    if(err) return console.error(err.stack);
    resturantsDAO.injectConnection(client);
    reviewsDAO.injectConnection(client);
    app.listen(port, () => {console.log("Server listeening on port " + port)});
});