import React from 'react'
import jwt from 'jsonwebtoken';

const RefreshToken = async () => {
   
    const validateToken = async (username, accessToken) => {
        if (jwt.verify(accessToken)) {
            return true;
        }
        const response = await fetch('http://localhost:5000/api/auth/RefreshToken/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, token: accessToken})
      });
      return response.body;
    }
  return (
    <div>RefreshToken</div>
  )
}

export default RefreshToken