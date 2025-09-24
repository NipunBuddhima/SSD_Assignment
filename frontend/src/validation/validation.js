function validator() {
    function validateNIC(nic) {
      const regex = /^[0-9]+[vV]?$/;
      return regex.test(nic);
    }
  
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  
    function validateName(name) {
      const regex = /^[a-zA-Z\s]+$/;
      return regex.test(name);
    }
  
    function validateAddress(address) {
      const regex = /^[a-zA-Z0-9\s.,/]+$/;
      return regex.test(address);
    }
  
    function validatePhoneNumber(phoneNumber) {
      const regex = /^\+?\d+$/;
      return regex.test(phoneNumber);
    }
  
    return {
      validateNIC,
      validateEmail,
      validateName,
      validateAddress,
      validatePhoneNumber,
    };
  }
  
  export default validator;
  