import http from "../http-common.js";

export default class {
    static deleteView(id,userId){
        return http.delete("/reviews?reviewId=" + id,{data:{userId}});
    }

    static addReview(doc){
        return http.post("/reviews", doc);
    }

    static editReview(doc){
        return http.put("/reviews",doc);
    }
}

   
