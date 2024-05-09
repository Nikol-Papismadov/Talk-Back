import React from "react";

export default async function ValidateToken() {
  const username = sessionStorage.getItem("username");
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const isTokenvalid = await fetch(
    "http://localhost:5000/api/auth/validateToken/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: accessToken }),
    }
  );
  if (isTokenvalid) return isTokenvalid;
  const response = await fetch("http://localhost:5000/api/auth/refreshToken/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, token: refreshToken }),
  });
  if (!response.ok) throw new Error("refresh token failed");
  sessionStorage.setItem("accessToken", JSON.stringify(response.body));
}
