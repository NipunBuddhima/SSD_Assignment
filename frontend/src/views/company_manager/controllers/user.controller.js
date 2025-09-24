import UserService from "../services/user.service.js";
import validator from "../../../validation/validation.js";

let UserController = {};


/////////////////////////////////////// Add a new client ////////////////////////////////////////////////

UserController.addClient = async (
  nic,
  email,
  name,
  address,
  contactNumber,
  branchId
) => {


  let reqBody = {
    nic,
    email,
    name,
    address,
    contactNumber,
    branchId,
  };

  try {
    let response = await UserService.addClient(reqBody);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Client Added Successfully" };
  } catch (e) {
    return { error: e };
  }
};

/////////////////////////////////////// Add a new order ////////////////////////////////////////////////

UserController.addOrder = async (
  weight,
  sendingDate,
  paymentDate,
  packageTypes,
  sendingBranch,
  receivingBranch,
  specialNotes,
  orderStatus,
  sender,
  receiver,
  contactNumber,
  address
) => {

  let reqBody = {
    weight,
    sendingDate,
    paymentDate,
    packageTypes,
    sendingBranch,
    receivingBranch,
    specialNotes,
    orderStatus,
    sender,
    receiver,
    contactNumber,
    address,
  };

  try {
    let response = await UserService.addOrder(reqBody);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Success Message" };
  } catch (e) {
    console.error(e);
    return { error: "Error" };
  }
};

/////////////////////////////////////// Get Branch ID by Branch Manager NIC ////////////////////////////////////////////////

UserController.getBranchIdByBranchManagerNIC = async (nic) => {
  try {
    let data = await UserService.getBranchIdByBranchManagerNIC({
      nic: nic,
    });
    if (data.error) {
      return { error: data.error };
    } else {
      console.log(data);
      return { branchId: data.branchID };
    }
  } catch (e) {
    return { error: e };
  }
};


/////////////////////////////////////// Get All Branches ////////////////////////////////////////////////

UserController.getAllBranches = async () => {
  try {
    let response = await UserService.getAllBranches();

    if (response.error) {
      return { error: response.error };
    }

    else {
      return response;
    }
  } catch (e) {
    return { error: e };
  }
}

/////////////////////////////////////// Get All Package Types ////////////////////////////////////////////////

UserController.getAllPackageTypes = async () => {
  try {
    let response = await UserService.getAllPackageTypes();

    if (response.error) {
      return { error: response.error };
    }

    else {
      return { data: response.data };
    }
  } catch (e) {
    return { error: e };
  }
}

/////////////////////////////////////// Get All Package Types ////////////////////////////////////////////////

UserController.getAllOrderStatus = async () => {
  try {
    let response = await UserService.getAllOrderStatus();

    if (response.error) {
      return { error: response.error };
    }
    else {
      return { data: response.data };
    }
  } catch (e) {
    return { error: e };
  }
}

/////////////////////////////////////// Add a branch ////////////////////////////////////////////////

UserController.addBranch = async (district, address, mapLocation, contactNumber) => {

  let reqBody = {
    district,
    address,
    mapLocation,
    contactNumber
  };

  try {
    let response = await UserService.addBranch(reqBody);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Branch Added Successfully" };
  } catch (e) {
    return { error: e };
  }
};

/////////////////////////////////////// Get all routes ////////////////////////////////////////////////

UserController.getAllRoutes = async () => {
  try {
    let response = await UserService.getAllRoutes();

    if (response.error) {
      return { error: response.error };
    }
    else {
      return response;
    }
  } catch (e) {
    return { error: e };
  }
}

/////////////////////////////////////// Add Transport Agent ////////////////////////////////////////////////

UserController.addTransportAgent = async (nic, email, name, vehicleNumber, routeId) => {

  let reqBody = {
    nic,
    email,
    name,
    vehicleNumber,
    routeId,
  };

  try {
    let response = await UserService.addTransportAgent(reqBody);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Transport Agent Added Successfully" };
  } catch (e) {
    return { error: e };
  }
};


/////////////////////////////////////// Get all TransportAgent ////////////////////////////////////////////////

UserController.getAllTransportAgents = async () => {
  try{
   let response = await UserService.getAllTransportAgents();

   if (response.error) {
     return { error: response.error };
   }
   else {
     return response;
   }
   
  } catch(e){
   return { error: e};
  }
};

/////////////////////////////////////// Add a delivery person ////////////////////////////////////////////////

UserController.addDeliveryPerson = async (nic, email, fullName, address, contactNumber, vehicleNumber, branchId) => {

  let reqBody = {
    nic,
    email,
    fullName,
    address,
    contactNumber,
    vehicleNumber,
    branchId
  };

  try {
    let response = await UserService.addDeliveryPerson(reqBody);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Delivery Person Added Successfully" };
  } catch (e) {
    return { error: e };
  }
};


/////////////////////////////////////// Get all orders by order ID ////////////////////////////////////////////////

UserController.getLatestOrdersByClientNic = async (nic) => {
  try {
    let response = await UserService.getLatestOrdersByClientNic({ nic: nic })

    if (response.error) {
      return { error: response.error };
    } else {
      return {data: response.data};
    }
  } catch (e) {
    return { error: e };
  }
};

// update branch
UserController.updateBranch = async (inputData) => {

  let branchId = inputData.branchId;
  
  let reqBody = {
    district: inputData.district,
    address: inputData.address,
    mapLocation: inputData.mapLocation,
    contactNumber: inputData.contactNumber,
  };

  try {
    let response = await UserService.updateBranch(branchId, reqBody);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Branch Updated Successfully" };
  } catch (e) {
    return { error: e };
  }
};

// delete branch

UserController.deleteBranch = async (branchId) => {
  try {
    let response = await UserService.deleteBranch(branchId);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Branch Deleted Successfully" };
  } catch (e) {
    return { error: e };
  }
}

// update transport agent
UserController.updateTransportAgent = async (inputData) => {
  
  let reqBody = {
    nic: inputData.nic,
    email: inputData.email,
    fullName: inputData.fullName,
    vehicleNumber: inputData.vehicleNumber,
    routeId: inputData.routeId,
  };

  try {
    let response = await UserService.updateTransportAgent(reqBody);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Transport Agent Updated Successfully" };
  } catch (e) {
    return { error: e };
  }
};

// delete transport agent

UserController.deleteTransportAgent = async (nic) => {
  try {
    let response = await UserService.deleteTransportAgent(nic);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Transport Agent Deleted Successfully" };
  } catch (e) {
    return { error: e };
  }
}

/////////////////////////////////////// Add a route ////////////////////////////////////////////////

UserController.addRoute = async (routeName, fBranchId, sBranchId) => {

  let reqBody = {
    routeName,
    fBranchId,
    sBranchId
  };

  try {
    let response = await UserService.addRoute(reqBody);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Route Added Successfully" };
  } catch (e) {
    return { error: e };
  }
};

// get all routes for table
UserController.getAllRoutesForTable = async () => {
  try {
    let response = await UserService.getAllRoutesForTable();

    if (response.error) {
      return { error: response.error };
    }
    else {
      return response;
    }
  } catch (e) {
    return { error: e };
  }
}

// update route

UserController.updateRoute = async (inputData) => {
    
    let reqBody = {
      routeId: inputData.routeId,
      routeName: inputData.routeName,
      firstBranchId: inputData.firstBranchId,
      secondBranchId: inputData.secondBranchId,
    };
  
    try {
      let response = await UserService.updateRoute(reqBody);
      if (response.error) {
        return { error: response.error };
      }
      return { message: "Route Updated Successfully" };
    } catch (e) {
      return { error: e };
    }
  }

// delete route

UserController.deleteRoute = async (routeId) => {

  try {
    let response = await UserService.deleteRoute(routeId);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Route Deleted Successfully" };
  } catch (e) {
    return { error: e };
  }
}
export default UserController;
