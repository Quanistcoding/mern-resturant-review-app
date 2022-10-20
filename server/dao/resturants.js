import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let collections;

export default class{
    static async injectConnection(conn){
        if(collections){
            return collections;
        }
        try {
            collections = await conn.db("sample_restaurants").collection("restaurants");
        } catch (error) {
            console.error("Unable to establish collection handler " + error)
        }
        
    }

    static async findAll(filterQuery){
       const filter = {};
    if("zipcode" in filterQuery){
        filter["address.zipcode"] = filterQuery.zipcode;
    }
    if("name" in filterQuery){
        filter["name"] = {$regex:filterQuery.name};
    }

    if("cuisine" in filterQuery){
        filter["cuisine"] = filterQuery.cuisine;
    }
    

       const result = await collections.find(filter).skip(0).limit(100).toArray();
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

     static async findByIdWithReviews(resturantId){
            try {
            const data = await collections.aggregate([
                    {
                        $match:{
                            _id:ObjectId(resturantId)
                            }
                    },
                    {
                        $lookup:{
                            from:"reviews",
                            localField:"_id",
                            foreignField:"resturant_id",
                            as:"reviews"
                        }
                    }
                ]
            ).toArray();

            return data;
            } catch (error) {}
                return console.error(error);
        }

        static async findAllCuisines(){
            try {
                const result = await collections.distinct("cuisine");
                return result;
            } catch (error) {
                return console.error(error);
            }
        }
}
