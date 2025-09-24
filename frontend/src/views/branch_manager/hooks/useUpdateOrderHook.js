import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BranchManagerRoutes } from "../../../routes/all_user.routes.js";
import useCookie from "../../../hooks/useCookies.js";
import validator from "../../../validation/validation.js";
import BranchManagerController from "../controllers/user.controller.js";

//Hook to hold ui functionality of add order
function useUpdateOrderHook() {

  // catch orderId which are passed through /edit-order/:orderId
  const orderId = useParams().orderId;

  // Get order details which are related to orderId
  const [orderDetails, setOrderDetails] = useState({});

  // Create object for use navigator
  const navigate = useNavigate();

  //state variables to hold all clients and selected client nic
  let [clientNICs, setClientNICs] = useState([]);
  let [selectedSenderNIC, setSelectedSenderNIC] = useState("");

  // Create an object to use cookies
  let [getCookie, setCookie] = useCookie();

  // Dropdown state variables
  let [branches, setBranches] = useState([]);
  let [packageTypes, setPackageTypes] = useState([]);
  let [orderStatus, setOrderStatus] = useState([]);

  // Alert
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const hideSuccessDialog = () => {
    setShowSuccessDialog(false);
    navigate(BranchManagerRoutes.viewOrders);
  };

  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const hideErrorDialog = () => setShowErrorDialog(false);

  //state variable to hold courier fee
  let [courierFee, setCourierFee] = useState(0.0);


  // Map variable
  const [userInput, setInputData] = useState({
    weight: "",
    sendingDate: "",
    paymentDate: "",
    packageTypes: 1,
    sendingBranch: "",
    receivingBranch: "",
    specialNotes: "",
    orderStatus: 1,
    sender: "",
    receiver: "",
    contactNumber: "",
    address: "",
  });

  // Validation regex
  let {
    validateNIC,
    validateEmail,
    validateName,
    validateAddress,
    validatePhoneNumber,
  } = validator();

  const [validations, setValidations] = useState({
    weight: false,
    receiver: false,
    contactNumber: false,
  });

  // onChange Form validation
  const validateField = (name, value) => {
    switch (name) {
      case "weight":
        return value > 0 && value < 9999999;
      case "receiver":
        return validateName(value);
      case "contactNumber":
        return validatePhoneNumber(value);
      default:
        return true;
    }
  };

  const isFormValid = () => {
    for (const key in validations) {
      if (validations[key]) {
        return false;
      }
    }
    return true;
  };

  // onChange
  const onChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputData((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
    // onChange Form validation data set on change
    setValidations({
      ...validations,
      [name]: !validateField(name, value), // Not sign for conver false to true
    });
  };

  // code which handles the sender nic change
  const handleSenderChange = (e) => {
    setSelectedSenderNIC(e);
    setInputData((prevOptions) => {
      return {
        ...prevOptions,
        sender: e.value,
      };
    });
  };

  // Fetch dropdown data [RUN ONE TIME WHEN PAGE LOADING]
  useEffect(() => {
    //Fetch order details related to orderId
    async function fetchOrderDetails() {
      let response = await BranchManagerController.getOrderDetails(orderId);
      if (response.error) {
        alert(response.error);
      } else {
        setOrderDetails(response.data);
      }
    }

    //Fetch branches to fill dropdown
    async function fetchAllBranches() {
      let response = await BranchManagerController.getAllBranches();
      if (response.error) {
        alert(response.error);
      } else {
        setBranches(response.data);
      }
    }

    //Fetch all packages types to fill dropdown
    async function fetchAllPackageTypes() {
      let response = await BranchManagerController.getAllPackageTypes();
      if (response.error) {
        alert(response.error);
      } else {
        setPackageTypes(response.data);
      }
    }

    //Fetch all  order satatus to fill dropdown
    async function fetchAllOrderStatus() {
      let response = await BranchManagerController.getAllOrderStatus();
      if (response.error) {
        alert(response.error);
      } else {
        setOrderStatus(response.data);
      }
    }

    async function fetchAllClientNICs() {
      let response = await BranchManagerController.getAllClientNICs();
      if (response.error) {
        alert(response.error);
      } else {
        setClientNICs(response.data);
      }
    }

    // get user branch with cookies
    let branchId = getCookie("user-branch-id");

    // Save previous data and save new data
    setInputData((prev) => {
      return { ...prev, sendingBranch: branchId, receivingBranch: branchId };
    });

    fetchAllBranches();
    fetchAllPackageTypes();
    fetchAllOrderStatus();
    fetchAllClientNICs();
    fetchOrderDetails();

    // set order details to input fields userInput
    setInputData((prev) => {
      return {
        ...prev,
        weight: orderDetails.weight,
        sendingDate: orderDetails.sendingDate,
        paymentDate: orderDetails.paymentDate,
        packageTypes: orderDetails.packageTypes,
        sendingBranch: orderDetails.sendingBranch,
        receivingBranch: orderDetails.receivingBranch,
        specialNotes: orderDetails.specialNotes,
        orderStatus: orderDetails.orderStatus,
        sender: orderDetails.sender,
        receiver: orderDetails.receiver,
        contactNumber: orderDetails.contactNumber,
        address: orderDetails.address,
      };
    });
  }, []);


  //Hook which reacts to weight/type change and changes price
  useEffect(() => {
    async function getFee() {
      var regex = /^\d+(\.\d+)?$/;
      let valid = regex.test(userInput.weight);
      if (!valid) {
        setCourierFee(0.0);
      } else {
        let { fee } = await BranchManagerController.getCourierFee(
          userInput.weight,
          userInput.packageTypes
        );
        setCourierFee(fee);
      }
    }

    getFee();
  }, [userInput.weight, userInput.packageTypes]);

  //data submitter
  const onSubmit = async (e) => {
    e.preventDefault();

    const {
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
    } = userInput;

    try {
      const res = await BranchManagerController.addOrder(
        weight,
        sendingDate,
        paymentDate,
        parseInt(packageTypes),
        parseInt(sendingBranch),
        parseInt(receivingBranch),
        specialNotes,
        parseInt(orderStatus),
        sender,
        receiver,
        contactNumber,
        address
      );

      // Error handling
      if (res.error) {
        // alert(res.error);
        setShowErrorDialog(true);
      } else {
        // navigate(BranchManagerRoutes.dashboard)
        // setUdata(data);
        setShowErrorDialog(false);
        setShowSuccessDialog(true);
        console.log("Order Added Succeccfully");
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  // Return all the hooks
  return {
    orderId,
    clientNICs,
    selectedSenderNIC,
    branches,
    packageTypes,
    orderStatus,
    showSuccessDialog,
    showErrorDialog,
    courierFee,
    userInput,
    hideSuccessDialog,
    hideErrorDialog,
    validations,
    validateField,
    isFormValid,
    onChange,
    handleSenderChange,
    onSubmit,
  };

  //   return {
  //   orderId,
  //   clientNICs,
  //   selectedSenderNIC,
  //   branches,
  //   packageTypes,
  //   orderStatus,
  //   showSuccessDialog,
  //   showErrorDialog,
  //   courierFee,
  //   userInput,
  //   hideSuccessDialog,
  //   hideErrorDialog,
  //   validations,
  //   validateField,
  //   isFormValid,
  //   onChange,
  //   handleSenderChange,
  //   onSubmit,
  // };                                                  
}

export default useUpdateOrderHook;
