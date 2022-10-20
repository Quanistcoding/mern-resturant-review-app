import dao from "../dao/reviews.js";

export default class{
    static async findAll(req,res){
       const data = await dao.findAll();
       res.send(data);
    }

    static async findOneById(req,res){
        const data = await dao.findById(req.params.id);
        res.status(200).send(data);
     }

     static async createOne(req,res){
        try {
            //Create data for new review document
            const resturantId = req.body.resturantId;
            const review = req.body.review;
            const userInfo = {
                name:req.body.username,
                _id:req.body.userId
            }
            const date = new Date();

            //Execute adding review to db
            const dbResponse = await dao.createOne(
                resturantId,
                userInfo,
                review,
                date
            )
            res.json({status:"success"});
        } catch (error) {
            res.status(500).json({error:error.message})
        }
     }

     static async updateOne(req,res){
            try {
                const reviewId = req.body.reviewId;
                const userId = req.body.userId;
                const review = req.body.review;
                const date = new Date();

                const dbResponse = await dao.updateOne(
                    reviewId,
                    userId,
                    review,
                    date
                )
                res.status(200).json({status:"success"});

            } catch (error) {
                return console.error(error);
            }
     }

     static async deleteOne(req,res){
        try {
            const reviewId = req.query.reviewId;
            const userId = req.body.userId;
            await dao.deleteOne(
                reviewId,
                userId
            )
            res.status(200).json({status:"success"});
        } catch (error) {
            res.status(500).json({status:"failed"});
            return console.error(error);           
        }
     }
}