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

/////////////////////////////////////// Get all clients ////////////////////////////////////////////////

UserController.getAllClients = async () => {
  try {
    let response = await UserService.getAllClients();

    if (response.error) {
      return { error: response.error };
    }
    else {
      return { data: response.data };
    }

  } catch (e) {
    return { error: e };
  }
};

/////////////////////////////////////// Update client details ////////////////////////////////////////////////
UserController.updateClient = async (id, inputData) => {
  try {
    let response = await UserService.updateClient(id, inputData);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Client Updated Successfully" };
  } catch (e) {
    return { error: e };
  }
};

/////////////////////////////////////// Delete client details ////////////////////////////////////////////////
UserController.deleteClient = async (id) => {
  try {
    let response = await UserService.deleteClient(id);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Client Deleted Successfully" };
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

/////////////////////////////////////// Get order details by order ID ///////////////////////////////////////////////

UserController.getOrderDetailsByOrderId = async (orderId) => {

  try {
    let response = await UserService.getOrderDetailsByOrderId(orderId);
    if (response.error) {
      return { error: response.error };
    } else {
      return response;
    }
  } catch (e) {
    return { error: e };
  }
}


/////////////////////////////////////// Get order view details by order ID ///////////////////////////////////////////////

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


/////////////////////////////////////// Update order details ////////////////////////////////////////////////

UserController.updateOrder = async (
  orderId,
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
    let response = await UserService.updateOrder(orderId, reqBody);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Order Updated Successfully" };
  } catch (e) {
    return { error: e };
  }
};

/////////////////////////////////////// Get Incoming Orders by branch ID ////////////////////////////////////////////////

UserController.getAllIncomingOrdersByBranchId = async (branchId) => {
  try {
    let response = await UserService.getAllIncomingOrdersByBranchId(branchId)

    if (response.error) {
      return { error: response.error };
    } else {
      return response;
    }
  } catch (e) {
    return { error: e };
  }
}

/////////////////////////////////////// Update Order Status ////////////////////////////////////////////////

UserController.updateOrderStatus = async (orderId, status) => {

  let statusId = 0;

  if (status === "Received") {
    statusId = 3;
  } else if (status === "Registered") {
    statusId = 1;
  }

  try {
    let response = await UserService.updateOrderStatus(orderId, statusId);
    if (response.error) {
      return { error: response.error };
    }
    return { response: response };
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

/////////////////////////////////////// Delete Order By Order Id ////////////////////////////////////////////////

UserController.deleteOrder = async (orderId) => {
  try {
    let response = await UserService.deleteOrder(orderId);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Order Deleted Successfully" };
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


/////////////////////////////////////// Get all tickets by branch ID ////////////////////////////////////////////////

UserController.getAllTicketsByBranchId = async (branchId) => {
  try {
    let response = await UserService.getAllTicketsByBranchId(branchId)

    if (response.error) {
      return { error: response.error };
    } else {
      return response;
    }
  } catch (e) {
    return { error: e };
  }
}


/////////////////////////////////////// Update ticket reply ////////////////////////////////////////////////

UserController.updateTicketReply = async (ticketId, responseMessage) => {

  let reqBody = {
    responseMessage
  };

  try {
    let response = await UserService.updateTicketReply(ticketId, reqBody);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Ticket Reply Updated Successfully" };
  }
  catch (e) {
    return { error: e };
  }
};

/////////////////////////////////////// Close ticket ////////////////////////////////////////////////

UserController.ticketStatusUpdate = async (ticketId, statusId) => {

  try {
    let response = await UserService.ticketStatusUpdate(ticketId, statusId);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Ticket Status Updated Successfully" };
  }
  catch (e) {
    return { error: e };
  }
};

//////////////////////////////////////// Delete ticket ////////////////////////////////////////////////

UserController.deleteTicket = async (ticketId) => {

  try {
    let response = await UserService.deleteTicket(ticketId);
    if (response.error) {
      return { error: response.error };
    }
    return { message: "Ticket Deleted Successfully" };
  }
  catch (e) {
    return { error: e };
  }
};


/////////////////////////////////////// Add a feedback ////////////////////////////////////////////////

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

/////////////////////////////////////// Get all feedbacks ////////////////////////////////////////////////

UserController.getAllFeedbacks = async () => {
  try {
    let response = await UserService.getAllFeedbacks();

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



export default UserController;
