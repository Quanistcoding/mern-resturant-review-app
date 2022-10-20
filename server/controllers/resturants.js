import dao from "../dao/resturants.js";

export default class{
    static async findAll(req,res){
        const filter = {};
        if(req.query.name && /\S/.test(req.query.name)){
            filter.name = req.query.name
        }

        if(req.query.zipcode && /\S/.test(req.query.zipcode)){
            filter.zipcode = req.query.zipcode
        }
        if(req.query.cuisine && /\S/.test(req.query.cuisine) && req.query.cuisine !== "All Cuisines"){
             filter.cuisine = req.query.cuisine
        }
       const data = await dao.findAll(filter);
       res.send(data);
    }

    static async findOneById(req,res){
        try {
            const data = await dao.findById(req.params.id || {});
            if(!data){
                res.status(404).send("Not found");
            }
            res.send(data);           
        } catch (error) {
            return res.status(500).send(error);
        }
     }
     
     static async findResturantWithReviews(req,res){
        try {
            const resturantWithReviews = await dao.findByIdWithReviews(req.params.id || {});
            if(!resturantWithReviews){
                return res.status(404).send("Not found");
            }

            res.status(200).send(resturantWithReviews);           
        } catch (error) {
              return res.status(500).send(error);
        }       
     }

     static async findAllCuisines(req,res){
        try {
            let result = await dao.findAllCuisines();
            res.status(200).json(result);
        } catch (error) {
            return res.status(500).send(error);
        }
     }
}