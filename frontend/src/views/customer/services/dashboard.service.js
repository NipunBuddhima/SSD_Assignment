import AxiosController from "../../../controllers/axios.controller";

let DashboardService = {}; 

// Get totol order count belong to a branch
DashboardService.getTotalOrderCountOfBranch = async(reqBody) => {
    try{
        let response = await AxiosController.instance.get("/api/getTotalOrderCountOfBranch");
        if(response.data.error){
            // Handle error
        }
        else {
            if(response.status === 200)
            {
                return response.data;
            }
            //Different status codes
            //201 if(){return {message : "Success Message"}}
            //400 if(){return {error : "Nad Request"}}
            //401 if
            //422 if
        }
    } catch(e) {
        console.error(e);
        throw e;
    }
}

// Add new order
DashboardService.getTotalReceivedOrderCountOfBranch = async(reqBody) => {
    try{
        let response = await AxiosController.instance.get("/api/getTotalReceivedOrderCountOfBranch");
        if(response.data.error){
            // Handle error
        }
        else {
            //Different status codes
            //201 if(){return {message : "Success Message"}}
            //400 if(){return {error : "Nad Request"}}
            //401 if
            //422 if
        }
    } catch(e) {
        console.error(e);
        throw e;
    }
}

// Add total opened ticket count
DashboardService.getTotalOpenedTicketCountOfBranch = async(reqBody) => {
    try{
        let response = await AxiosController.instance.get("/api/getTotalReceivedOrderCountOfBranch");
        if(response.data.error){
            // Handle error
        }
        else {
            //Different status codes
            //201 if(){return {message : "Success Message"}}
            //400 if(){return {error : "Nad Request"}}
            //401 if
            //422 if
        }
    } catch(e) {
        console.error(e);
        throw e;
    }
}

// Get total feedback count of branch
DashboardService.getTotalFeedbackCountOfBranch = async(reqBody) => {
    try{
        let response = await AxiosController.instance.get("/api/getTotalFeedbackCountOfBranch");
        if(response.data.error){
            // Handle error
        }
        else {
            //Different status codes
            //201 if(){return {message : "Success Message"}}
            //400 if(){return {error : "Nad Request"}}
            //401 if
            //422 if
        }
    } catch(e) {
        console.error(e);
        throw e;
    }
}

export default DashboardService;