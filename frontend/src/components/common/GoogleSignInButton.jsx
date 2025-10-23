import React from "react";

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    // Start the OAuth flow on the backend which will redirect to Google
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="btn btn-light d-flex align-items-center justify-content-center gap-2 w-100"
      style={{
        border: "1px solid #ccc",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
        alt="Google logo"
        style={{ width: "18px", height: "18px" }}
      />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleSignInButton;
