import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let collections;

export default class{
    static async injectConnection(conn){
        if(collections){
            return collections;
        }
        try {
            collections = await conn.db("sample_restaurants").collection("reviews");
        } catch (error) {
            console.error("Unable to establish collection handler " + error)
        }
        
    }

    static async findAll(query={}){
       const result = await collections.find(query).toArray();
       return result; 
    }

    static async findById(id){
        try {
            const result = await collections.findOne({ _id: ObjectId(id) } );
            return result; 
        } catch (error) {
            console.error(error.stack);
        }
     }

     static async createOne(resturantId,user,review,date){
        try {
            const doc = {
                user_id: user._id,
                name:user.name,
                review:review,
                date,
                resturant_id:ObjectId(resturantId)
            }
             const dbResponse = await collections.insertOne(doc);
        } catch (error) {
            console.error("unable to creat review.");
            return {error};
        }
      
     }

     static async updateOne(reviewId,userId,review,date){
        try {
            const findDoc = {
                _id:ObjectId(reviewId),
                user_id:userId
            };
            const dataToUpdate = {
                review,
                date
            }
             const dbResponse = await collections.updateOne(findDoc,{$set:dataToUpdate});
        } catch (error) {
            console.error("unable to updage review." + error.message);
            return {error};
        }
      
     }

     static async deleteOne(reviewId,userId){
        try {
            const findDoc = {
                _id:ObjectId(reviewId),
                user_id:userId
            }
            const dbResponse = await collections.deleteOne(findDoc);
        } catch (error) {
            console.error("unable to delete review." + error.message);
            return {error};
        }
     }
}
