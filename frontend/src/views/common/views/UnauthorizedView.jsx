// This is unauthorized view to show when user is not authorized

import React from 'react'

function UnauthorizedView() {

    let styles = {
        height : "100vh",
        width : "100vw",
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
    };

  return (
    <div style={styles}>You are Unauthorized</div>
  )
}

export default UnauthorizedView