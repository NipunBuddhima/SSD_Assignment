import AxiosController from "../../../controllers/axios.controller.js";

let UserService = {};

/////////////////////////////////////// Get Latest orders by client nic ////////////////////////////////////////////////


UserService.getLatestOrdersByClientNic = async (reqBody) => {
  try {
    let response = await AxiosController.instance.get("/api/get-latest-orders-by-client-nic", reqBody);
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return {data: response.data};
    }
  } catch (e) {
    console.error(e);
    throw e;
  }


};



/////////////////////////////////////// Get all package typess ////////////////////////////////////////////////

UserService.getAllPackageTypes = async () => {
  try {
    let response = await AxiosController.instance.get("/api/packagetypes");
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return { data: response.data };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/////////////////////////////////////// Get all order status ////////////////////////////////////////////////

UserService.getAllOrderStatus = async () => {
  try {
    let response = await AxiosController.instance.get("/api/orderstatus");
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return { data: response.data };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/////////////////////////////////////// Add a branch ////////////////////////////////////////////////
UserService.addBranch = async (reqBody) => {
  try {
    let response = await AxiosController.instance.post("/api/add-branch", reqBody); // Call backend contorller and pass data which received to front end controller
    
    if (response.data.error) {
      return { error: response.data.error };
    } else {
      //Different status codes
      //201
      if (response.status === 201) {
        return { message: "Branch Added Successfully" };
      }
      //400
      if (response.status === 400) {
        return { error: "Bad Request" };
      }
      //401
      if (response.status === 401) {
        return { error: "Unauthorized" };
      }
      //422
      if (response.status === 422) {
        return { error: "Client Already Exists" };
      }
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/////////////////////////////////////// Get all routes ////////////////////////////////////////////////

UserService.getAllRoutes = async () => {
  try {
    let response = await AxiosController.instance.get("/api/routes");
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/////////////////////////////////////// Add a transport agent ////////////////////////////////////////////////


UserService.addTransportAgent = async (reqBody) => {
  try {
    let response = await AxiosController.instance.post(
      "/api/add-transport-agent",
      reqBody
    ); // Call backend contorller and pass data which received to front end controller
    if (response.data.error) {
      return { error: response.data.error };
    } else {
      //Different status codes
      //201
      if (response.status === 201) {
        return { message: "Transport Agent Added Successfully" };
      }
      //400
      if (response.status === 400) {
        return { error: "Bad Request" };
      }
      //401
      if (response.status === 401) {
        return { error: "Unauthorized" };
      }
      //422
      if (response.status === 422) {
        return { error: "Transport Agent Already Exists" };
      }
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};


/////////////////////////////////////// Get all TransportAgent ////////////////////////////////////////////////
UserService.getAllTransportAgents = async()=>{
  try{
    let response = await AxiosController.instance.get("/api/transport-agent");

    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return response.data;
    }

  }catch(e){
    console.error(e);
    throw e;
  }

};

/////////////////////////////////////// Add a delivery person ////////////////////////////////////////////////

UserService.addDeliveryPerson = async (reqBody) => {
  try {
    let response = await AxiosController.instance.post(
      "/api/add-delivery-person",
      reqBody
    ); // Call backend contorller and pass data which received to front end controller
    if (response.data.error) {
      return { error: response.data.error };
    } else {
      //Different status codes
      //201
      if (response.status === 201) {
        return { message: "Delivery Person Added Successfully" };
      }
      //400
      if (response.status === 400) {
        return { error: "Bad Request" };
      }
      //401
      if (response.status === 401) {
        return { error: "Unauthorized" };
      }
      //422
      if (response.status === 422) {
        return { error: "Transport Agent Already Exists" };
      }
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

UserService.getDeliveryPersonById = async (id) => {
  try {
    let response = await AxiosController.instance.get(`/api/delivery-person/${id}`);
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return { data: response.data };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

UserService.getAllDeliveryPersons = async () => {
  try {
    let response = await AxiosController.instance.get("/api/get-all-delivery-persons");
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return { data: response.data };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};


UserService.updateDeliveryPerson = async (id, reqBody) => {
  try {
    let response = await AxiosController.instance.put(`/api/update-delivery-person/${id}`, reqBody);
    if (response.data.error) {
      return { error: response.data.error };
    } else {
      // Check for different status codes if needed
      return { message: "Delivery Person Updated Successfully" };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

UserService.deleteDeliveryPerson = async (id) => {
  try {
    let response = await AxiosController.instance.delete(`/api/delete-delivery-person/${id}`);
    if (response.data.error) {
      return { error: response.data.error };
    } else {
      // Check for different status codes if needed
      return { message: "Delivery Person Deleted Successfully" };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};


/////////////////////////////////////// Get all orders by branch id ////////////////////////////////////////////////


UserService.getAllOrdersByBranchId = async (reqBody) => {
  try {
    let response = await AxiosController.instance.post("/api/orders-by-branch", reqBody);
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

/////////////////////////////////////// Add a route ////////////////////////////////////////////////
UserService.addRoute = async (reqBody) => {
  try {
    let response = await AxiosController.instance.post(
      "/api/add-route",
      reqBody
    ); // Call backend contorller and pass data which received to front end controller
    if (response.data.error) {
      return { error: response.data.error };
    } else {
      //Different status codes
      //201
      if (response.status === 201) {
        return { message: "Route Added Successfully" };
      }
      //400
      if (response.status === 400) {
        return { error: "Bad Request" };
      }
      //401
      if (response.status === 401) {
        return { error: "Unauthorized" };
      }
      //422
      if (response.status === 422) {
        return { error: "Route Already Exists" };
      }
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/////////////////////////////////////// Get all ticket reasons ////////////////////////////////////////////////

UserService.getAllReasons = async () => {
  try {
    let response = await AxiosController.instance.get("/api/reasons");
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return { data: response.data };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/////////////////////////////////////// Add a ticket ////////////////////////////////////////////////

UserService.addTicket = async (reqBody) => {
  try {
    let response = await AxiosController.instance.post(
      "/api/add-ticket",
      reqBody
    ); // Call backend contorller and pass data which received to front end controller
    if (response.data.error) {
      return { error: response.data.error };
    } else {
      //Different status codes
      //201
      if (response.status === 201) {
        return { message: "Ticket Added Successfully" };
      }
      //400
      if (response.status === 400) {
        return { error: "Bad Request" };
      }
      //401
      if (response.status === 401) {
        return { error: "Unauthorized" };
      }
      //422
      if (response.status === 422) {
        return { error: "Ticket Already Exists" };
      }
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/////////////////////////////////////// Add a feedback ////////////////////////////////////////////////

UserService.addFeedback = async (reqBody) => {
  try {
    let response = await AxiosController.instance.post(
      "/api/add-feedback",
      reqBody
    ); // Call backend contorller and pass data which received to front end controller
    if (response.data.error) {
      return { error: response.data.error };
    } else {
      //Different status codes
      //201
      if (response.status === 201) {
        return { message: "Feedback Added Successfully" };
      }
      //400
      if (response.status === 400) {
        return { error: "Bad Request" };
      }
      //401
      if (response.status === 401) {
        return { error: "Unauthorized" };
      }
      //422
      if (response.status === 422) {
        return { error: "Feedback Already Exists" };
      }
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

UserService.getAllClientNICs = async () => {
  try {
    let response = await AxiosController.instance.get("/api/clients/nic");
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return { data: response.data };
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

UserService.getCourierFee = async (reqBody) => {
  try{
      let response = await AxiosController.instance.post("/api/courier-fee", reqBody);
      if(response.data.error)
      {
        return {error : response.data.error};
      }
      else
      {
        return {fee : response.data.fee};
      }
  }
  catch(e){
    console.error(e);
    throw e;
  }

}

// get alll branches
UserService.getAllBranches = async () => {
  try {
    let response = await AxiosController.instance.get("/api/branches");
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// update branch

UserService.updateBranch = async (branchId, reqBody) => {
  try {
    let response = await AxiosController.instance.put(`/api/update-branch/${branchId}`, reqBody);
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// delete branch

UserService.deleteBranch = async (branchId) => {
  try {
    let response = await AxiosController.instance.delete(`/api/delete-branch/${branchId}`);
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// update transport agent

UserService.updateTransportAgent = async (reqBody) => {
  try {
    let response = await AxiosController.instance.put(`/api/update-transport-agent`, reqBody);
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// delete transport agent

UserService.deleteTransportAgent = async (nic) => {
  try {
    let response = await AxiosController.instance.delete(`/api/delete-transport-agent/${nic}`);
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// get all routes for table

UserService.getAllRoutesForTable = async () => {
  try {
    let response = await AxiosController.instance.get("/api/routes-for-table");
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// update route

UserService.updateRoute = async (reqBody) => {
  try {
    let response = await AxiosController.instance.put(`/api/update-route`, reqBody);
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// delete route

UserService.deleteRoute = async (routeId) => {
  try {
    let response = await AxiosController.instance.delete(`/api/delete-route/${routeId}`);
    if (response.error) {
      return { error: response.error };
    } else if (response.data.error) {
      return { error: response.data.error };
    } else {
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default UserService;
