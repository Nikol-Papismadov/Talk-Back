import React from 'react'

const ValidateToken = () => {
  const username = sessionStorage.getItem('username');
  const accessToken = sessionStorage.getItem('accessToken');
  const refreshToken = sessionStorage.getItem('refreshToken');
  const validateToken = async () => {
    const isTokenvalid = await fetch('http://localhost:5000/api/auth/validateToken/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: accessToken})
    });
    if (isTokenvalid) return isTokenvalid
    const onlineUsers = await getOnlineUsers()
    const response = await fetch('http://localhost:5000/api/auth/refreshToken/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username, token: refreshToken})
  })
  if (!response.ok) 
    throw new Error('refresh token failed');
  sessionStorage.setItem('accessToken', JSON.stringify(response.body));
}
  return (
    <div>ValidateToken</div>
  )
}

export default ValidateToken