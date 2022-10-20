import http from "../http-common.js";

export default class {
    static getAllResturants(query=""){
        return http.get("/resturants" + query);
    }

    static getAllCuisines(){
        return http.get("/resturants/cuisines");
    }

    static getOneResturant(id){
        return http.get("/resturants/id/" + id);
    }

}