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

// /////////////////////////////////////// Get order view details by order ID ///////////////////////////////////////////////

UserController.getOrderViewDetailsByOrderId = async (orderId) => {

  try {
    let response = await UserService.getOrderViewDetailsByOrderId(orderId);
    if (response.error) {
      return { error: response.error };
    } else {
      return response.data;
    }
  } catch (e) {
    return { error: e };
  }
}

/////////////////////////////////////// Check Order Existing Status By Order Id ////////////////////////////////////////////////

UserController.checkOrderExistingStatus = async (orderId) => {
  try {
    let response = await UserService.checkOrderExistingStatus(orderId);

    if (response.error) {
      return { error: response.error };
    } else {
      return response;
    }
  } catch (e) {
    return { error: e };
  }
}


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
      return { data: response.data };
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

/////////////////////////////////////// Get All Order By User Nic ////////////////////////////////////////////////

UserController.getAllAvailableOrdersByUserNic = async (nic) => {
  try {
    let response = await UserService.getAllAvailableOrdersByUserNic(nic);

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

/////////////////////////////////////// Get All Branches ////////////////////////////////////////////////

UserController.getAllBranches = async () => {
  try {
    let response = await UserService.getAllBranches();

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

/////////////////////////////////////// Get all routes ////////////////////////////////////////////////

UserController.getAllRoutes = async () => {
  try {
    let response = await UserService.getAllRoutes();

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

UserController.getAllOrdersByBranchId = async (branchId) => {
  try {
    let response = await UserService.getAllOrdersByBranchId({ branchId: branchId })

    if (response.error) {
      return { error: response.error };
    } else {
      return response;
    }
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

/////////////////////////////////////// Get all ticket reasons ////////////////////////////////////////////////

UserController.getAllReasons = async () => {
  try {
    let response = await UserService.getAllReasons();

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

/////////////////////////////////////// Add a ticket ////////////////////////////////////////////////

UserController.addTicket = async (
  nic,
  branchId,
  reasonId,
  message,
  responseStatusId) => {

  let reqBody = {
    nic,
    branchId,
    reasonId,
    message,
    responseStatusId
  };

  try {
    let response = await UserService.addTicket(reqBody);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Ticket Added Successfully" };
  } catch (e) {
    return { error: e };
  }
};

/////////////////////////////////////// Update ticket reply ////////////////////////////////////////////////

UserController.updateTicketReply = async (ticketId, replyMessage) => {
  let reqBody = {
    ticketId,
    replyMessage
  };

  try {
    let response = await UserService.updateTicketReply(reqBody);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Ticket Reply Updated Successfully" };
  } catch (e) {
    return { error: e };
  }
};


/////////////////////////////////////// Update ticket status ////////////////////////////////////////////////

UserController.ticketStatusUpdate = async (ticketId, statusId) => {
  try {
    let response = await UserService.ticketStatusUpdate(ticketId, statusId);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Ticket Status Updated Successfully" };
  } catch (e) {
    return { error: e };
  }
}

/////////////////////////////////////// Delete ticket ////////////////////////////////////////////////

UserController.deleteTicket = async (ticketId) => {
  try {
    let response = await UserService.deleteTicket(ticketId);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Ticket Deleted Successfully" };
  } catch (e) {
    return { error: e };
  }
}

/////////////////////////////////////// Get all tickets by branch ID //////////////////////////////////////////////// 

UserController.getAllTicketsByUserNic = async (userNic) => {
  try {
    let response = await UserService.getAllTicketsByUserNic(userNic);
    if (response.error) {
      return { error: response.error };
    } else {
      return response;
    }
  } catch (e) {
    return { error: e };
  }
}

/////////////////////////////////////// Get all ticket reasons ////////////////////////////////////////////////

UserController.getAllReasons = async () => {
  try {
    let response = await UserService.getAllReasons();

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

/////////////////////////////////////// Add a ticket ////////////////////////////////////////////////

UserController.addFeedback = async (
  nic,
  rating,
  message
) => {

  let reqBody = {
    nic,
    rating,
    message
  };

  try {
    let response = await UserService.addFeedback(reqBody);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Feedback Added Successfully" };
  } catch (e) {
    return { error: e };
  }
};


UserController.getAllClientNICs = async () => {
  try {
    let response = await UserService.getAllClientNICs();

    if (response.error) {
      return { error: response.error };
    } else {
      let modifiedData = response.data.map((nic) => {
        return { value: nic, label: nic };
      });
      return { data: modifiedData };
    }
  } catch (e) {
    return { error: e };
  }
};

UserController.getCourierFee = async (
  packageWeight,
  packageTypeId
) => {
  try {
    let response = await UserService.getCourierFee({
      packageWeight,
      packageTypeId,
    });
    if (response.error) {
      return { error: response.error };
    } else {
      return response;
    }
  } catch (e) {
    return { error: e };
  }
};

// /////////////////////////////////////// Get all feedbacks by user NIC ///////////////////////////////////////////////

UserController.getAllFeedbacksByUserNic = async (nic) => {
  try {
    let response = await UserService.getAllFeedbacksByUserNic(nic);
    if (response.error) {
      return { error: response.error };
    } else {
      return response;
    }
  } catch (e) {
    return { error: e };
  }
}

// /////////////////////////////////////// Update feedback ///////////////////////////////////////////////

UserController.updateFeedback = async (feedbackId, inputData) => {
  try {
    let response = await UserService.updateFeedback(feedbackId, inputData);
    if (response.error) {
      return { error: response.error };
    } else {
      return response;
    }
  } catch (e) {
    return { error: e };
  }
}

// /////////////////////////////////////// Delete feedback ///////////////////////////////////////////////

UserController.deleteFeedback = async (feedbackId) => {
  try {
    let response = await UserService.deleteFeedback(feedbackId);
    if (response.error) {
      return { error: response.error };
    } else {
      return response;
    }
  } catch (e) {
    return { error: e };
  }
}

// update client details

UserController.updateClientDetails = async (userNic, inputData) => {

  try {
    let response = await UserService.updateClientDetails(userNic, inputData);
    if (response.error) {
      return { error: response.error };
    } else {
      return response;
    }
  } catch (e) {
    return { error: e };
  }
}

// get client details by user NIC

UserController.getClientDetailsByUserNic = async (nic) => {
  try {
    let response = await UserService.getClientDetailsByUserNic(nic);
    if (response.error) {
      return { error: response.error };
    } else {
      return response;
    }
  } catch (e) {
    return { error: e };
  }
}

// update client password

UserController.updateClientPassword = async (userNic, password) => {
  
    try {
      let response = await UserService.updateClientPassword(userNic, password);
      if (response.error) {
        return { error: response.error };
      } else {
        return response;
      }
    } catch (e) {
      return { error: e };
    }
  }

export default UserController;
